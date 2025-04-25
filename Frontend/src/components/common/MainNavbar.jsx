import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/operations/authApi";
import { motion, AnimatePresence } from "framer-motion";

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
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] via-[#90E0EF] to-[#48C9B0] tracking-wide drop-shadow-xl hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:via-blue-400 hover:to-blue-700 transition-all duration-500 ease-out transform hover:scale-110"
        >
          PortFolio<span className="text-blue-600">Gen</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10 text-blue-100">
          <Link
            to="/"
            className="hover:text-blue-400 transition duration-300 text-lg font-medium"
          >
            Home
          </Link>
          <Link
            to="/templates"
            className="hover:text-blue-400 transition duration-300 text-lg font-medium"
          >
            Templates
          </Link>

          {user ? (
            <div className="flex items-center space-x-4 ml-6">
              <Link to={dashboardLink}>
                <img
                  src={user?.image || "/default-profile.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-blue-500 shadow-lg hover:shadow-[0_0_12px_#3b82f6] hover:scale-105 transition duration-300"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-1 rounded-full border border-blue-500 text-blue-100 hover:bg-blue-600 hover:text-white transition duration-300 shadow-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="ml-6 space-x-4">
              <Link
                to="/login"
                className="px-4 py-1 rounded-full border border-blue-500 text-blue-100 hover:bg-blue-600 hover:text-white transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 flex flex-col space-y-4 bg-black/80 backdrop-blur-md px-6 py-6 rounded-2xl border border-blue-400/20 shadow-[0_4px_30px_rgba(0,0,255,0.2)] sticky top-0"
          >
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-blue-200 hover:text-blue-400 text-lg tracking-wide transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/templates"
              onClick={() => setMenuOpen(false)}
              className="text-blue-200 hover:text-blue-400 text-lg tracking-wide transition duration-300"
            >
              Templates
            </Link>

            {user ? (
              <div className="flex flex-col space-y-4 items-start mt-2">
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
                  className="w-full text-left px-4 py-2 border border-blue-500 text-blue-100 rounded-full hover:bg-blue-600 hover:text-white transition duration-300 shadow-inner"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 mt-2">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 rounded-full border border-blue-500 text-blue-100 hover:bg-blue-600 hover:text-white transition duration-300 shadow-sm"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300 shadow-md"
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
