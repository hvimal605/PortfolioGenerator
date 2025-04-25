const Editcom = ({ isOpen, onClose, editData, setEditData, onSave }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center overflow-auto"
            onClick={onClose}
        >
            <div
                className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-white mb-6 text-center tracking-wide">
                    Edit Project
                </h2>

                <div className="space-y-5">
                    <input
                        type="text"
                        placeholder="Title"
                        value={editData.title}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#2b2b2b] text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-600 outline-none"
                    />

                    <textarea
                        placeholder="Description"
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#2b2b2b] text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-600 outline-none resize-none"
                        rows="4"
                    />

                    <input
                        type="text"
                        placeholder="Technologies (comma-separated)"
                        value={editData.technologies}
                        onChange={(e) => setEditData({ ...editData, technologies: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#2b2b2b] text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-600 outline-none"
                    />

                    <input
                        type="text"
                        placeholder="GitHub Link"
                        value={editData.gitRepoLink}
                        onChange={(e) => setEditData({ ...editData, gitRepoLink: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#2b2b2b] text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-600 outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Live Link"
                        value={editData.projectLink}
                        onChange={(e) => setEditData({ ...editData, projectLink: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#2b2b2b] text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-600 outline-none"
                    />

                    {editData.projectBanner && (
                        <div className="mt-4">
                            <img
                                src={
                                    editData.projectBanner.url
                                        ? editData.projectBanner.url
                                        : editData.projectBanner instanceof File
                                        ? URL.createObjectURL(editData.projectBanner)
                                        : null
                                }
                                alt="Preview"
                                className="w-full h-auto rounded-lg shadow-md"
                            />
                        </div>
                    )}

                    <label className="block mt-2">
                        <span className="text-gray-300 mb-1 block">Update Project Banner</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setEditData({ ...editData, projectBanner: e.target.files[0] })
                            }
                            className="block w-full text-sm text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-600 file:text-black hover:file:bg-yellow-500 cursor-pointer"
                        />
                    </label>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                    <button
                        className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all shadow hover:shadow-lg"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-lg hover:brightness-110 transition-all shadow-md hover:shadow-yellow-400/40"
                        onClick={onSave}
                    >
                        💾 Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Editcom;
