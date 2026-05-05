import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authApi";
import { FaArrowRight } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#030014] text-white overflow-hidden p-4">
      {/* Immersive Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/90 via-[#050018] to-fuchsia-950/60" />
        <motion.div animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }} transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-[5%] left-[5%] w-[600px] h-[600px] bg-violet-600/15 blur-[180px] rounded-full pointer-events-none" />
        <motion.div animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }} transition={{ duration: 18, repeat: Infinity, delay: 4 }}
          className="absolute bottom-[5%] right-[5%] w-[500px] h-[500px] bg-fuchsia-600/12 blur-[160px] rounded-full pointer-events-none" />
        <motion.div animate={{ opacity: [0.05, 0.12, 0.05] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[50%] left-[30%] w-[300px] h-[300px] bg-cyan-500/8 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
      </div>

      {loading ? (
        <div className="relative z-10 flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></div>
          <p className="text-white/50 text-sm animate-pulse tracking-widest uppercase">Verifying...</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Glassmorphic Card */}
          <div className="bg-[#0a0a1e]/60 backdrop-blur-2xl border border-white/[0.08] rounded-[2rem] p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            
            {/* Header */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-[0_8px_30px_rgba(168,85,247,0.35)] mb-6">
                <span className="text-white font-black italic text-3xl">P</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-center">Verify Email</h1>
                <motion.div animate={{ rotate: [0, 14, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
                  <HiSparkles className="text-violet-400 text-xl" />
                </motion.div>
              </div>
              <p className="text-white/40 text-sm text-center">
                A verification code has been sent to you. Enter the code below.
              </p>
            </div>

            <form onSubmit={handleVerifyAndSignup} className="space-y-8">
              <div className="flex justify-center w-full">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => (
                    <input
                      {...props}
                      placeholder="-"
                      className="!w-[42px] sm:!w-[52px] h-[52px] sm:h-[64px] bg-white/[0.04] border border-white/[0.08] rounded-xl text-center text-xl sm:text-2xl font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-violet-500/15 transition-all"
                    />
                  )}
                  containerStyle={{
                    justifyContent: "space-between",
                    gap: "8px",
                    width: "100%",
                  }}
                />
              </div>

              <button type="submit" className="group relative w-full py-4 rounded-2xl overflow-hidden cursor-pointer mt-4">
                <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -inset-2 bg-gradient-to-r from-violet-600/30 via-fuchsia-500/30 to-pink-500/30 blur-2xl rounded-3xl -z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-violet-500 via-fuchsia-400 to-pink-400" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-[1.5s]" />
                <span className="relative z-10 text-white font-bold uppercase tracking-[0.25em] text-[11px] flex items-center justify-center gap-3">
                  Verify & Create Account <FaArrowRight className="text-xs group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </button>
            </form>

            <div className="mt-8 flex justify-between items-center px-1">
              <Link to="/signup" className="text-white/40 hover:text-white transition-colors flex items-center gap-x-2 text-[13px] font-semibold tracking-wide">
                <BiArrowBack className="text-base" />
                Back to Signup
              </Link>
              <button 
                className="text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-x-1.5 text-[13px] font-semibold tracking-wide"
                onClick={() => dispatch(sendOtp(signupData.email))}
              >
                <RxCountdownTimer className="text-base" />
                Resend it
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default VerifyEmail;
