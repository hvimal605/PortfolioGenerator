import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateProfile } from "../../../services/operations/SettingApi"

const PersonalDetailsChange = () => {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    about: user?.about || "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    dispatch(updateProfile(token, formData))
  }

  return (
    <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.4)] relative group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />
      
      <div className="relative z-10 w-full">
        <h3 className="text-xl font-bold text-white mb-6 tracking-wide">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold tracking-wider text-neutral-500 uppercase ml-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="e.g. Jane"
              className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-medium"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold tracking-wider text-neutral-500 uppercase ml-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="e.g. Doe"
              className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-medium"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 mb-8">
          <label className="text-xs font-bold tracking-wider text-neutral-500 uppercase ml-1">
            Bio / About
          </label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="4"
            placeholder="A brief description of who you are..."
            className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-medium resize-none custom-scrollbar"
          />
        </div>

        <div className="flex justify-end pt-6 border-t border-white/[0.05]">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-white/10 hover:bg-cyan-500 hover:text-black border border-white/5 text-white font-bold rounded-xl transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default PersonalDetailsChange
