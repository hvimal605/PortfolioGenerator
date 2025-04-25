import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";

import Spinner from '../components/common/Spinner';
import { getPasswordResetToken } from '../services/operations/authApi';

const ForgotPassword = () => {
  const [emailsent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white px-4">
      {loading ? (
        <div className='flex items-center justify-center h-[90vh]'><Spinner /></div>
      ) : (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_30px_#ffffff10] p-8 sm:p-10 rounded-2xl w-full max-w-md transition-all duration-300">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-red-400 mb-3">
            {emailsent ? "Check Your Email" : "Reset Password"}
          </h1>
          <p className="text-sm text-gray-300 mb-6 leading-relaxed">
            {!emailsent
              ? "No worries. We’ll email you instructions to reset your password. If you don’t have access to your email, we can help recover your account."
              : `We've sent a password reset link to `}
            {emailsent && <span className="text-yellow-400 font-semibold">{email}</span>}
          </p>

          <form onSubmit={handleOnSubmit} className="space-y-4">
            {!emailsent && (
              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-200">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 bg-gray-900 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2.5 font-semibold rounded-lg bg-gradient-to-r from-yellow-300 to-yellow-500 text-black hover:shadow-[0_0_15px_#facc15] transition-all duration-300"
            >
              {!emailsent ? "Send Reset Link" : "Resend Email"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="flex justify-center items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors duration-200">
              <FaArrowLeft />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
