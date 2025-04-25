const defaultTemplate = (portfolioId) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Testing Portfolio Generation</title>
    <style>
      /* General Styles */
      body {
        font-family: 'Poppins', Arial, sans-serif;
        margin: 0;
        padding: 0;
        background: linear-gradient(120deg, #84fab0, #8fd3f4);
        color: #444;
        animation: fadeIn 1s ease-in-out;
      }

      h1, h2, h3 {
        text-align: center;
        color: #2c3e50;
        margin-bottom: 20px;
        font-weight: 700;
        letter-spacing: 2px;
        animation: slideInFromTop 1s ease-in-out;
      }

      h1 {
        color: #34495e;
        font-size: 2.5em;
      }

      h2 {
        font-size: 2em;
        color: #2980b9;
      }

      h3 {
        font-size: 1.5em;
        color: #16a085;
      }

      /* Profile Section */
      .profile {
        text-align: center;
        padding: 40px;
        background: linear-gradient(135deg, #fdfbfb, #ebedee);
        border-radius: 15px;
        margin: 30px auto;
        max-width: 600px;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        transform: scale(1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .profile:hover {
        transform: scale(1.05);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      }

      .profile img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 5px solid #3498db;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        animation: bounceIn 1.2s;
        margin-bottom: 20px;
      }

      /* Sections (Skills, Projects, Contact, Social Links) */
      .skills, .projects, .contact, .social-links {
        padding: 40px;
        margin: 30px auto;
        max-width: 800px;
        background: #ffffff;
        border-radius: 15px;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        animation: fadeInUp 1s ease;
      }

      ul {
        list-style: none;
        padding: 0;
      }

      li {
        padding: 20px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }

      li img {
        width: 50px;
        height: 50px;
        margin-right: 15px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        object-fit: cover;
      }

      a {
        color: #3498db;
        text-decoration: none;
        font-weight: bold;
        transition: color 0.3s ease, transform 0.3s ease;
      }

      a:hover {
        color: #1abc9c;
        transform: scale(1.1);
      }

      /* Skills and Projects Section */
      .skills ul, .projects ul {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
      }

      .skills li, .projects li {
        text-align: center;
        flex: 1 1 calc(33.333% - 40px);
        max-width: 300px;
        background: linear-gradient(135deg, #ffffff, #f0f4f8);
        padding: 25px;
        border-radius: 15px;
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .skills li:hover, .projects li:hover {
        transform: scale(1.1);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
      }

      .projects img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
        margin: 15px 0;
        object-fit: cover;
      }

      /* Contact Section */
      .contact p, .social-links p {
        text-align: center;
        font-size: 18px;
        margin: 15px 0;
        color: #34495e;
      }

      /* Animations */
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideInFromTop {
        from {
          transform: translateY(-30px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes bounceIn {
        0% {
          transform: scale(0.8);
          opacity: 0.5;
        }
        50% {
          transform: scale(1.1);
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
    </style>
  </head>
  <body>
    <h1>Testing Portfolio Generation</h1>
    <div id="generated-portfolio"></div>
    <script>
      function generatePortfolioHTML(portfolioData) {
        return \`
          <div id="profile" class="profile">
            <img src="\${portfolioData.profileImage}" alt="Profile Image">
            <h1>\${portfolioData.userId}'s Portfolio</h1>
          </div>
          
          <div id="skills" class="skills">
            <h2>Skills</h2>
            <ul>
              \${portfolioData.skills.map(skill => \`
                <li>
                  <img src="\${skill.svg.url}" alt="\${skill.title} logo">
                  <strong>\${skill.title}</strong><br>Proficiency: \${skill.proficiency}%
                </li>
              \`).join('')}
            </ul>
          </div>
          <div id="projects" class="projects">
            <h2>Projects</h2>
            <ul>
              \${portfolioData.projects.map(project => \`
                <li>
                  <h3>\${project.title}</h3>
                  <img src="\${project.projectBanner.url}" alt="\${project.title} Banner">
                  <p>\${project.description}</p>
                  <p><strong>Technologies:</strong> \${project.technologies}</p>
                  <p><a href="\${project.gitRepoLink}" target="_blank">GitHub Repo</a></p>
                  <p><a href="\${project.projectLink}" target="_blank">Project Link</a></p>
                </li>
              \`).join('')}
            </ul>
          </div>
          <div id="contact" class="contact">
            <h2>Contact</h2>
            <p><strong>Email:</strong> \${portfolioData.contactDetails.email}</p>
            <p><strong>Phone:</strong> \${portfolioData.contactDetails.phone}</p>
            <p><strong>Address:</strong> \${portfolioData.contactDetails.address}</p>
          </div>
          <div id="social-links" class="social-links">
            <h2>Social Links</h2>
            <p><a href="\${portfolioData.socialLinks.linkedIn}" target="_blank">LinkedIn</a></p>
            <p><a href="\${portfolioData.socialLinks.github}" target="_blank">GitHub</a></p>
            <p><a href="\${portfolioData.socialLinks.twitter}" target="_blank">Twitter</a></p>
            <p><a href="\${portfolioData.socialLinks.personalWebsite}" target="_blank">Personal Website</a></p>
          </div>
        \`;
      }
      const portfolioId = '${portfolioId}';
      fetch('https://portfoliogenrator.onrender.com/api/v1/portfolio/getPortfolioFullDetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolioId: portfolioId })
      })
      .then(response => response.json())
      .then(data => {
        const portfolioData = data.data;
        if (portfolioData) {
          const portfolioHTML = generatePortfolioHTML(portfolioData);
          document.getElementById('generated-portfolio').innerHTML = portfolioHTML;
        } else {
          document.getElementById('generated-portfolio').innerHTML = '<p>Portfolio data not found or failed to load.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching portfolio data:', error);
        document.getElementById('generated-portfolio').innerHTML = '<p>Failed to fetch portfolio data. Please try again later.</p>';
      });
    </script>
  </body>
  </html>`;
};
module.exports = defaultTemplate;
