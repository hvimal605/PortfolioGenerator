import React from 'react';
import Instructions from '../components/core/Developer/Instructions';
import UploadTemplate from '../components/core/Developer/UploadTemplate';

const DeveloperUpload = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r  p-0 md:p-8">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">
        {/* Instructions on the left */}
        <div className="w-full lg:w-1/2 mt-4">
          <Instructions />
        </div>
        
        {/* UploadTemplate on the right */}
        <div className="w-full lg:w-1/2 mt-5">
          <UploadTemplate />
        </div>
      </div>
    </div>
  );
};

export default DeveloperUpload;
