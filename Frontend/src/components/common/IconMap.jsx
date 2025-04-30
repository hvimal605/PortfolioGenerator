// socialIcons.jsx

import { BsTwitter } from "react-icons/bs";
import {
  FaGlobe,
  FaLink,
  FaCode,
  FaUser,
  FaGithub,
  FaStackOverflow,
} from "react-icons/fa";

import {
  
  SiLinkedin,
  SiFacebook,
  SiInstagram,
  SiYoutube,
  SiTiktok,
  SiPinterest,
  SiSnapchat,
  SiReddit,
  SiTumblr,
  SiSpotify,
  SiDiscord,
  SiVimeo,
  SiSoundcloud,
  SiMedium,
  SiDeviantart,
  SiWhatsapp,
  SiFoursquare,
  SiQuora,

  SiTelegram,
  SiGitlab,
  SiBitbucket,
  SiDevdotto,
  SiHackerrank,
  SiCodeforces,
  SiLeetcode,
  SiCodewars,
  SiTopcoder,
  SiReplit,
} from "react-icons/si";

const iconMap = {
  twitter: <BsTwitter className="text-sky-500 text-2xl hover:text-sky-300" />,
  linkedin: <SiLinkedin className="text-sky-500 text-2xl hover:text-sky-300" />,
  facebook: <SiFacebook className="text-blue-600 text-2xl hover:text-blue-400" />,
  instagram: <SiInstagram className="text-pink-500 text-2xl hover:text-pink-300" />,
  youtube: <SiYoutube className="text-red-500 text-2xl hover:text-red-400" />,
  tiktok: <SiTiktok className="text-black text-2xl hover:text-black" />,
  pinterest: <SiPinterest className="text-red-600 text-2xl hover:text-red-400" />,
  snapchat: <SiSnapchat className="text-yellow-500 text-2xl hover:text-yellow-400" />,
  reddit: <SiReddit className="text-orange-600 text-2xl hover:text-orange-400" />,
  tumblr: <SiTumblr className="text-blue-700 text-2xl hover:text-blue-500" />,
  spotify: <SiSpotify className="text-green-500 text-2xl hover:text-green-400" />,
  discord: <SiDiscord className="text-blue-600 text-2xl hover:text-blue-400" />,
  vimeo: <SiVimeo className="text-blue-400 text-2xl hover:text-blue-300" />,
  soundcloud: <SiSoundcloud className="text-orange-500 text-2xl hover:text-orange-400" />,
  medium: <SiMedium className="text-black text-2xl hover:text-black" />,
  deviantart: <SiDeviantart className="text-green-600 text-2xl hover:text-green-400" />,
  whatsapp: <SiWhatsapp className="text-green-500 text-2xl hover:text-green-400" />,
  foursquare: <SiFoursquare className="text-blue-700 text-2xl hover:text-blue-500" />,
  quora: <SiQuora className="text-red-600 text-2xl hover:text-red-400" />,

  telegram: <SiTelegram className="text-blue-400 text-2xl hover:text-blue-300" />,
  github: <FaGithub className="text-white text-2xl hover:text-cyan-400" />,
  codeforces: <SiCodeforces className="text-purple-400 text-2xl hover:text-purple-300" />,
  leetcode: <SiLeetcode className="text-yellow-400 text-2xl hover:text-yellow-300" />,
  gitlab: <SiGitlab className="text-orange-500 text-2xl hover:text-orange-400" />,
  bitbucket: <SiBitbucket className="text-blue-500 text-2xl hover:text-blue-300" />,
  hackerrank: <SiHackerrank className="text-green-400 text-2xl hover:text-green-300" />,
  codewars: <SiCodewars className="text-red-500 text-2xl hover:text-red-400" />,
  topcoder: <SiTopcoder className="text-blue-600 text-2xl hover:text-blue-500" />,
  stackoverflow: <FaStackOverflow className="text-orange-600 text-2xl hover:text-orange-400" />,
  replit: <SiReplit className="text-purple-500 text-2xl hover:text-purple-400" />,
  personalwebsite: <FaGlobe className="text-green-500 text-2xl hover:text-green-300" />,
  portfolio: <FaLink className="text-gray-400 text-2xl" />,
  devto: <SiDevdotto className="text-gray-600 text-2xl hover:text-gray-400" />,
  default: <FaLink className="text-gray-400 text-2xl" />,
};

export default iconMap;
