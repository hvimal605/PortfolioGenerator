import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { getPortfoliosForUser } from '../../../../services/operations/PortfolioApi';
import { setPortfolio } from '../../../../slices/PortfolioSlice';
import AddDetails from './AddDetails';
import { HiOutlineGlobeAlt, HiChevronDown, HiOutlineCheck } from 'react-icons/hi2';

const AddMoreInPortfolio = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  
  // Custom dropdown state
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await getPortfoliosForUser(token);

        if (res?.success) {
          const deployedPortfolios = res.portfolios
            .filter((portfolio) => portfolio.deployLink)
            .map((portfolio) => ({
              ...portfolio,
              _id: portfolio.portfolioId,
            }));
          setPortfolios(deployedPortfolios);
        }
      } catch (err) {
        console.error("Failed to fetch portfolios:", err);
      }
    };

    if (token) {
      fetchPortfolios();
    }
  }, [token]);

  useEffect(() => {
    if (portfolios.length > 0) {
      const firstPortfolio = portfolios[0];
      setSelectedPortfolio(firstPortfolio); 
      dispatch(setPortfolio(firstPortfolio)); 
    }
  }, [portfolios, dispatch]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (portfolio) => {
    setSelectedPortfolio(portfolio);
    dispatch(setPortfolio(portfolio));
    setIsOpen(false);
  };

  return (
    <div className="text-white space-y-12 pb-20">
      
      {/* --- EXTREME HEADER --- */}
      <div className="flex flex-col gap-2 pb-8 border-b border-white/[0.05] relative group/title">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 uppercase italic">
          Add Content
        </h2>
        <div className="absolute bottom-[30px] left-0 w-1/4 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent transition-all duration-700 group-hover/title:w-1/2"></div>
        <p className="text-neutral-400 mt-2 text-sm md:text-base tracking-[0.05em] font-medium bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-500">
          Select a portfolio to inject new experiences, projects, and skills.
        </p>
      </div>

      {/* --- SEXY SELECTOR MODULE --- */}
      <div className="group relative flex flex-col items-center bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/[0.05] hover:border-white/[0.1] rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] overflow-visible max-w-2xl mx-auto mt-12 mb-12 z-30">
        <div className="absolute -inset-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none rounded-full blur-[100px] bg-cyan-600/5 translate-y-1/2" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none rounded-[2.5rem]"></div>

        <label className="text-xl md:text-2xl font-bold tracking-tight text-white mb-8 relative z-10 flex items-center justify-center gap-3">
          <HiOutlineGlobeAlt className="text-2xl md:text-3xl text-cyan-500" />
          Choose Your Deployed Portfolio
        </label>

        {/* CUSTOM FRAMER-MOTION DROPDOWN */}
        <div className="relative z-20 w-full md:w-5/6" ref={dropdownRef}>
          {/* Custom Select Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center justify-between bg-black/40 border ${isOpen ? 'border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.1)]' : 'border-white/10 hover:border-cyan-500/30'} text-white px-6 py-5 rounded-[1.25rem] transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]`}
          >
            <span className={`font-medium tracking-wide text-sm md:text-base truncate pr-4 ${!selectedPortfolio ? 'text-neutral-500' : 'text-neutral-100'}`}>
              {selectedPortfolio ? selectedPortfolio.deployLink : "No deployed portfolios found"}
            </span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-cyan-500/70">
              <HiChevronDown className="text-2xl" />
            </motion.div>
          </button>

          {/* Custom Select Menu */}
          <AnimatePresence>
            {isOpen && portfolios.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-full left-0 right-0 mt-3 p-2 bg-[#0a0a0a]/98 backdrop-blur-2xl border border-white/10 rounded-[1.25rem] shadow-[0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden z-50 origin-top flex flex-col"
              >
                <div className="max-h-64 overflow-y-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {portfolios.map((p) => {
                    const isSelected = selectedPortfolio?._id === p._id;
                    return (
                      <button
                        key={p._id}
                        onClick={() => handleSelect(p)}
                        className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl text-left transition-all duration-300 mb-1 last:mb-0 group
                          ${isSelected 
                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                            : 'bg-transparent text-neutral-300 hover:text-white hover:bg-white/[0.03] border border-transparent hover:border-white/5'
                          }`}
                      >
                        <span className="font-medium truncate pr-4 tracking-wide text-sm">{p.deployLink}</span>
                        {isSelected && <HiOutlineCheck className="text-xl text-cyan-500 shrink-0" />}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {selectedPortfolio && (
        <div className="relative z-10 animate-fade-in-up mt-12 border-t border-white/5 pt-12">
          <AddDetails />
        </div>
      )}
    </div>
  );
};

export default AddMoreInPortfolio;
