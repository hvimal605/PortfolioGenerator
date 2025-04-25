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
    <div className="w-full bg-[#111111]/70 border border-white/10 backdrop-blur-md rounded-2xl shadow-[0_0_30px_#00000088] px-6 py-8 sm:px-10 sm:py-12 transition-all duration-300">
      <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 mb-6">
        Edit Personal Details
      </h3>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            About
          </label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="4"
            placeholder="Tell the world about your superpowers..."
            className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="mt-8 bg-gradient-to-r from-pink-600 to-purple-600 px-8 py-3 rounded-xl text-white font-semibold hover:shadow-[0_0_20px_#ec4899aa] transition-all duration-300"
        >
          Save Profile
        </button>
      </div>
    </div>
  )
}

export default PersonalDetailsChange
