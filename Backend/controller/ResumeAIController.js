const { GoogleGenerativeAI } = require("@google/generative-ai");
const { extractResumeText } = require("../utils/resumeParser");
const fs = require("fs");
const axios = require("axios");
const User = require("../models/User");

/**
 * Dynamically discover all working Gemini model names for fallback logic.
 */
const getApiKeys = () => {
    const keysStr = process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEYS || "";
    return keysStr.split(",").map(k => k.trim()).filter(Boolean);
};

const getAvailableModelNames = async (apiKeys) => {
    const apiKey = apiKeys[0] || "";
    const preferredOrder = [
        "gemini-2.0-flash",
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest",
        "gemini-1.5-pro",
        "gemini-pro"
    ];

    try {
        const response = await axios.get(
            "https://generativelanguage.googleapis.com/v1beta/models",
            { params: { key: apiKey }, timeout: 8000 }
        );
        const models = response?.data?.models || [];
        const contentModels = models
            .filter((m) => Array.isArray(m.supportedGenerationMethods) && m.supportedGenerationMethods.includes("generateContent"))
            .map((m) => (m.name || "").replace("models/", ""))
            .filter(Boolean);

        // Return models that are both preferred and available, followed by any other content models
        const availablePreferred = preferredOrder.filter(m => contentModels.includes(m));
        const others = contentModels.filter(m => !preferredOrder.includes(m));

        return [...availablePreferred, ...others];
    } catch (error) {
        console.error("Model Discovery Error:", error.message);
        return preferredOrder; // Fallback to hardcoded list if discovery fails
    }
};

/**
 * Controller to handle AI Resume to Portfolio conversion.
 */
exports.convertResumeToPortfolio = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const now = new Date();
        if (user.aiResumeUsageResetTime && now > user.aiResumeUsageResetTime) {
            user.aiResumeUsageCount = 0;
            user.aiResumeUsageResetTime = null;
        }

        if (user.aiResumeUsageCount >= 3) {
            return res.status(429).json({
                success: false,
                message: "you 3 free time used this refres tommorow",
                resetTime: user.aiResumeUsageResetTime
            });
        }

        if (!req.files || !req.files.resume) {
            return res.status(400).json({
                success: false,
                message: "No resume file uploaded.",
            });
        }

        const { resume } = req.files;

        // Handle express-fileupload tempFiles: true
        let pdfBuffer = resume.data;
        if (resume.tempFilePath && (!pdfBuffer || pdfBuffer.length === 0)) {
            pdfBuffer = fs.readFileSync(resume.tempFilePath);
        }

        const { text: extractedText, links: pdfLinks } = await extractResumeText(pdfBuffer);

        // --- HYBRID EXTRACTION (Regex Hints) ---
        const emailRegex = /([a-zA-Z0-9._%+-]+@[\w.-]+\.[a-zA-Z]{2,})/g;
        const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3,5}\)?[-.\s]?\d{3,5}[-.\s]?\d{3,5}/g;

        // Broad URL extractors — grab any github/linkedin URL from text
        const githubAllRegex = /https?:\/\/(?:www\.)?github\.com\/[a-zA-Z0-9._-]+(?:\/[a-zA-Z0-9._-]+)*/gi;
        const linkedinAllRegex = /https?:\/\/(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9._-]+\/?/gi;

        const textToMatch = extractedText.replace(/\s+/g, " ");
        const foundEmails = [...new Set(textToMatch.match(emailRegex) || [])].map(e => e.trim());
        const foundPhones = [...new Set(textToMatch.match(phoneRegex) || [])].map(p => p.trim());

        // Combine URLs found in text AND in PDF annotations (hidden hyperlinks)
        const allUrlSources = extractedText + "\n" + pdfLinks.join("\n");

        const allGithubUrls = [...new Set((allUrlSources.match(githubAllRegex) || []).map(u => u.replace(/[.,;:|)\]}>]+$/, '').trim()))];
        const allLinkedinUrls = [...new Set((allUrlSources.match(linkedinAllRegex) || []).map(u => u.replace(/[.,;:|)\]}>\/]+$/, '').trim()))];

        console.log("--- PDF ANNOTATION LINKS ---");
        console.log(pdfLinks);
        console.log("--- ALL EXTRACTED URLs (text + annotations) ---");
        console.log("All GitHub URLs:", allGithubUrls);
        console.log("All LinkedIn URLs:", allLinkedinUrls);

        // Profile = github.com/username (1 path segment)
        // Repo    = github.com/username/repo (2+ path segments)
        let foundGithubProfiles = allGithubUrls.filter(url => {
            try {
                const path = new URL(url).pathname.replace(/^\/|\/$/g, '');
                const segments = path.split('/').filter(Boolean);
                return segments.length === 1; // Just /username
            } catch { return false; }
        });
        // Fallback: if no pure profile URL but we have repo URLs, derive the profile
        if (foundGithubProfiles.length === 0 && allGithubUrls.length > 0) {
            try {
                const firstUrl = new URL(allGithubUrls[0]);
                const username = firstUrl.pathname.split('/').filter(Boolean)[0];
                if (username) {
                    foundGithubProfiles = [`https://github.com/${username}`];
                    console.log("GitHub Profile derived from repo URL:", foundGithubProfiles[0]);
                }
            } catch { }
        }
        const foundLinkedinProfiles = allLinkedinUrls;

        console.log("--- HYBRID EXTRACTION HINTS ---");
        console.log("Found Emails:", foundEmails);
        console.log("Found Phones:", foundPhones);
        console.log("Found GitHub Profiles:", foundGithubProfiles);
        console.log("Found LinkedIn Profiles:", foundLinkedinProfiles);

        const apiKeys = getApiKeys();
        if (apiKeys.length === 0) {
            throw new Error("No Gemini API keys configured.");
        }

        const availableModels = await getAvailableModelNames(apiKeys);

        const prompt = `
      You are an expert career assistant. Analyze the following resume text and extract information into a structured JSON format.
      
      Resume Text (Layout Preserved):
      "${extractedText}"

      === EXPERT HINTS (Detected Programmatically — USE THESE) ===
      - Emails: ${foundEmails.join(", ") || "None found"}
      - Phone numbers: ${foundPhones.join(", ") || "None found"}
      - GitHub profile URLs: ${foundGithubProfiles.join(", ") || "None found"}
      - LinkedIn profile URLs: ${foundLinkedinProfiles.join(", ") || "None found"}

      Output ONLY valid JSON matching this structure:
      {
        "personalDetails": {
          "FirstName": "",
          "LastName": "",
          "email": "",
          "phone": "",
          "roles": [],
          "aboutme": ""
        },
        "socialLinks": [
          { "platform": "LinkedIn", "url": "" },
          { "platform": "Github", "url": "" }
        ],
        "skills": [],
        "softwareApplications": [],
        "education": [
          { "title": "", "organization": "", "description": "", "startDate": "", "endDate": "" }
        ],
        "experience": [
          { "title": "", "organization": "", "description": "", "startDate": "", "endDate": "" }
        ],
        "projects": [
          { "title": "", "description": "", "githubLink": "", "liveLink": "", "techStack": [] }
        ]
      }

      === MANDATORY RULES (Follow exactly) ===
      1. NAME SPLITTING: The person's full name must be split as follows:
         - "FirstName" = ONLY the FIRST word of their name.
         - "LastName"  = ALL remaining words of their name.
         - Example: "Harsh Kumar Vimal" → FirstName: "Harsh", LastName: "Kumar Vimal"
         - Example: "John Doe" → FirstName: "John", LastName: "Doe"

      2. EMAIL & PHONE: Copy EXACTLY from the Expert Hints above. Do NOT invent or modify them.

      3. ABOUT ME (Biography): WRITE a real, personalized 3-sentence professional summary based on the person's skills, experience, and education found in the resume. Do NOT output placeholder text like "A short 3-sentence professional bio" — actually write the bio.

      4. ROLES: Provide 2-3 professional role titles that best describe this person. Follow these sub-rules:
         - If the resume explicitly mentions a title (e.g. "Software Engineer"), include it.
         - ALSO infer roles from their projects and tech stack. Examples:
           * Uses React + Node.js + MongoDB/Express → "MERN Stack Developer"
           * Uses React + Node.js + PostgreSQL → "Full Stack Developer"
           * Builds ML/AI projects → "Machine Learning Engineer"
           * Builds mobile apps → "Mobile App Developer"
           * Competitive programming / DSA focus → "Competitive Programmer"
           * Only frontend projects → "Frontend Developer"
           * Only backend/API projects → "Backend Developer"
         - Do NOT use college names, company names, or institution names as roles.
         - Keep each role short (2-4 words max).

      5. SOCIAL LINKS:
         - Use the GitHub and LinkedIn URLs from the Expert Hints above.
         - The socialLinks should be the person's PROFILE links, NOT project repository links.
         - A GitHub profile link looks like: https://github.com/username (NO extra path segments)
         - A project repo link looks like: https://github.com/username/repo-name — this goes in the project's "link" field instead.

      6. PROJECTS: Each project gets its own entry.
         - "githubLink": The link to the GitHub repository.
         - "liveLink": The link to the live demo or website (if present).
         - "link" (legacy): Use githubLink instead.
         - CRITICAL: Extract EVERY single project mention found in the resume. Do not skip any.

      7. EDUCATION & EXPERIENCE: Extract ALL education entries into the "education" array and ALL work/internship entries into the "experience" array.
         - "title": The degree name or job title (e.g. "B.Tech. Computer Science", "Software Engineer Intern")
         - "organization": The institution or company name (e.g. "MIT", "Google")
         - "description": Grade/CGPA/percentage for education, or job responsibilities/achievements for experience.
         - "startDate": Start date in YYYY-MM format. If only a year is given, use YYYY-01.
         - "endDate": End date in YYYY-MM format, or "Present" if currently ongoing.
         - CRITICAL: ONLY extract ACTUAL work experience, internships, or education.
         - CRITICAL: Do NOT include items listed under the "PROJECTS" section of the resume in the "experience" array. Projects belong ONLY in the "projects" array.
         - If the resume has NO work history or internships, the "experience" array MUST be empty [].

       8. SKILLS vs SOFTWARE TOOLS:
          - "skills": Extract programming languages, frameworks, libraries, and core technical concepts (e.g. "JavaScript", "React.js", "C++", "REST APIs", "SQL", "Cloud Storage").
          - "softwareApplications": Extract standalone software tools, IDEs, and productivity applications (e.g. "Git", "Postman", "Figma", "n8n", "Docker", "VS Code", "Power BI", "AutoCAD", "Blender").
          - DO NOT duplicate items between these two arrays. If something is a tool, put it ONLY in softwareApplications.

      9. Return ONLY raw JSON. No markdown, no explanation, no code fences.
    `;

        let lastError = null;
        let successfulModel = null;
        let structuredData = null;

        // Iteratively try available models, and for each model try all available keys
        for (const modelName of availableModels) {
            for (let k = 0; k < apiKeys.length; k++) {
                const apiKey = apiKeys[k];
                const genAI = new GoogleGenerativeAI(apiKey);

                try {
                    console.log(`Attempting AI conversion with model: ${modelName} and key index: ${k}`);
                    const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent(prompt);
                const response = await result.response;
                let text = response.text();

                // Show AI Response in logs for debugging
                console.log(`--- AI RESPONSE (${modelName}) ---`);
                console.log(text);
                console.log("--- END AI RESPONSE ---");

                // Clean up response if it contains markdown code blocks
                text = text.trim().replace(/```json/g, "").replace(/```/g, "").trim();
                structuredData = JSON.parse(text);

                // --- HINT ENFORCEMENT ---
                // If AI left fields blank but regex found them, inject the regex values
                if (structuredData.personalDetails) {
                    if (!structuredData.personalDetails.email && foundEmails.length > 0) {
                        console.log("Hint Enforcement: Injecting email from regex:", foundEmails[0]);
                        structuredData.personalDetails.email = foundEmails[0];
                    }
                    if (!structuredData.personalDetails.phone && foundPhones.length > 0) {
                        console.log("Hint Enforcement: Injecting phone from regex:", foundPhones[0]);
                        structuredData.personalDetails.phone = foundPhones[0];
                    }
                    // Kill placeholder bio text if AI copied it literally
                    const bio = structuredData.personalDetails.aboutme || "";
                    if (bio.toLowerCase().includes("short 3-sentence") || bio.toLowerCase().includes("professional bio")) {
                        console.log("Hint Enforcement: Clearing placeholder bio text");
                        structuredData.personalDetails.aboutme = "";
                    }
                }

                // Social link enforcement: inject regex-found profiles if AI missed them
                if (!structuredData.socialLinks || !Array.isArray(structuredData.socialLinks)) {
                    structuredData.socialLinks = [];
                }
                const hasGithub = structuredData.socialLinks.some(l =>
                    l.platform?.toLowerCase() === "github" && l.url && !l.url.includes("...") && l.url.length > 22
                );
                const hasLinkedin = structuredData.socialLinks.some(l =>
                    l.platform?.toLowerCase() === "linkedin" && l.url && !l.url.includes("...") && l.url.length > 25
                );
                if (!hasGithub && foundGithubProfiles.length > 0) {
                    console.log("Hint Enforcement: Injecting GitHub profile:", foundGithubProfiles[0]);
                    const existing = structuredData.socialLinks.findIndex(l => l.platform?.toLowerCase() === "github");
                    if (existing >= 0) structuredData.socialLinks[existing].url = foundGithubProfiles[0];
                    else structuredData.socialLinks.push({ platform: "Github", url: foundGithubProfiles[0] });
                }
                if (!hasLinkedin && foundLinkedinProfiles.length > 0) {
                    console.log("Hint Enforcement: Injecting LinkedIn profile:", foundLinkedinProfiles[0]);
                    const existing = structuredData.socialLinks.findIndex(l => l.platform?.toLowerCase() === "linkedin");
                    if (existing >= 0) structuredData.socialLinks[existing].url = foundLinkedinProfiles[0];
                    else structuredData.socialLinks.push({ platform: "LinkedIn", url: foundLinkedinProfiles[0] });
                }

                successfulModel = modelName;
                break; // Exit loop on success
            } catch (err) {
                console.warn(`Model ${modelName} failed:`, err.message);
                lastError = err;

                // If it's a parse error, it's likely not the model's fault, so we might want to throw
                if (err instanceof SyntaxError) {
                    console.error("JSON Parse Error from AI response:", err.message);
                    throw err;
                }

                // Continue to next key or model for quota (429) or other API errors
                continue;
            }
        }
        if (successfulModel) break; // Break outer loop if success
    }

        if (!successfulModel) {
            throw lastError || new Error("All AI models failed to process the request.");
        }

        // Increment usage count on success
        user.aiResumeUsageCount = (user.aiResumeUsageCount || 0) + 1;
        if (user.aiResumeUsageCount === 1) {
            user.aiResumeUsageResetTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
        }
        await user.save();

        return res.status(200).json({
            success: true,
            message: `Resume parsed successfully using ${successfulModel}.`,
            data: structuredData,
        });
    } catch (error) {
        console.error("AI Conversion Final Error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong please try manual way",
            error: error.message,
        });
    }
};

exports.getAIUsageStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const now = new Date();
        let usageCount = user.aiResumeUsageCount || 0;
        let resetTime = user.aiResumeUsageResetTime;

        if (resetTime && now > resetTime) {
            usageCount = 0;
            resetTime = null;
        }

        return res.status(200).json({
            success: true,
            data: {
                usageCount,
                maxLimit: 3,
                resetTime,
            }
        });
    } catch (error) {
        console.error("AI Usage Stats Error:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};
