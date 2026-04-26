import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllPlatformContacts, deletePlatformContact } from "../../../services/operations/contactApi";
import { HiOutlineEnvelope, HiOutlineTrash, HiOutlineClock, HiOutlineUserCircle, HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const PlatformMessages = () => {
    const { token } = useSelector((state) => state.auth);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const data = await getAllPlatformContacts(token);
                setMessages(data || []);
            } catch (error) {
                console.error("Failed to fetch messages:", error);
                toast.error("Failed to load messages");
            }
            setLoading(false);
        };
        fetchMessages();
    }, [token]);

    const handleDelete = async (messageId) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            const success = await deletePlatformContact(messageId, token);
            if (success) {
                setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
            }
        }
    };

    return (
        <div className="flex flex-col gap-10">
            
            {/* Header Area */}
            <div className="flex flex-col gap-2">
               <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] font-black tracking-[0.4em] text-emerald-500/60 uppercase italic underline decoration-emerald-500/20 underline-offset-4">Live Link Feed</span>
               </div>
               <h1 className="text-4xl font-black tracking-tighter text-white">
                    Platform <span className="text-white/40">Conversations</span>
               </h1>
               <p className="text-zinc-500 font-medium text-sm italic">
                    Managing inquiries and portal support submissions.
               </p>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 gap-6">
                    <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Syncing database...</p>
                </div>
            ) : messages.length === 0 ? (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-40 text-center"
                >
                    <div className="w-24 h-24 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-8 shadow-inner shadow-black">
                        <HiOutlineChatBubbleLeftEllipsis className="text-4xl text-zinc-800" />
                    </div>
                    <h3 className="text-white font-black text-xl tracking-tight">No conversations found</h3>
                    <p className="text-zinc-600 text-sm italic mt-1">There are currently no inquiries in the queue.</p>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-20">
                    {messages.map((msg, index) => (
                        <motion.div 
                            key={msg._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative bg-[#0A0A0A]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:bg-white/[0.02]"
                        >
                            {/* Hover Accent Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            <div className="relative z-10 flex flex-col gap-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-5 items-center">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 group-hover:text-white transition-colors duration-500 group-hover:scale-105 group-hover:bg-white/10 group-hover:border-white/20">
                                            <HiOutlineUserCircle className="text-3xl" />
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <h3 className="text-xl font-black tracking-tight text-white/90">
                                                {msg.firstName} {msg.lastName}
                                            </h3>
                                            <a 
                                               href={`mailto:${msg.email}`} 
                                               className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-500/60 hover:text-indigo-400 transition-colors"
                                            >
                                                {msg.email}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-3">
                                        <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-zinc-400 transition-colors">
                                            <HiOutlineClock />
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </div>
                                        <button 
                                            onClick={() => handleDelete(msg._id)}
                                            className="w-10 h-10 bg-pink-500/[0.02] border border-pink-500/5 text-pink-500/20 hover:text-pink-400 hover:bg-pink-500/10 hover:border-pink-500/30 rounded-xl flex items-center justify-center transition-all duration-300"
                                            title="Delete Message"
                                        >
                                            <HiOutlineTrash className="text-lg" />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="pt-8 border-t border-white/5 relative">
                                    <div className="absolute top-[-1px] left-0 w-12 h-[2px] bg-indigo-500/40"></div>
                                    <p className="text-zinc-500 text-sm font-medium leading-[1.8] italic group-hover:text-zinc-300 transition-colors duration-500">
                                        “ {msg.message} ”
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PlatformMessages;
