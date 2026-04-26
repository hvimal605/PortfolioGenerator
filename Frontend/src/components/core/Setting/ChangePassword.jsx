import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changePassword } from "../../../services/operations/SettingApi"
import { toast } from "sonner"

const ChangePassword = () => {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (!formData.oldPassword || !formData.newPassword) {
      return toast.error("Please fill both fields")
    }
    dispatch(changePassword(token, formData))
  }

  return (
    <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.4)] relative group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />
      
      <div className="relative z-10 w-full">
        <h3 className="text-xl font-bold text-white mb-6 tracking-wide">
          Security Credentials
        </h3>
        
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold tracking-wider text-neutral-500 uppercase ml-1">
              Current Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-neutral-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-medium tracking-widest"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold tracking-wider text-neutral-500 uppercase ml-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-neutral-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-medium tracking-widest"
            />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-white/[0.05]">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-white/10 hover:bg-cyan-500 hover:text-black border border-white/5 text-white font-bold rounded-xl transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
