import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import dayjs from "dayjs";
import { HiOutlineTrash, HiOutlineInbox, HiOutlineXMark } from "react-icons/hi2";
import { FaReply } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const MessageList = ({ response, onDelete }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!response || !response.success || !response.data) return null;

  const handleReply = (email, subject) => {
    window.location.href = `mailto:${email}?subject=Re: ${subject}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="w-full">
      {response.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-white/10 rounded-[2rem] bg-white/[0.02]">
          <div className="p-5 rounded-full bg-white/[0.03] mb-4">
            <HiOutlineInbox className="text-5xl text-neutral-600" />
          </div>
          <h3 className="text-xl font-bold text-neutral-300 mb-2 tracking-wide">Inbox Empty</h3>
          <p className="text-neutral-500 font-medium tracking-wide">No messages have arrived yet.</p>
        </div>
      ) : (
        <motion.div 
          className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {response.data.map((msg) => {
            const isLongMessage = msg.message && msg.message.length > 120;

            return (
            <motion.div
              key={msg._id}
              variants={cardVariants}
              className="relative group bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 hover:border-cyan-500/40 rounded-[1.5rem] p-6 text-white shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-500 flex flex-col h-full overflow-hidden"
            >
              {/* Subtle glass glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[1.5rem]" />

              <div className="flex-grow relative z-10">
                <div className="flex justify-between items-start mb-5 gap-4">
                  <h3 className="text-lg font-bold text-white leading-tight break-words">
                    {msg.subject || "No Subject"}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-neutral-400 whitespace-nowrap bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/[0.05]">
                    {dayjs(msg.createdAt).format("MMM D, YYYY • h:mm A")}
                  </span>
                </div>
                
                <div className="space-y-1 mb-5">
                  <p className="text-sm font-medium flex items-center justify-between">
                    <span className="text-neutral-500">From:</span>
                    <span className="text-neutral-200">{msg.senderName}</span>
                  </p>
                  <p className="text-sm font-medium flex items-center justify-between">
                    <span className="text-neutral-500">Email:</span>
                    <a href={`mailto:${msg.email}`} className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      {msg.email}
                    </a>
                  </p>
                </div>

                <div 
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-4 rounded-xl bg-white/[0.03] border border-white/5 mb-6 inset-shadow-sm shadow-black shrink-0 relative transition-colors duration-300 cursor-pointer group/msg hover:border-cyan-500/30 hover:bg-white/[0.05]`}
                >
                  <p className={`text-neutral-300 text-sm leading-relaxed ${isLongMessage ? 'line-clamp-3' : ''}`}>
                    {msg.message}
                  </p>
                  {isLongMessage && (
                    <div className="absolute bottom-2 right-2 text-xs font-bold text-cyan-500 opacity-0 group-hover/msg:opacity-100 transition-opacity duration-300 bg-[#0a0a0a]/90 px-2 py-1 rounded">
                      Read More
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex justify-end gap-3 pt-5 border-t border-white/[0.05] relative z-10 mt-auto">
                <button
                  onClick={() => onDelete && onDelete(msg._id)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-300 group/btn"
                >
                  <HiOutlineTrash className="text-lg group-hover/btn:scale-110 transition-transform duration-300" />
                  <span>Delete</span>
                </button>
                <button
                  onClick={() => handleReply(msg.email, msg.subject)}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl bg-white/10 text-white hover:bg-cyan-500 hover:text-black border border-white/5 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] group/reply"
                >
                  <FaReply className="text-base group-hover/reply:-translate-x-1 transition-transform duration-300" />
                  <span>Reply</span>
                </button>
              </div>
            </motion.div>
          );
        })}
        </motion.div>
      )}

      {/* Message Reading Modal */}
      {isClient && createPortal(
        <AnimatePresence>
          {selectedMessage && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
             <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-zoom-out"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
              className="relative max-w-2xl w-full bg-[#0a0a0a] border border-white/10 p-8 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 flex flex-col max-h-[85vh]"
            >
              <button 
                onClick={() => setSelectedMessage(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <HiOutlineXMark className="text-2xl" />
              </button>

              <h2 className="text-2xl font-bold text-white pr-10 mb-2 leading-tight">
                {selectedMessage.subject || "No Subject"}
              </h2>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 pb-6 border-b border-white/10 text-sm">
                <span className="text-neutral-400 font-medium">From: <span className="text-white ml-1">{selectedMessage.senderName}</span></span>
                <span className="text-neutral-400 font-medium">Email: <a href={`mailto:${selectedMessage.email}`} className="text-cyan-400 hover:text-cyan-300 transition-colors ml-1">{selectedMessage.email}</a></span>
                <span className="text-neutral-500 font-medium w-full mt-2">
                  {dayjs(selectedMessage.createdAt).format("MMMM D, YYYY • h:mm A")}
                </span>
              </div>

              <div className="overflow-y-auto pr-2 flex-grow [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
                <p className="text-neutral-200 leading-relaxed whitespace-pre-wrap text-[15px]">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex justify-end gap-3 shrink-0">
                <button
                  onClick={() => {
                    if (onDelete) onDelete(selectedMessage._id);
                    setSelectedMessage(null);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-300 group/btn"
                >
                  <HiOutlineTrash className="text-lg group-hover/btn:scale-110 transition-transform duration-300" />
                  <span>Delete</span>
                </button>
                <button
                  onClick={() => handleReply(selectedMessage.email, selectedMessage.subject)}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl bg-white/10 text-white hover:bg-cyan-500 hover:text-black border border-white/5 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] group/reply"
                >
                  <FaReply className="text-base group-hover/reply:-translate-x-1 transition-transform duration-300" />
                  <span>Reply</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default MessageList;
