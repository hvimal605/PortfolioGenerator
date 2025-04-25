import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { FaCopy, FaCheck, FaEdit, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AnimatedButton6 from "../components/common/AnimatedButton6";
import { useDispatch, useSelector } from "react-redux";
import { deployPortfolio } from "../services/operations/PortfolioApi";
import { setStep } from "../slices/PortfolioSlice";
import { MdDashboard } from "react-icons/md";

export default function DeployPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { templateId } = useSelector((state) => state.portfolio);
  const { token } = useSelector((state) => state.auth);

  const { portfolio } = useSelector((state) => state.portfolio);
  const [deployed, setDeployed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [deplyedLink, setDeployedLink] = useState("");

  // Window size for confetti
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    if (!templateId || !portfolio) {
      navigate("/PortfolioCreate/UploadDetails");
      dispatch(setStep(0));
    }
  }, []);

  useEffect(() => {
    if (deployed) {
      document.body.classList.add("overflow-hidden");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 9000);
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [deployed]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDeploy = async () => {
    const PortfolioData = {
      templateId: templateId,
      PortfolioId: portfolio._id,
    };
    const res = await deployPortfolio(PortfolioData, token);

    if (res?.success) {
      setDeployed(true);
      const deployLink = res.deployLink;
      setDeployedLink(deployLink);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${deplyedLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-12 transition-all duration-300 relative">
      {/* Dotted animated background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 animate-moveDots"></div>

      {/* Adjust Confetti for correct placement */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={500}
          recycle={false}
        />
      )}

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-center mb-6 text-gray-100 drop-shadow-lg md:text-5xl sm:text-3xl"
      >
        {deployed ? "Your Portfolio is Live! 🎉" : "Deploy Your Portfolio"}
      </motion.h1>

      <p className="text-lg text-gray-400 text-center mb-6 max-w-lg sm:text-md sm:max-w-xl">
        {deployed
          ? "Your portfolio is successfully deployed. Share your live link with the world!"
          : "Launch your portfolio and share it with everyone instantly."}
      </p>

      {!deployed ? (
        <button onClick={handleDeploy}>
          <AnimatedButton6 text={"Deploy"} />
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-950 p-4 rounded-lg flex items-center justify-between w-full max-w-sm border border-green-600 shadow-md relative sm:max-w-xs"
        >
          <div
            className="relative group flex items-center gap-2 text-gray-300 truncate cursor-pointer hover:text-blue-500"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="h-4 w-4 rounded-full bg-green-400 animate-pulse"></div>
            <span className="truncate font-semibold text-lg flex items-center gap-2 sm:text-base">
              <Link to={`${deplyedLink}`} target="_blank" className="text-blue-400 hover:underline">
                {`${deplyedLink}`}
              </Link>
            </span>
          </div>

          {hovered && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-950 border border-green-700 shadow-lg rounded-lg overflow-hidden w-96 h-56 z-50 sm:w-72 sm:h-48">
              <iframe
                src={`${deplyedLink}`}
                className="w-full h-full border-none"
                title="Live Preview"
                scrolling="no"
                sandbox="allow-scripts allow-same-origin"
                style={{
                  transform: "scale(0.5)",
                  transformOrigin: "top left",
                  width: "200%",
                  height: "200%",
                  pointerEvents: "none",
                  overflow: "hidden",
                  borderRadius: "8px",
                }}
              ></iframe>
            </div>
          )}

          <button
            onClick={handleCopy}
            className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            {copied ? <FaCheck className="text-green-400 animate-pulse" /> : <FaCopy className="text-gray-300 hover:text-blue-500" />}
          </button>
        </motion.div>
      )}

      {/* Go to Dashboard Button - Outside the link container */}
      {deployed && (
        <div className="mt-10 w-full flex flex-col items-center justify-center">
          {/* Text Above the Button */}
          <p className="text-lg text-gray-400 mb-4 text-center sm:text-base ">
            Go to Dashboard to manage, edit, and update your portfolio.
          </p>

          {/* Go to Dashboard Button */}
          <Link
            to="/userdas"
            className="bg-gradient-to-r border from-gray-800 via-gray-900 to-black hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl flex justify-center items-center gap-2"
          >
            <MdDashboard className="text-white" />
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}
