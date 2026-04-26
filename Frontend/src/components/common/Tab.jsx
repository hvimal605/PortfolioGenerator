import { motion } from "framer-motion";

export default function Tab({ tabData, field, setField }) {
  return (
    <div className="w-full">
      <div className="relative flex bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden w-full p-1 backdrop-blur-xl">
        {/* Animated Indicator */}
        <motion.div
          className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-500/20"
          initial={false}
          animate={{ x: field === tabData[0].type ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
        
        {/* Tab Buttons */}
        {tabData.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setField(tab.type)}
            className={`w-1/2 relative z-10 text-[11px] font-bold uppercase tracking-[0.15em] py-3.5 transition-all duration-300 ${
              field === tab.type ? "text-white drop-shadow-md" : "text-white/40 hover:text-white/70"
            }`}
          >
            {tab.tabName}
          </button>
        ))}
      </div>
    </div>
  );
}
