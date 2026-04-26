import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { HiOutlineTrash } from "react-icons/hi2"
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
    <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-rose-500/10 rounded-[2rem] p-6 shadow-[0_8px_30px_rgba(225,29,72,0.05)] relative overflow-hidden group">
      
      {/* Subtle Danger Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-500/5 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="relative z-10 w-full flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20 mb-4 text-rose-500 group-hover:scale-110 transition-transform duration-500">
          <HiOutlineTrash className="text-3xl" />
        </div>

        <h3 className="text-xl font-bold text-white mb-2">
          Delete Account
        </h3>
        
        <p className="text-sm text-neutral-400 font-medium mb-6 px-2 leading-relaxed">
          This action is permanent and cannot be undone. All data will be wiped. Type <span className="font-bold text-white">DELETE</span> below.
        </p>

        <input
          type="text"
          value={deleteConfirm}
          onChange={(e) => setDeleteConfirm(e.target.value)}
          placeholder='DELETE'
          className="w-full bg-[#111] border border-rose-500/30 rounded-xl px-5 py-3 text-center text-white placeholder-rose-900/50 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all font-bold tracking-widest mb-4"
        />

        <button
          onClick={handleDelete}
          disabled={deleteConfirm !== "DELETE"}
          className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 relative z-20 ${
            deleteConfirm === "DELETE"
              ? "bg-rose-600 text-white shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:bg-rose-500"
              : "bg-white/5 border border-white/5 text-neutral-600 cursor-not-allowed"
          }`}
        >
          <HiOutlineTrash className="text-lg" />
          PERMANENTLY DELETE
        </button>
      </div>
    </div>
  )
}

export default DeleteAccount
