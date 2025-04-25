import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { updateDisplayPicture } from "../../../services/operations/SettingApi"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)
  const fileInputRef = useRef(null)

  const handleClick = () => fileInputRef.current.click()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => setPreviewSource(reader.result)
  }

  const handleFileUpload = () => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      dispatch(updateDisplayPicture(token, formData)).then(() => setLoading(false))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if (imageFile) previewFile(imageFile)
  }, [imageFile])

  return (
    <div className="w-full bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_0_25px_#00000070] p-6 sm:p-8 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300">
      {/* Avatar and Text */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 w-full">
        <img
          src={previewSource || user?.image}
          alt={`profile-${user?.firstName}`}
          className="w-[72px] sm:w-[84px] h-[72px] sm:h-[84px] rounded-full object-cover border-2 border-pink-500 shadow-[0_0_20px_#ec489980] hover:scale-105 transition-transform duration-300"
        />
        <div className="text-center sm:text-left w-full">
          <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
            Change Profile Picture
          </p>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-3 mt-3 w-full">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            <button
              onClick={handleClick}
              disabled={loading}
              className="w-full sm:w-auto bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-medium px-5 py-2 rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              Select
            </button>
            <button
              onClick={handleFileUpload}
              disabled={loading}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 font-medium px-5 py-2 rounded-lg transition-all duration-300 ${
                loading
                  ? "bg-yellow-300/50 cursor-not-allowed"
                  : "bg-gradient-to-r from-yellow-300 to-yellow-400 text-black hover:brightness-105"
              }`}
            >
              {loading ? "Uploading..." : "Upload"} {!loading && <FiUpload className="text-lg" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
