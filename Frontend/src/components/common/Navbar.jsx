import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 z-10 bg-white/30 backdrop-blur-lg py-4 px-8 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-white">My Portfolio</div>
        <ul className="flex space-x-6 text-white">
          <li><a href="#home" className="hover:text-gray-300">Home</a></li>
          <li><a href="#about" className="hover:text-gray-300">About</a></li>
          <li><a href="#services" className="hover:text-gray-300">Services</a></li>
          <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
