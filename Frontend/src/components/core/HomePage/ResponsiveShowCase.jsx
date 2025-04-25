import React from "react";

import mobileVideo from "../../../assets/videos/mobile.mp4";
import laptopVideo from "../../../assets/videos/laptop.mp4";

const MobileFriendlyShowcase = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
    <div className="container mx-auto px-6 text-center">
      {/* Title */}
      <h2 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:scale-110 transform transition duration-300">
        Mobile-Friendly Showcase
      </h2>
  
      {/* Description */}
      <p className="text-gray-300 text-lg mb-12 max-w-3xl mx-auto opacity-90 hover:opacity-100 transition duration-300 ease-in-out">
        Experience a responsive design that adapts seamlessly to both mobile and desktop devices. Check out the live previews below and see the magic in action!
      </p>
  
      {/* Showcase mockups */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Mobile Mockup */}
        <div className="relative w-48 aspect-[12/19.5] border-4 border-gray-600 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-500 overflow-hidden">
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <video
              className="w-full h-full object-cover"
              src={mobileVideo}
              autoPlay
              loop
              muted
            ></video>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent opacity-50 pointer-events-none"></div>
        </div>
  
        {/* Laptop Mockup */}
        <div className="relative w-96 aspect-[16/9] border-4 border-gray-600 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-500 overflow-hidden">
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <video
              className="w-full h-full object-cover"
              src={laptopVideo}
              autoPlay
              loop
              muted
            ></video>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent opacity-50 pointer-events-none"></div>
        </div>
      </div>
    </div>
  </section>
  
  );
};

export default MobileFriendlyShowcase;
