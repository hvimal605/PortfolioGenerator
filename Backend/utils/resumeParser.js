const { PDFParse } = require('pdf-parse');

/**
 * Extracts text AND hyperlinks from a PDF buffer.
 * pdf-parse v2.x: data MUST be passed inside the constructor options.
 * @param {Buffer} buffer - The PDF file buffer
 * @param {number} maxLength - Maximum characters to return
 * @returns {Promise<{text: string, links: string[]}>} - Extracted text and links
 */
const extractResumeText = async (buffer, maxLength = 4000) => {
    try {
        const parser = new PDFParse({ data: new Uint8Array(buffer) });
        
        // Extract text with hyperlinks enriched
        const textData = await parser.getText({ parseHyperlinks: true });
        
        // Also extract link annotations separately via getInfo
        let extractedLinks = [];
        try {
            const infoData = await parser.getInfo({ parsePageInfo: true });
            if (infoData?.pages) {
                for (const page of infoData.pages) {
                    if (page.links && Array.isArray(page.links)) {
                        for (const link of page.links) {
                            if (link.url) extractedLinks.push(link.url);
                        }
                    }
                }
            }
        } catch (linkErr) {
            console.warn("Link extraction warning (non-fatal):", linkErr.message);
        }
        
        const text = textData.text || "";
        // Preserve newlines but de-duplicate multiple spaces and lines
        const cleanedText = text
            .substring(0, 8000) 
            .replace(/[ \t]+/g, " ")
            .replace(/\n\s*\n/g, "\n")
            .trim();
        
        const finalText = cleanedText.length > maxLength 
            ? cleanedText.substring(0, maxLength) 
            : cleanedText;
        
        console.log("--- PDF EXTRACTED LINKS (annotations) ---");
        console.log(extractedLinks);
        
        return { text: finalText, links: [...new Set(extractedLinks)] };
    } catch (error) {
        console.error("PDF Parsing Error:", error);
        throw new Error("Failed to parse PDF resume.");
    }
};

module.exports = { extractResumeText };
