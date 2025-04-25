const express = require('express');
const unzipper = require('unzipper');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');



// Upload extracted files to Cloudinary
async function uploadExtractedFiles(tempDir, cloudinaryFolder) {
    const uploadedUrls = [];
    const files = fs.readdirSync(tempDir);

    for (const file of files) {
        const filePath = path.join(tempDir, file);
        if (fs.lstatSync(filePath).isFile()) {
            console.log(`Uploading file: ${file}`);
            const result = await cloudinary.uploader.upload(filePath, { 
                resource_type: 'auto', 
                folder: cloudinaryFolder // Specify the folder in Cloudinary
            });
            console.log(`Uploaded ${file}:`, result.secure_url);
            uploadedUrls.push(result.secure_url);
        }
    }

    return uploadedUrls;
}

// Endpoint to handle ZIP upload
exports.uploadFolder = async (req, res) => {
    try {
        // Check if a file is uploaded
        if (!req.files || !req.files.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        // Create temporary directory to extract ZIP contents
        const tempDir = path.join(__dirname, 'temp');
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

        // Get the uploaded file
        const uploadedFile = req.files.file;
        const zipFilePath = path.join(tempDir, 'uploaded.zip');

        // Save the uploaded ZIP file to disk
        uploadedFile.mv(zipFilePath, (err) => {
            if (err) {
                console.error('Error saving file:', err);
                return res.status(500).json({ error: 'Error saving ZIP file.' });
            }

            // Extract the ZIP contents
            console.log('Extracting ZIP file...');
            fs.createReadStream(zipFilePath)
                .pipe(unzipper.Extract({ path: tempDir }))
                .promise()
                .then(async () => {
                    // Define the Cloudinary folder name
                    const cloudinaryFolder = 'HelloJi'; // Replace with your desired folder name

                    // Upload extracted files to Cloudinary
                    const uploadedUrls = await uploadExtractedFiles(tempDir, cloudinaryFolder);

                    // Clean up temporary files
                    fs.rmSync(tempDir, { recursive: true, force: true });
                    console.log('Temporary files cleaned up.');

                    // Respond with the uploaded file URLs
                    res.json({ message: 'Files uploaded successfully!', urls: uploadedUrls });
                })
                .catch((error) => {
                    console.error('Error extracting ZIP file:', error);
                    res.status(500).json({ error: 'Error extracting ZIP file.' });
                });
        });
    } catch (error) {
        console.error('Error processing ZIP file:', error);
        res.status(500).json({ error: 'Error processing ZIP file.', details: error.message });
    }
};

