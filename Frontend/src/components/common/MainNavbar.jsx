import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/operations/authApi";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineCube, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

const MainNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.profile.user);
  const [hoveredLink, setHoveredLink] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔒 Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const dashboardLink =
    user?.accountType === "Admin"
      ? "/AdminDas"
      : user?.accountType === "Developer"
        ? "/developerdas"
        : "/UserDas";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Templates", path: "/templates" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contactus" }
  ];

  return (
    <nav className="fixed top-0 left-0 z-[1000] w-full pointer-events-none">
      <div className="relative group/nav pointer-events-auto">
        {/* ✨ Holographic Animated Border */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-50 group-hover/nav:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        <div className="absolute -bottom-[1px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-60"></div>

        <div className="relative bg-[#050505]/85 backdrop-blur-3xl border-b border-white/10 px-6 sm:px-12 py-4 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">

          {/* 🌌 Deep Flow Mesh */}
          <div className="absolute inset-0 z-0 opacity-20 group-hover/nav:opacity-40 transition-opacity duration-1000">
            <div className="absolute -top-[100%] -left-[20%] w-[140%] h-[300%] bg-[radial-gradient(circle,rgba(99,102,241,0.25)_0%,transparent_50%)] animate-[pulse_10s_infinite]"></div>
          </div>

          {/* 🏹 Iconic Master Logo 3.0 */}
          <Link to="/" className="flex items-center gap-3 sm:gap-4 relative z-10 group/logo">
            <div className="relative scale-75 sm:scale-100 origin-left">
              {/* 🌌 Atmospheric Backdrop */}
              <div className="absolute inset-[-10px] bg-indigo-500/20 blur-[30px] rounded-full group-hover/logo:bg-fuchsia-500/30 transition-all duration-1000"></div>

              {/* 🚀 Kinetic 3D Icon */}
              <div className="relative w-12 h-12 sm:w-13 sm:h-13 bg-[#0a0a0a] rounded-[1rem] sm:rounded-2xl flex items-center justify-center border border-white/10 group-hover/logo:border-white/30 transition-all duration-700 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(79,70,229,0.3),transparent)] animate-[spin_3s_linear_infinite]"></div>
                <HiOutlineCube className="text-2xl sm:text-3xl text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] group-hover/logo:scale-110 transition-transform duration-500" />

                {/* Internal Glow Pulse */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-fuchsia-600/20 animate-pulse"></div>
              </div>
            </div>

            <div className="flex flex-col relative">
              <span className="text-xl sm:text-2xl font-black tracking-tighter leading-none flex items-center bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
                Portfolio
                <span className="relative">
                  <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent italic pr-1">Craft</span>
                </span>
              </span>
              <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span>
                <span className="text-[7px] sm:text-[9px] font-black text-white/30 uppercase tracking-[0.4em] group-hover/logo:text-indigo-300 transition-colors">Digital Boutique</span>
              </div>
            </div>
          </Link>

          {/* 🧭 Floating Interaction Pills */}
          <div className="hidden lg:flex items-center gap-2 bg-[#111]/80 rounded-full p-1.5 border border-white/10 relative z-10 backdrop-blur-xl shadow-inner">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative px-7 py-2.5 text-[12px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-all duration-300 rounded-full"
              >
                <span className="relative z-10">{link.name}</span>
                {hoveredLink === link.name && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* ⚡ High-Action Area */}
          <div className="flex items-center gap-3 sm:gap-8 relative z-10">
            {user ? (
              <div className="flex items-center gap-3 sm:gap-6 pl-3 sm:pl-6 border-l border-white/10">
                <div className="hidden sm:flex flex-col items-end text-right">
                  <span className="text-sm font-black text-white uppercase tracking-tighter">{user?.firstName} {user?.lastName}</span>
                  <button
                    onClick={handleLogout}
                    className="text-[10px] font-black text-rose-500 hover:text-rose-400 transition-colors flex items-center gap-2 group/logout tracking-[0.2em] mt-1"
                  >
                    <HiOutlineArrowRightOnRectangle className="text-lg group-hover:translate-x-1.5 transition-transform" />
                    Logout
                  </button>
                </div>

                <Link to={dashboardLink} className="relative group/avatar cursor-pointer">
                  {/* Magnetic Aura */}
                  <div className="absolute -inset-2 sm:-inset-3 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500" />
                  
                  {/* Profile Image */}
                  <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-full p-[2px] bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-emerald-400 overflow-hidden transform group-hover/avatar:scale-105 transition-transform duration-500 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                    <img
                      src={user?.image || "/default-profile.png"}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-2 border-[#0a0a0a]"
                    />
                  </div>
                  {/* Online Dot */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 rounded-full border-2 sm:border-[3px] border-[#0a0a0a] shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-4">
                <Link to="/login" className="px-4 py-2 sm:px-5 sm:py-2 text-[10px] sm:text-[11px] font-black text-gray-400 hover:text-white transition-all uppercase tracking-[0.2em]">
                  LogIn
                </Link>
                <Link
                  to="/signup"
                  className="group relative px-4 py-2 sm:px-6 sm:py-2.5 bg-white text-black text-[9px] sm:text-[11px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] rounded-full hover:scale-105 active:scale-95 transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.15)] overflow-hidden border border-white"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-500 whitespace-nowrap">Signup</span>
                </Link>
              </div>
            )}

            {/* 🔥 Cyber Mobile Multi-Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-9 h-9 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg sm:rounded-2xl bg-white/5 border border-white/20 text-white hover:bg-white/10 transition-all active:scale-90"
            >
              {menuOpen ? <FaTimes size={16} className="sm:size-[24px]" /> : <FaBars size={16} className="sm:size-[24px]" />}
            </button>
          </div>
        </div>

        {/* 📱 Mobile Studio Panel Overhaul */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Dark Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[80] lg:hidden"
              />
              
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-screen w-[85%] sm:w-[400px] bg-[#050505] border-l border-white/10 p-8 sm:p-12 lg:hidden z-[100] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col"
              >
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em]">Navigation Menu</span>
                  <button 
                    onClick={() => setMenuOpen(false)}
                    className="p-3 bg-white/5 border border-white/10 rounded-xl text-white"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-3 overflow-y-auto flex-1 pr-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <style>{`
                    .no-scrollbar::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                  <div className="flex flex-col gap-3 no-scrollbar">
                  {navLinks.map((link, index) => (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={link.name}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group/mob"
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Explore</span>
                          <span className="text-base font-black text-white group-hover:text-indigo-300 transition-colors">{link.name}</span>
                        </div>
                        <HiOutlineCube className="text-lg text-indigo-500/30 group-hover/mob:text-indigo-500 group-hover/mob:rotate-12 transition-all duration-500" />
                      </Link>
                    </motion.div>
                  ))}

                  {user && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navLinks.length * 0.1 }}
                    >
                      <Link
                        to={dashboardLink}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 hover:bg-indigo-500/20 transition-all group/mob mt-2"
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">User Panel</span>
                          <span className="text-base font-black text-white">Dashboard</span>
                        </div>
                        <img 
                          src={user?.image || "/default-profile.png"} 
                          alt="Profile" 
                          className="w-8 h-8 rounded-full border border-indigo-500/50" 
                        />
                      </Link>
                    </motion.div>
                  )}
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  {user ? (
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="w-full py-3.5 flex items-center justify-center gap-3 text-rose-500 font-black uppercase tracking-[0.2em] bg-rose-500/5 border border-rose-500/20 rounded-xl hover:bg-rose-500/10 transition-all"
                    >
                      <HiOutlineArrowRightOnRectangle size={18} />
                      Logout
                    </button>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <Link 
                        to="/login" 
                        onClick={() => setMenuOpen(false)}
                        className="w-full py-3.5 text-center text-[10px] font-black text-white/50 border border-white/10 rounded-xl hover:bg-white/5 uppercase tracking-[0.4em]"
                      >
                        Sign In
                      </Link>
                      <Link 
                        to="/signup" 
                        onClick={() => setMenuOpen(false)}
                        className="w-full py-3.5 text-center text-[10px] font-black text-black bg-white rounded-xl shadow-xl uppercase tracking-[0.4em] hover:scale-[1.02] transition-transform"
                      >
                        Signup
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default MainNavbar;
