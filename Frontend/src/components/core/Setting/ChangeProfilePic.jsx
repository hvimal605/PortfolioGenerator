import { useEffect, useRef, useState } from "react"
import { HiOutlineCamera } from "react-icons/hi2"
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
      setLoading(false)
    }
  }

  useEffect(() => {
    if (imageFile) previewFile(imageFile)
  }, [imageFile])

  return (
    <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex flex-col items-center text-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />
      
      <div className="relative mb-6 group/avatar">
        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px] shadow-[0_0_20px_rgba(34,211,238,0.2)] mx-auto relative z-10 transition-transform duration-500 group-hover/avatar:scale-105">
          <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="w-full h-full rounded-full object-cover border border-white/20 bg-black"
          />
          <button 
            onClick={handleClick}
            className="absolute bottom-0 right-0 w-9 h-9 bg-cyan-500 rounded-full flex items-center justify-center text-black shadow-lg border-2 border-black hover:bg-cyan-400 transition-colors"
          >
            <HiOutlineCamera className="text-xl" />
          </button>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">Display Picture</h3>
      <p className="text-sm text-neutral-400 mb-6 font-medium px-4">Upload a new avatar. Recommended size is 256x256px.</p>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/gif, image/jpeg"
      />

      <div className="w-full flex gap-3 relative z-10">
        {imageFile ? (
          <>
            <button
              onClick={() => { setImageFile(null); setPreviewSource(null) }}
              disabled={loading}
              className="flex-1 py-3 bg-white/5 hover:text-white border border-white/10 rounded-xl text-neutral-300 font-bold tracking-wide hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleFileUpload}
              disabled={loading}
              className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-black font-extrabold tracking-wide shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all disabled:opacity-50 disabled:grayscale"
            >
              {loading ? "Saving..." : "Save Image"}
            </button>
          </>
        ) : (
          <button
            onClick={handleClick}
            className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-neutral-300 font-bold tracking-wide hover:bg-white/10 hover:text-white transition-colors"
          >
            Browse Files
          </button>
        )}
      </div>
    </div>
  )
}
