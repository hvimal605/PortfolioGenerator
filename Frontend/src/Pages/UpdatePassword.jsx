import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operations/authApi";

function UpdatePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white px-4">
      {loading ? (
        <div className="flex items-center justify-center h-[90vh]">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_30px_#ffffff10] p-8 sm:p-10 rounded-2xl w-full max-w-lg transition-all duration-300">
          <h1 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-red-500 mb-4">
            Choose New Password
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Almost done! Enter your new password below and you’re all set.
          </p>
          <form onSubmit={handleOnSubmit} className="space-y-6 relative">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                New Password <span className="text-pink-200">*</span>
              </label>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter your new password"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-13 transform -translate-y-1/2 z-10 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Confirm New Password <span className="text-pink-200">*</span>
              </label>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm your new password"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-13 transform -translate-y-1/2 z-10 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-300 to-yellow-400 text-black font-semibold hover:shadow-[0_0_15px_#facc15] transition-all duration-300"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="flex justify-center items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              <BiArrowBack />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePassword;
