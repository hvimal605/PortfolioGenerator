import React from "react"
import PersonalDetailsChange from "./PersonalDetailsChange"
import ChangePassword from "./ChangePassword"
import DeleteAccount from "./DeleteAccount"
import ChangeProfilePicture from "./ChangeProfilePic"
import { IoSettingsOutline } from "react-icons/io5"

const Settings = () => {
  return (
    <div className="w-full flex justify-center items-center px-4 py-8 text-gray-100">
      <div className="w-full max-w-5xl p-8 sm:p-12 bg-[#111111]/60 backdrop-blur-md border border-gray-700 rounded-3xl shadow-[0_0_40px_#000000aa] mb-2">
        <h2 className="text-4xl sm:text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        <IoSettingsOutline />  Account Settings
        </h2>
        <p className="mt-3 text-center text-gray-400 text-lg font-light">
          Manage your identity, credentials, and security — all in one place.
        </p>

        <div className="mt-12 space-y-12  divide-gray-800">
          {/* Personal Details */}
          <div className="pt-0">
            <PersonalDetailsChange />
          </div>

          {/* Profile Picture */}
          <div className="pt-2">
            <ChangeProfilePicture />
          </div>

          {/* Change Password */}
          <div className="pt-2">
            <ChangePassword />
          </div>

          {/* Delete Account */}
          <div className="pt-2">
            <DeleteAccount />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
