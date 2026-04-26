import React from 'react';
import Instructions from '../components/core/Developer/Instructions';
import UploadTemplate from '../components/core/Developer/UploadTemplate';

const DeveloperUpload = () => {
  return (
    <div className="w-full h-full pb-20 pt-10 px-6">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Instructions on the Left (50%) */}
        <div className="w-full lg:w-1/2">
          <Instructions />
        </div>
        
        {/* Upload Form on the Right (50%) */}
        <div className="w-full lg:w-1/2">
          <UploadTemplate />
        </div>
        
      </div>
    </div>
  );
};

export default DeveloperUpload;
