import React from "react"
import { motion } from "framer-motion"
import PersonalDetailsChange from "./PersonalDetailsChange"
import ChangePassword from "./ChangePassword"
import DeleteAccount from "./DeleteAccount"
import ChangeProfilePicture from "./ChangeProfilePic"
import { HiOutlineCog8Tooth } from "react-icons/hi2"

const Settings = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  }

  return (
    <div className="w-full h-full text-white font-sans max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 mb-10 pl-2 relative group/title">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-3 drop-shadow-md uppercase italic">
          <HiOutlineCog8Tooth className="text-cyan-400 group-hover/title:rotate-90 transition-transform duration-700" />
          Account Settings
        </h2>
        <div className="absolute bottom-[-8px] left-2 w-1/4 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent transition-all duration-700 group-hover/title:w-full"></div>
        <p className="text-neutral-400 font-medium tracking-[0.05em] mt-3">
          Manage your personal information, security preferences, and dashboard identity.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 xl:grid-cols-12 gap-8"
      >
        <motion.div variants={childVariants} className="xl:col-span-8 flex flex-col gap-8">
          <PersonalDetailsChange />
          <ChangePassword />
        </motion.div>

        <motion.div variants={childVariants} className="xl:col-span-4 flex flex-col gap-8">
          <ChangeProfilePicture />
          <DeleteAccount />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Settings
