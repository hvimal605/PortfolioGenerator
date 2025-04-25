import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

export default function ErrorPage() {
  return (
    <div className="h-screen w-full bg-[#0b0b0f] flex flex-col items-center justify-center text-white relative overflow-hidden">
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="text-9xl font-bold tracking-widest text-[#e0e0e0] z-10"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-3 text-md text-gray-400 z-10"
      >
        This page is lost in the void.
      </motion.p>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-[#1a1a1f] hover:bg-[#25252d] border border-[#333] transition-all z-10 text-gray-300"
      >
        <AiOutlineHome className="w-5 h-5" />
        Return to safety
      </Link>

      {/* Subtle floating gradients for blackist vibe */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#6f00ff] rounded-full blur-[120px] z-0"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#00c6ff] rounded-full blur-[120px] z-0"
      />
    </div>
  );
}
