const modernTemplate = (portfolioId) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Modern Portfolio</title>
      <style>
        body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f9;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  padding: 30px 20px;
  background-color: #0073e6;
  color: white;
  border-bottom: 5px solid #005bb5;
}

.header h1 {
  font-size: 2.5em;
  margin: 0;
}

.header p {
  font-size: 1.2em;
  margin-top: 10px;
}

.profile img {
  border-radius: 50%;
  margin-top: 20px;
  width: 150px;
  height: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h1, h2 {
  color: #0073e6;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: white;
  margin: 10px 0;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

li:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.contact, .social-links {
  margin-top: 30px;
}

a {
  color: #0073e6;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease, text-decoration 0.3s ease;
}

a:hover {
  color: #005bb5;
  text-decoration: underline;
}

button {
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 1em;
  color: white;
  background-color: #0073e6;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
  background-color: #005bb5;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

footer {
  text-align: center;
  margin-top: 50px;
  padding: 20px 0;
  background-color: #0073e6;
  color: white;
}

footer p {
  margin: 0;
  font-size: 0.9em;
}

.card {
  background: white;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.highlight {
  color:rgba(241, 118, 10, 0.91);
  font-weight: bold;
  background-color: #e0f0ff;
  padding: 2px 5px;
  border-radius: 3px;
}

blockquote {
  margin: 20px 0;
  padding: 15px 20px;
  background: #f9f9f9;
  border-left: 5px solid #0073e6;
  font-style: italic;
  color: #555;
  border-radius: 5px;
}

      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to the Portfolio</h1>
        </div>
        <div id="generated-portfolio"></div>
      </div>
      <script>
        function generatePortfolioHTML(portfolioData) {
          return \`
            <div class="profile">
              <img src="\${portfolioData.profileImage}" alt="Profile Image" width="120">
              <h1>\${portfolioData.userId}'s Portfolio</h1>
            </div>
            <div class="skills">
              <h2>Skills</h2>
              <ul>
                \${portfolioData.skills.map(skill => \`
                  <li>
                    <strong>\${skill.title}</strong> - Proficiency: \${skill.proficiency}%
                  </li>
                \`).join('')}
              </ul>
            </div>
            <div class="projects">
              <h2>Projects</h2>
              <ul>
                \${portfolioData.projects.map(project => \`
                  <li>
                    <h3>\${project.title}</h3>
                    <p>\${project.description}</p>
                  </li>
                \`).join('')}
              </ul>
            </div>
          \`;
        }
        const portfolioId = '${portfolioId}';
        fetch('https://portfoliogenrator.onrender.com/api/v1/portfolio/getPortfolioFullDetails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ portfolioId })
        })
        .then(response => response.json())
        .then(data => {
          const portfolioData = data.data;
          document.getElementById('generated-portfolio').innerHTML = portfolioData ? generatePortfolioHTML(portfolioData) : '<p>No data found.</p>';
        })
        .catch(error => console.error('Error:', error));
      </script>
    </body>
    </html>`;
};
module.exports = modernTemplate;
