import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = { email: "", password: "" };
    let hasError = false;

    if (!data.email.trim()) {
      newErrors.email = "Enter your email address";
      hasError = true;
    }
    if (!data.password.trim()) {
      newErrors.password = "Enter your password";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    try {
      const res = await dispatch(login(data)).unwrap();
      if (res.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log("login failed");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center  px-4 py-8 sm:py-12 lg:py-16 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-linear-to-r from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-linear-to-l from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md lg:max-w-2xl xl:max-w-4xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden flex flex-col lg:flex-row animate-slide-up mt-25 ">
        {/* LEFT SIDE - Brand Section */}
        <div className="w-full lg:w-1/2 bg-linear-to-br from-indigo-600 via-purple-600 to-indigo-700 p-8 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-center items-center text-center relative overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          
          {/* Animated Logo Badge */}
          <div className="relative z-10 mb-6 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl animate-bounce-in">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-6 sm:mb-8 tracking-tight bg-linear-to-r from-white via-blue-100 to-white bg-clip-text drop-shadow-2xl leading-tight">
            Welcome Back
          </h1>
          
          <img 
            src="/images/New-star-logo-with-name.png" 
            alt="New Star Mobile" 
            className="w-40 sm:w-48 lg:w-56 xl:w-64 h-auto rounded-2xl drop-shadow-2xl mx-auto mb-6 sm:mb-8 hover:scale-105 transition-transform duration-300"
          />
          
          <p className="text-blue-100/90 text-sm sm:text-base lg:text-lg font-light max-w-xs sm:max-w-sm leading-relaxed drop-shadow-md">
            Sign in to access your account, track orders, and continue shopping seamlessly
          </p>
          
          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse [animation-delay:0.5s]" />
        </div>

        {/* RIGHT SIDE - Login Form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full mb-4 font-semibold text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Secure Sign In
            </div>
            {/* <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-linear-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent mb-4 leading-tight">
              Welcome Back
            </h2> */}
            <p className="text-gray-600 text-sm sm:text-base font-light">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleData}
                  placeholder="Enter your email"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 ${
                    errors.email 
                      ? "border-red-400 bg-red-50 shadow-sm shadow-red-200 focus:border-red-500" 
                      : "border-gray-200 bg-gray-50/50 hover:border-indigo-300 focus:border-indigo-500"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="flex items-center gap-1 text-xs text-red-500 mt-2 font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleData}
                  placeholder="Enter your password"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 ${
                    errors.password 
                      ? "border-red-400 bg-red-50 shadow-sm shadow-red-200 focus:border-red-500" 
                      : "border-gray-200 bg-gray-50/50 hover:border-indigo-300 focus:border-indigo-500"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="flex items-center gap-1 text-xs text-red-500 mt-2 font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="group relative w-full py-4 px-8 rounded-2xl bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-bold text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 overflow-hidden transform hover:scale-[1.02] border-2 border-indigo-600/30 active:scale-[0.98]"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </form>

          {/* Divider & Register */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-4 bg-white text-gray-500 font-medium">or</span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm sm:text-base">
            <span className="text-gray-600 font-medium">Don't have an account?</span>{" "}
            <button
              onClick={() => navigate("/register")}
              className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors duration-200 ml-1 hover:underline"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
