const cloudinary = require('cloudinary').v2


exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";

  // If file is a string, it's a URL. Otherwise, use tempFilePath.
  const path = typeof file === "string" ? file : file.tempFilePath;
  return await cloudinary.uploader.upload(path, options);
};