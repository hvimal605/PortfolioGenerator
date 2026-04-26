import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Button from "../components/common/AnimatedButton";
import { getAllTemplates } from "../services/operations/TemplateApi";
import { setTemplateId } from "../slices/PortfolioSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TemplateCardFortemplates from "../components/core/Template/TempalteCardFortemplates";
import SEO from "../components/common/SEO.JSX";
import { getUserDetails } from "../services/operations/SettingApi";

const ITEMS_PER_PAGE = 6;

// Motion variants for staggered grid
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: [0, -10, 0],
    scale: 1,
    transition: {
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 },
      y: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
  },
};

export default function TemplatesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchTemplates = async () => {
      const result = await getAllTemplates();
      if (result) {
        setTemplates(result);
      }
    };
    fetchTemplates();

    if (token) {
      dispatch(getUserDetails(token, navigate));
    }
  }, [token, dispatch, navigate]);

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${template?.CreatedBy?.firstName || ""} ${template?.CreatedBy?.lastName || ""}`
        .toLowerCase().includes(searchQuery.toLowerCase()) ||
      template?.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" ||
      template.templateType === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);
  const paginatedTemplates = filteredTemplates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleStartBuilding = () => {
    dispatch(setTemplateId(selectedTemplate._id));
    navigate("/PortfolioCreate/UploadDetails");
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-cyan-500/30 overflow-hidden">
      <SEO
        title="Premium Portfolio Templates | PortfolioCraft"
        description="Choose from our curated collection of premium portfolio templates. Experience high-end design and effortless customization."
        keywords="premium portfolio templates, high-end portfolios, design templates, portfolio builder"
      />

      {/* --- Cinematic Background --- */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full" />

        {/* Film Grain & Scanline Overlay */}
        <div className="absolute inset-0 z-10 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-multiply"></div>
        <motion.div
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 z-10 pointer-events-none h-1/2 w-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent opacity-20"
        />

        <div className="absolute inset-0 bg-[#030303] -z-10" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 relative group/title"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <Sparkles size={14} className="animate-pulse" />
            Curated Showcase
          </div>
          <h1 className="text-5xl sm:text-7xl font-black mb-6 tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/60 drop-shadow-2xl uppercase italic">
            Choose Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Dream Template
            </span>
          </h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/4 h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent transition-all duration-1000 group-hover/title:w-3/4"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed tracking-wide mt-10">
            Elevate your professional presence with our high-end, designer-crafted portfolio themes.
            Meticulously built for the modern creator.
          </p>
        </motion.div>

        {/* --- Search & Filter Module --- */}
        <div className="w-full max-w-4xl mb-20 flex flex-col md:flex-row items-center gap-6 relative z-30">

          {/* Main Glass Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 relative group w-full"
          >
            <div className="absolute inset-0 bg-cyan-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

            <div className="relative flex items-center bg-[#0a0a0a]/60 backdrop-blur-3xl border border-white/10 rounded-2xl p-1 shadow-2xl transition-all duration-500 overflow-hidden group-focus-within:border-cyan-500/30 group-focus-within:bg-[#0a0a0a]/80">
              <div className="pl-5 flex items-center justify-center text-gray-600 group-focus-within:text-cyan-400 transition-all duration-500">
                <Search size={22} strokeWidth={2.5} />
              </div>

              <input
                type="text"
                placeholder="Search premium templates..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-white pl-3 pr-5 py-4 placeholder:text-gray-700 text-base font-semibold tracking-wide"
              />

              {/* Real-time Match Count Chip */}
              <AnimatePresence>
                {searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="mr-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 backdrop-blur-xl flex items-center gap-2"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                      {filteredTemplates.length} Matches
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Category Filter Pill Control */}
          <div className="relative p-1.5 bg-[#0a0a0a]/60 backdrop-blur-3xl border border-white/10 rounded-[1.8rem] flex items-center gap-1 shadow-2xl shrink-0 group">
            {['all', 'free', 'premium'].map((f) => {
              const isActive = categoryFilter === f;
              const colorClasses = {
                all: 'bg-white/10 border-white/10 text-white shadow-white/5',
                free: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400 shadow-cyan-500/10',
                premium: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400 shadow-yellow-500/10'
              };

              return (
                <button
                  key={f}
                  onClick={() => {
                    setCategoryFilter(f);
                    setCurrentPage(1);
                  }}
                  className={`relative px-8 py-4 rounded-[1.3rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 z-10 ${isActive ? colorClasses[f] : 'text-neutral-600 hover:text-neutral-400'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="filter-indicator"
                      className={`absolute inset-0 border rounded-[1.3rem] -z-10 ${colorClasses[f].split(' ').slice(0, 2).join(' ')}`}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-20">{f}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* --- Templates Grid --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + searchQuery}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full"
          >
            {paginatedTemplates.length > 0 ? (
              paginatedTemplates.map((template) => (
                <motion.div key={template._id} variants={itemVariants}>
                  <TemplateCardFortemplates
                    template={template}
                    onSelect={setSelectedTemplate}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <div className="text-6xl mb-6 opacity-20">🔍</div>
                <h3 className="text-2xl font-bold text-white/80">No templates found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search filters</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* --- Pagination --- */}
        {totalPages > 1 && (
          <div className="mt-20 flex items-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-cyan-400 font-black">{currentPage}</span>
              <span className="text-white/20">/</span>
              <span className="text-white/60">{totalPages}</span>
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>

      {/* --- Selected Template Modal --- */}
      {/* Moved outside the relative container so its z-index (9999) can beat the navbar's z-index */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#0a0a0a] border border-white/10 text-white p-8 rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,1)] w-full max-w-2xl relative overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none" />

              <button
                onClick={() => setSelectedTemplate(null)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                style={{ zIndex: 100 }}
              >
                <motion.div whileHover={{ rotate: 90 }}>
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </motion.div>
              </button>

              <div className="relative z-10">
                <h2 className="text-4xl font-black mb-3 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                  {selectedTemplate.name}
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  {selectedTemplate.description}
                </p>

                <div className="flex items-center gap-6 mb-8 text-sm">
                  <div className="px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 font-bold uppercase tracking-widest text-[10px]">
                    {selectedTemplate.templateType || 'Standard'}
                  </div>
                  <div className="text-gray-500 italic">
                    Designed by <span className="text-white font-semibold">{selectedTemplate.CreatedBy?.firstName} {selectedTemplate.CreatedBy?.lastName}</span>
                  </div>
                </div>

                <div className="relative group rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                  <img
                    src={selectedTemplate.previewImage}
                    alt={selectedTemplate.name}
                    className="w-full h-[320px] object-cover bg-black group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="mt-10 flex justify-center">
                  <div onClick={handleStartBuilding} className="w-full sm:w-auto">
                    <Button content="🚀 Start Customizing" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
