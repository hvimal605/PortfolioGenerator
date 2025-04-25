import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-[#0d0d0d] via-[#121212] to-[#0d0d0d] text-white py-16 px-6 border-t border-gray-800 shadow-[0_-2px_30px_rgba(0,255,180,0.05)] relative overflow-hidden">
        {/* Background glow layers */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,180,0.05),_transparent)] blur-xl" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8">
      
          {/* Logo + Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <Link
              to="/"
              className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] via-[#90E0EF] to-[#48C9B0] tracking-wide drop-shadow-lg hover:drop-shadow-[0_0_15px_rgba(72,201,176,0.5)] hover:scale-110 transition-transform duration-500"
            >
              PortFolio<span className="text-blue-600">Gen</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">Craft a stunning portfolio that gets you noticed — in minutes.</p>
            <p className="text-sm text-blue-400">
              Support: <a href="mailto:generatorportfolio@gmail.com" className="underline hover:text-blue-300">generatorportfolio@gmail.com</a>
            </p>
          </div>
      
          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-yellow-400 mb-4 tracking-wider">Contact Me</h2>
            <div className="flex justify-center md:justify-start gap-6 text-2xl">
              <a
                href="https://www.linkedin.com/in/harsh-kumar-vimal-5a3a57262"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300 hover:scale-110"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com/hvimal605"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FaInstagram />
              </a>
              <a
                href="mailto:generatorportfolio@gmail.com"
                className="bg-white/10 p-3 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
      
          {/* Credits */}
          <div className="text-center md:text-right text-sm text-gray-400">
            <p>
              Created by{" "}
              <span className="text-yellow-500 font-semibold hover:underline hover:text-yellow-400 transition-colors duration-200">
                Harsh Kumar Vimal
              </span>
            </p>
            <p className="text-xs mt-1">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
      
        </div>
      </footer>
      
    );
};

export default Footer;
