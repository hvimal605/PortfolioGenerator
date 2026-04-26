import COMMON_SKILLS from "../data/skills.json";

/**
 * Alias map: maps common alternate names to the canonical skill title.
 * All keys should be lowercase.
 */
const ALIAS_MAP = {
  // React
  "react.js": "react",
  "reactjs": "react",
  "react js": "react",

  // Next.js
  "next": "next.js",
  "nextjs": "next.js",
  "next js": "next.js",

  // Vue
  "vue.js": "vue",
  "vuejs": "vue",
  "vue js": "vue",

  // Nuxt.js
  "nuxt": "nuxt.js",
  "nuxtjs": "nuxt.js",
  "nuxt js": "nuxt.js",

  // Node.js
  "node": "node.js",
  "nodejs": "node.js",
  "node js": "node.js",

  // Express
  "express.js": "express",
  "expressjs": "express",
  "express js": "express",

  // Three.js
  "three": "three.js",
  "threejs": "three.js",
  "three js": "three.js",

  // D3.js
  "d3": "d3.js",
  "d3js": "d3.js",
  "d3 js": "d3.js",

  // Alpine.js
  "alpine": "alpine.js",
  "alpinejs": "alpine.js",
  "alpine js": "alpine.js",

  // Socket.io
  "socketio": "socket.io",
  "socket io": "socket.io",
  "socket": "socket.io",

  // Angular
  "angularjs": "angular",
  "angular.js": "angular",
  "angular js": "angular",

  // React Native
  "react-native": "react native",
  "reactnative": "react native",

  // Tailwind CSS
  "tailwind": "tailwind css",
  "tailwindcss": "tailwind css",

  // Material UI
  "mui": "material ui",
  "materialui": "material ui",

  // PostgreSQL
  "postgres": "postgresql",

  // C++
  "cpp": "c++",
  "cplusplus": "c++",
  "c plus plus": "c++",

  // C#
  "csharp": "c#",
  "c sharp": "c#",

  // Scikit-learn
  "sklearn": "scikit-learn",
  "scikit learn": "scikit-learn",
  "scikitlearn": "scikit-learn",

  // Spring Boot
  "spring": "spring boot",
  "springboot": "spring boot",

  // Objective-C
  "objc": "objective-c",
  "obj-c": "objective-c",
  "objective c": "objective-c",

  // GitHub
  "git hub": "github",

  // Google Cloud Platform
  "google cloud": "gcp",
  "google cloud platform": "gcp",

  // Amazon Web Services
  "amazon web services": "aws",

  // JWT
  "json web token": "jwt",
  "json web tokens": "jwt",
  "jsonwebtoken": "jwt",
  "jsonwebtokens": "jwt",

  // Chart.js
  "chartjs": "chart.js",
  "chart js": "chart.js",

  // Google Auth
  "google authentication": "google auth",
  "google oauth": "google auth",
  "google login": "google auth",

  // Cloud Storage
  "cloud": "cloud storage",
  "cloud services": "cloud storage",

  // Data Structures & Algorithms
  "dsa": "data structures & algorithms",
  "data structures": "data structures & algorithms",
  "algorithms": "data structures & algorithms",
  "data structures and algorithms": "data structures & algorithms",

  // Operating Systems
  "os": "operating systems",
  "operating system": "operating systems",

  // Computer Networks
  "networking": "computer networks",
  "computer network": "computer networks",
  "networks": "computer networks",
  "cn": "computer networks",

  // Web Services
  "web service": "web services",
  "rest api": "web services",
  "restful api": "web services",
  "api": "web services",

  // Artificial Intelligence
  "ai": "artificial intelligence",

  // Machine Learning
  "ml": "machine learning",

  // HTML
  "html": "html5",
  "html 5": "html5",

  // CSS
  "css": "css3",
  "css 3": "css3",
};

/**
 * Resolve a search term to its canonical skill title using aliases.
 * Returns the canonical lowercase title if an alias matches, otherwise the original lowercase term.
 */
const resolveAlias = (term) => {
  const lower = term.toLowerCase().trim();
  return ALIAS_MAP[lower] || lower;
};

/**
 * Find a skill from the COMMON_SKILLS library by title, considering aliases.
 * Equivalent to COMMON_SKILLS.find() but alias-aware.
 */
export const findSkill = (searchTerm) => {
  const resolved = resolveAlias(searchTerm);
  return COMMON_SKILLS.find(
    (s) => s.title.toLowerCase() === resolved
  );
};

/**
 * Filter skills from the COMMON_SKILLS library by search term, considering aliases.
 * Returns skills whose title includes the search term OR whose canonical name matches.
 */
export const filterSkills = (searchTerm) => {
  const lower = searchTerm.toLowerCase().trim();
  const resolved = resolveAlias(lower);

  return COMMON_SKILLS.filter((skill) => {
    const titleLower = skill.title.toLowerCase();
    // Direct title match (includes)
    if (titleLower.includes(lower)) return true;
    // Resolved alias matches the skill title exactly
    if (titleLower === resolved) return true;
    return false;
  });
};

export default { findSkill, filterSkills };
