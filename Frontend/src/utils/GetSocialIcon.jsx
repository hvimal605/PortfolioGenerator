import React from 'react';
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaDribbble,
  FaBehance,
  FaMedium,
  FaReddit,
  FaWhatsapp,
  FaDiscord,
  FaPinterest,
  FaTiktok,
  FaTwitch,
  FaSnapchatGhost,
  FaSlack,
  FaTelegram,
  FaSpotify,
  FaFigma,
  FaCodepen,
  FaStackOverflow,
  FaGitlab,
  FaBitbucket,
  FaDev,
  FaPatreon,
  FaSoundcloud,
  FaDocker,
  FaNpm,
  FaProductHunt,
  FaVimeo,
  FaQuora,
  FaSteam,
  FaGlobe
} from "react-icons/fa";
import { 
  SiLeetcode, 
  SiHackerrank, 
  SiCodeforces, 
  SiCodechef, 
  SiGeeksforgeeks, 
  SiTopcoder,
  SiCodewars,
  SiKaggle,
  SiFiverr,
  SiUpwork,
  SiReplit,
  SiSubstack,
  SiHashnode,
  SiFrontendmentor,
  SiCodesandbox,
  SiTryhackme,
  SiHackthebox,
  SiCoursera,
  SiUdemy
} from "react-icons/si";

export const getSocialIcon = (platformName) => {
  if (!platformName) return <FaGlobe className="text-lg text-gray-500" />;
  const name = platformName.toLowerCase();
  
  // Professional & Social
  if (name.includes("linkedin")) return <FaLinkedin className="text-lg text-[#0077b5]" />;
  if (name.includes("twitter") || name === "x") return <FaTwitter className="text-lg text-[#1DA1F2]" />;
  if (name.includes("facebook")) return <FaFacebook className="text-lg text-[#1877F2]" />;
  if (name.includes("instagram")) return <FaInstagram className="text-lg text-[#E4405F]" />;
  if (name.includes("youtube")) return <FaYoutube className="text-lg text-[#FF0000]" />;
  if (name.includes("whatsapp")) return <FaWhatsapp className="text-lg text-[#25D366]" />;
  if (name.includes("discord")) return <FaDiscord className="text-lg text-[#5865F2]" />;
  if (name.includes("pinterest")) return <FaPinterest className="text-lg text-[#E60023]" />;
  if (name.includes("tiktok")) return <FaTiktok className="text-lg text-white" />;
  if (name.includes("twitch")) return <FaTwitch className="text-lg text-[#9146FF]" />;
  if (name.includes("snapchat")) return <FaSnapchatGhost className="text-lg text-[#FFFC00]" />;
  if (name.includes("telegram")) return <FaTelegram className="text-lg text-[#0088cc]" />;
  if (name.includes("slack")) return <FaSlack className="text-lg text-[#4A154B]" />;
  if (name.includes("spotify")) return <FaSpotify className="text-lg text-[#1DB954]" />;
  if (name.includes("soundcloud")) return <FaSoundcloud className="text-lg text-[#ff5500]" />;
  if (name.includes("vimeo")) return <FaVimeo className="text-lg text-[#1ab7ea]" />;
  
  // Design & Portfolios
  if (name.includes("dribbble")) return <FaDribbble className="text-lg text-[#ea4c89]" />;
  if (name.includes("behance")) return <FaBehance className="text-lg text-[#1769ff]" />;
  if (name.includes("figma")) return <FaFigma className="text-lg text-[#F24E1E]" />;
  
  // Blogs, Creators & Communities
  if (name.includes("medium")) return <FaMedium className="text-lg text-white" />;
  if (name.includes("reddit")) return <FaReddit className="text-lg text-[#FF4500]" />;
  if (name.includes("dev.to") || name.includes("devto")) return <FaDev className="text-lg text-white" />;
  if (name.includes("hashnode")) return <SiHashnode className="text-lg text-[#2962FF]" />;
  if (name.includes("substack")) return <SiSubstack className="text-lg text-[#FF6719]" />;
  if (name.includes("patreon")) return <FaPatreon className="text-lg text-[#FF424D]" />;
  if (name.includes("quora")) return <FaQuora className="text-lg text-[#b92b27]" />;
  if (name.includes("producthunt") || name.includes("product hunt")) return <FaProductHunt className="text-lg text-[#DA552F]" />;
  
  // Version Control, Packages & General Coding
  if (name.includes("github")) return <FaGithub className="text-lg text-white" />;
  if (name.includes("gitlab")) return <FaGitlab className="text-lg text-[#FC6D26]" />;
  if (name.includes("bitbucket")) return <FaBitbucket className="text-lg text-[#0052CC]" />;
  if (name.includes("codepen")) return <FaCodepen className="text-lg text-white" />;
  if (name.includes("codesandbox")) return <SiCodesandbox className="text-lg text-white" />;
  if (name.includes("stackoverflow")) return <FaStackOverflow className="text-lg text-[#F58025]" />;
  if (name.includes("replit")) return <SiReplit className="text-lg text-[#F26207]" />;
  if (name.includes("docker")) return <FaDocker className="text-lg text-[#2496ED]" />;
  if (name.includes("npm")) return <FaNpm className="text-lg text-[#CB3837]" />;

  // Competitive Programming & Certifications
  if (name.includes("leetcode")) return <SiLeetcode className="text-lg text-[#FFA116]" />;
  if (name.includes("hackerrank")) return <SiHackerrank className="text-lg text-[#00EA64]" />;
  if (name.includes("codeforces")) return <SiCodeforces className="text-lg text-[#1F8ACB]" />;
  if (name.includes("codechef")) return <SiCodechef className="text-lg text-[#5B4638]" />;
  if (name.includes("geeksforgeeks") || name.includes("gfg")) return <SiGeeksforgeeks className="text-lg text-[#2F8D46]" />;
  if (name.includes("topcoder")) return <SiTopcoder className="text-lg text-[#FCA311]" />;
  if (name.includes("codewars")) return <SiCodewars className="text-lg text-[#AD2C27]" />;
  if (name.includes("kaggle")) return <SiKaggle className="text-lg text-[#20BEFF]" />;
  if (name.includes("frontendmentor")) return <SiFrontendmentor className="text-lg text-[#6ABECD]" />;
  
  // Cybersecurity & Learning
  if (name.includes("tryhackme")) return <SiTryhackme className="text-lg text-[#88CC14]" />;
  if (name.includes("hackthebox")) return <SiHackthebox className="text-lg text-[#9FEF00]" />;
  if (name.includes("coursera")) return <SiCoursera className="text-lg text-[#0056D2]" />;
  if (name.includes("udemy")) return <SiUdemy className="text-lg text-[#A435F0]" />;
  
  // Freelancing & Gaming
  if (name.includes("upwork")) return <SiUpwork className="text-lg text-[#14A800]" />;
  if (name.includes("fiverr")) return <SiFiverr className="text-lg text-[#1DBF73]" />;
  if (name.includes("steam")) return <FaSteam className="text-lg text-white" />;
  
  return <FaGlobe className="text-lg text-gray-500" />;
};

