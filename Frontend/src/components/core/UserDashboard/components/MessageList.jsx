import React from "react";
import dayjs from "dayjs";
import { FaReply, FaTrash } from "react-icons/fa";
import { SiGooglemessages } from "react-icons/si";

const MessageList = ({ response, onDelete }) => {
  if (!response || !response.success || !response.data) return null;

  const handleReply = (email, subject) => {
    window.location.href = `mailto:${email}?subject=Re: ${subject}`;
  };

  return (
    <div className=" p-8 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.5)] max-w-7xl mx-auto ">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10 tracking-tight">
  <span className="relative inline-block">
    <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-md opacity-30 rounded-xl"></span>
    <span className="relative z-10 flex justify-center items-center gap-3"> <SiGooglemessages /> Your Messages</span>
  </span>
</h2>



      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {response.data.length === 0 ? (
          <p className="text-gray-300 col-span-full text-center md:text-xl  text-sm animate__animated animate__fadeInUp flex justify-center items-center gap-2">
            <SiGooglemessages /> No messages yet... but they're coming!
          </p>
        ) : (
          response.data.map((msg, index) => (
            <div
              key={msg._id}
              className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-white shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-pink-500/50 hover:-translate-y-1 hover:scale-[1.015] animate__animated animate__zoomIn"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationDuration: "0.6s",
              }}
            >
              

              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-cyan-300 leading-tight">
                    {msg.subject}
                  </h3>
                  <span className="text-xs text-gray-400 ml-2">
                    {dayjs(msg.createdAt).format("MMM D, YYYY h:mm A")}
                  </span>
                </div>
                <p className="text-sm mb-1">
                  <span className="font-medium text-gray-400">From:</span>{" "}
                  {msg.senderName}
                </p>
                <p className="text-sm text-rose-200 mb-3 italic">{msg.email}</p>
                <p className="text-gray-200 text-sm leading-relaxed">
                  {msg.message}
                </p>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => handleReply(msg.email, msg.subject)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm px-5 py-2 rounded-xl font-semibold shadow-md transition-all duration-300"
                >
                  <FaReply />
                  Reply
                </button>
                <button
                  onClick={() => onDelete && onDelete(msg._id)}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-pink-600 hover:to-red-700 text-white text-sm px-5 py-2 rounded-xl font-semibold shadow-md transition-all duration-300"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageList;
