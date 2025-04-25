import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changePassword } from "../../../services/operations/SettingApi"
import { toast } from "react-hot-toast"

const ChangePassword = () => {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    if (!formData.oldPassword || !formData.newPassword) {
      return toast.error("Please fill both fields")
    }
    dispatch(changePassword(token, formData))
  }

  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_0_25px_#00000050] rounded-2xl p-6 sm:p-8 transition-all duration-300">
      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6">
        Change Password
      </h3>
      <div className="grid gap-6">
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Current Password
          </label>
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            placeholder="Enter current password"
            className="w-full bg-gray-900 border border-gray-700 text-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-2">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            className="w-full bg-gray-900 border border-gray-700 text-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-8 w-full sm:w-auto px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:shadow-[0_0_20px_#a855f7] hover:scale-[1.02] transition-all duration-300"
      >
        Change Password
      </button>
    </div>
  )
}

export default ChangePassword
