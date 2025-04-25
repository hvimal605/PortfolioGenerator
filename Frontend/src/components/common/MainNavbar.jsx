import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/operations/authApi";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from 'react-tooltip'




const MainNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.profile.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const dashboardLink =
    user?.accountType === "Admin"
      ? "/AdminDas"
      : user?.accountType === "Developer"
        ? "/developerdas"
        : "/UserDas";

  return (
    <nav className="w-full px-6 py-4 fixed top-0 left-0 z-[1000] backdrop-blur-md bg-black/50 border-b border-blue-500/30 shadow-xl h-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#00B4D8] via-[#90E0EF] to-[#48C9B0] tracking-wide drop-shadow-md transition-all duration-300 ease-in-out hover:scale-110 hover:text-white"
        >
          PortFolio<span className="text-blue-600">Gen</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10 text-blue-100 text-lg font-medium">
          <Link to="/" className="hover:text-blue-400 transition duration-300">Home</Link>
          <Link to="/templates" className="hover:text-blue-400 transition duration-300">Templates</Link>

          {user ? (
            <div className="flex items-center space-x-5 ml-6">
              <Link to={dashboardLink} data-tooltip-id="profile-tip" data-tooltip-content="Go to Dashboard">
                <img
                  src={user?.image || "/default-profile.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-blue-500 shadow-lg hover:shadow-[0_0_15px_#3b82f6] hover:scale-105 transition-all duration-300 cursor-pointer"
                />
              </Link>

              <Tooltip id="profile-tip" place="bottom" className="z-50" />
              <span className="text-blue-100 font-semibold">
                {user?.firstName || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-1 rounded-full border border-blue-500 hover:bg-blue-600 hover:text-white text-blue-100 transition-all duration-300 shadow-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="ml-6 space-x-4">
              <div className="ml-6 flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-xl border border-blue-500 text-blue-100 hover:text-white bg-transparent hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-blue-600/50 hover:scale-105 backdrop-blur-sm"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-md hover:shadow-blue-700/60 transition-all duration-300 hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>

            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FaTimes size={24} className="text-white" />
            ) : (
              <FaBars size={24} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-6 flex flex-col space-y-4 bg-black/90 backdrop-blur-md px-6 py-6 rounded-2xl border border-blue-400/20 shadow-[0_4px_30px_rgba(0,0,255,0.2)]"

          >
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-blue-200 hover:text-blue-400 text-lg">
              Home
            </Link>
            <Link to="/templates" onClick={() => setMenuOpen(false)} className="text-blue-200 hover:text-blue-400 text-lg">
              Templates
            </Link>

            {user ? (
              <div className="flex flex-col space-y-4 mt-3">
                <Link
                  to={dashboardLink}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={user?.image || "/default-profile.png"}
                    alt="Profile"
                    className="w-9 h-9 rounded-full border border-blue-500 shadow-md"
                  />
                  <span className="text-blue-100 font-semibold">
                    {user?.firstName || "User"} {user?.lastName || ""}
                  </span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="px-4 py-2 border border-blue-500 text-blue-100 rounded-full hover:bg-blue-600 hover:text-white transition duration-300 shadow-inner max-w-fit"
                >
                  Logout
                </button>

              </div>
            ) : (
              <div className="flex flex-col space-y-3 mt-2">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 rounded-xl border border-blue-500 text-blue-100 hover:bg-blue-600 hover:text-white transition duration-300 max-w-fit"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition duration-300 max-w-fit"
                >
                  Sign Up
                </Link>


              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MainNavbar;
