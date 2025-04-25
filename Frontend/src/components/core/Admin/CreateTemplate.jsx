import React, { useState } from "react";

import AnimatedButton4 from "../../common/AnimatedButton4";
import { createTemplate} from "../../../services/operations/TemplateApi";
import ZipUpload from "../Developer/FileUpload";
import { useSelector } from "react-redux";


const CreateTemplate = () => {
    const [formData, setFormData] = useState({
        portfolioName: "",
        description: "",
        previewLink: "",
        createdBy: "",
    });

    const [zipFile, setZipFile] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);

    const { token } = useSelector((state) => state.auth);
    const [resetKey, setResetKey] = useState(0);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleZipUpload = (file) => {
        setZipFile(file);
    };

    const handlePreviewImgUpload = (e) => {
        setPreviewImg(e.target.files[0]);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.portfolioName ||
            !formData.description ||
            !formData.previewLink ||
            !zipFile ||
            !previewImg
        ) {
            return alert("All fields are required including ZIP and Preview Image.");
        }

        const payload = new FormData();
        payload.append("name", formData.portfolioName);
        payload.append("description", formData.description);
        payload.append("previewUrl", formData.previewLink);
        payload.append("file", zipFile);
        payload.append("previewImg", previewImg);
        payload.append("CreatedBy", formData.createdBy);


        const res = await createTemplate(payload, token);

       console.log("ye hai iska response ",res)

        setFormData({
            portfolioName: "",
            description: "",
            previewLink: "",
            createdBy:""
        });
        setZipFile(null);
        setPreviewImg(null);
        setResetKey((prev) => prev + 1);
    };

    return (
        <div className=" flex w-full justify-center items-center ">
            <div className=" flex justify-center items-center form-container sm:w-[60%] md:w-[70%] w-[97%] mb-3">



                <div className="w-full max-w-xl text-gray-200 p-3">
                    <h2 className="text-2xl text-center">
                        🚀<span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 drop-shadow-[0_0_12px_rgba(255,255,255,0.25)] animate-pulse mb-6 tracking-wider">Create Template</span>
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 p-2 backdrop-blur-lg w-full max-w-xl mx-auto mt-10"
                    >
                        {/* Portfolio Name */}
                        <div>
                            <label className="block mb-1 text-sm font-semibold text-pink-300" htmlFor="portfolioName">
                                📁 Portfolio Name
                            </label>
                            <input
                                type="text"
                                id="portfolioName"
                                name="portfolioName"
                                value={formData.portfolioName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 bg-black/40 text-white rounded-lg border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
                                placeholder="e.g., Harsh's Web Dev Portfolio"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block mb-1 text-sm font-semibold text-pink-300" htmlFor="description">
                                📝 Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 bg-black/40 text-white rounded-lg border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
                                placeholder="A short description of your project"
                                rows="3"
                                required
                            />
                        </div>

                        {/* Preview Link */}
                        <div>
                            <label className="block mb-1 text-sm font-semibold text-pink-300" htmlFor="previewLink">
                                🔗 Preview Link
                            </label>
                            <input
                                type="url"
                                id="previewLink"
                                name="previewLink"
                                value={formData.previewLink}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 bg-black/40 text-white rounded-lg border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
                                placeholder="https://example.com"
                                required
                            />
                        </div>

                        {/* CreatedBy (MongoDB User ID) */}
                        <div>
                            <label className="block mb-1 text-sm font-semibold text-pink-300" htmlFor="createdBy">
                                🧑‍💻 Created By (MongoDB User ID)
                            </label>
                            <input
                                type="text"
                                id="createdBy"
                                name="createdBy"
                                value={formData.createdBy || ""}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 bg-black/40 text-white rounded-lg border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
                                placeholder="Enter MongoDB user _id"
                                required
                            />
                        </div>


                        {/* Preview Image Upload */}
                        <div >
                            <label className="block mb-1 text-sm font-semibold text-pink-300" htmlFor="previewImg">
                                🖼️ Template Preview Image
                            </label>
                            <input
                                type="file"
                                id="previewImg"
                                accept="image/*"
                                onChange={handlePreviewImgUpload}
                                className="block w-full text-white file:cursor-pointer file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-pink-500/90 file:text-white hover:file:bg-pink-600 transition"
                                required
                            />

                            {previewImg && (
                                <div className="mt-4 flex flex-col items-center justify-center">
                                    <p className="text-sm text-pink-300 font-semibold mb-1">🖼️ Image Preview:</p>
                                    <img
                                        src={URL.createObjectURL(previewImg)}
                                        alt="Preview"
                                        className="max-w-xs rounded-lg border border-white/10 shadow-md"
                                    />
                                </div> 
                            )}
                        </div>


                        {/* ZIP File Upload */}
                        <ZipUpload onFileUpload={handleZipUpload} resetTrigger={resetKey} />

                        {/* Submit Button */}
                        <div className="flex justify-center mt-8">
                            <div className="rounded-2xl bg-black/60 border-2 border-pink-500 hover:shadow-pink-500/30 hover:shadow-md transition-all duration-300 px-2 py-1">
                                <AnimatedButton4 text="Upload" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTemplate;
