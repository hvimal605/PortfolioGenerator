import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi2";

const faqs = [
  {
    question: "How do I build my portfolio?",
    answer: "It's easy! First, sign up. Then click 'Start Building', pick a design you like, and add your details. Once you are ready, click 'Deploy' and your site will be live instantly."
  },
  {
    question: "Can I change my info later?",
    answer: "Yes! You can update your skills, projects, and details anytime from your dashboard. Your live site will update immediately."
  },
  {
    question: "Can I add my own design?",
    answer: "Yes, we love that! If you are a developer, you can upload your own templates for others to use and see how many people like them."
  },
  {
  question: "Are all templates free?",
  answer: "We offer both free and premium templates. You can start with free options and upgrade anytime to unlock advanced designs and features."
}
];

const FAQItem = ({ faq, isOpen, toggle }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative group rounded-[2rem] border transition-all duration-500 overflow-hidden ${
        isOpen ? 'bg-white/10 border-indigo-500/50 shadow-[0_0_50px_rgba(99,102,241,0.1)]' : 'bg-white/5 border-white/10 hover:border-white/20'
      }`}
    >
      <button 
        onClick={toggle}
        className="w-full p-8 flex items-center justify-between text-left group"
      >
        <span className={`text-xl font-black transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
          {faq.question}
        </span>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ${
          isOpen ? 'bg-indigo-500 border-indigo-400 rotate-0' : 'bg-white/5 border-white/10 rotate-90'
        }`}>
          {isOpen ? <HiOutlineMinus className="text-white" /> : <HiOutlinePlus className="text-white/40" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-8 pb-8 text-lg font-medium text-white/40 leading-relaxed border-t border-white/5 pt-6">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-32 bg-[#030712] text-white relative overflow-hidden">
      {/* 🌌 Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-emerald-400 mb-6 block">Common Questions</span>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none mb-8">
            Everything You <br />
            <span className="bg-gradient-to-r from-emerald-200 via-indigo-200 to-fuchsia-200 bg-clip-text text-transparent italic">Need To Know</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-indigo-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              faq={faq} 
              isOpen={openIndex === index} 
              toggle={() => setOpenIndex(openIndex === index ? -1 : index)} 
            />
          ))}
        </div>

        {/* 🪄 Floating Accent */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mt-20 flex justify-center opacity-20"
        >
           <div className="flex flex-col items-center gap-4">
              <div className="w-[1px] h-20 bg-gradient-to-b from-[#030712] to-white/40"></div>
              <span className="text-[9px] font-black uppercase tracking-[0.8em]">Start Your Journey</span>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
