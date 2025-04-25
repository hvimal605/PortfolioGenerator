import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FiTrash2 } from "react-icons/fi"
import { deleteProfile } from "../../../services/operations/SettingApi"

const DeleteAccount = () => {
  const [deleteConfirm, setDeleteConfirm] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)

  const handleDelete = () => {
    if (deleteConfirm === "DELETE") {
      dispatch(deleteProfile(token, navigate))
    }
  }

  return (
    <div className="bg-red-900/40 backdrop-blur-md border border-red-500/30 shadow-[0_0_40px_#7f1d1d40] rounded-2xl p-6 sm:p-8 transition-all duration-300">
      <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-pink-400 mb-4">
        Danger Zone: Delete Account
      </h3>
      <p className="text-red-200 text-sm mb-6 leading-relaxed">
        This action is <span className="font-bold underline">permanent</span>. Your account, profile, and all data will be removed forever.
        <br />
        To confirm, please type <span className="font-semibold">DELETE</span> in the input below.
      </p>

      <input
        type="text"
        value={deleteConfirm}
        onChange={(e) => setDeleteConfirm(e.target.value)}
        placeholder='Type "DELETE"'
        className="w-full bg-red-950/60 border border-red-700 p-3 rounded-md text-white placeholder:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
      />

      <button
        onClick={handleDelete}
        disabled={deleteConfirm !== "DELETE"}
        className={`mt-6 w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2 rounded-lg text-white font-semibold transition duration-300 ${
          deleteConfirm === "DELETE"
            ? "bg-gradient-to-r from-red-600 to-pink-600 hover:shadow-[0_0_20px_#dc2626] hover:scale-[1.02]"
            : "bg-red-700 cursor-not-allowed opacity-50"
        }`}
      >
        <FiTrash2 className="text-lg" />
        Delete Account
      </button>
    </div>
  )
}

export default DeleteAccount
