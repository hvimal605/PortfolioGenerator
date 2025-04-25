import { motion } from "framer-motion";

export default function Tab({ tabData, field, setField }) {
  return (
    <div className="flex justify-center mb-6">
      <div className="relative flex bg-gray-700 rounded-full overflow-hidden w-48 p-1">
        {/* Animated Indicator */}
        <motion.div
          className="absolute top-0 bottom-0 left-0 w-1/2 rounded-full bg-cyan-300"
          initial={false}
          animate={{ x: field === tabData[0].type ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
        {/* Tab Buttons */}
        {tabData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setField(tab.type)}
            className={`w-1/2 z-10 text-md font-semibold py-2 transition-all duration-200 ${
              field === tab.type ? "text-black" : "text-gray-300"
            }`}
          >
            {tab.tabName}
          </button>
        ))}
      </div>
    </div>
  );
}
