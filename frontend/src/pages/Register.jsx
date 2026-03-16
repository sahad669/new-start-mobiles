import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    let hasError = false;

    if (!data.username.trim()) {
      newErrors.username = "Please enter your name";
      hasError = true;
    }
    if (
      !data.email.trim() ||
      !data.email.includes("@") ||
      !data.email.includes(".")
    ) {
      newErrors.email = "Please enter a valid email address";
      hasError = true;
    }
    if (!data.password.trim()) {
      newErrors.password = "Please enter your password";
      hasError = true;
    }
    if (!data.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please enter your correct password";
      hasError = true;
    }
    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      hasError = true;
    }
    setErrors(newErrors);

    if (hasError) {
      return;
    }

    dispatch(register(data));
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-10 pt-30">
      <div className="w-full max-w-4xl bg-white backdrop-blur-lg rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        {/* LEFT SECTION */}
        <div className="w-full md:w-1/2 bg-linear-to-br from-indigo-600 via-purple-600 to-indigo-700 p-10 flex flex-col justify-center items-center text-center">
          <div className="relative z-10 mb-4 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4 tracking-wide">
            New Start
          </h1>

          <p className="text-blue-100 text-sm md:text-base max-w-sm mb-8 leading-relaxed">
            Create your account and explore the latest mobiles, accessories, and
            exclusive offers.
          </p>

          <img
            src="/images/New-star-logo-with-name.png"
            alt="New Start Logo"
            className="w-56 drop-shadow-xl rounded-xl"
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-3 sm:px-4 py-2 rounded-full mb-3 sm:mb-4 font-semibold text-xs sm:text-sm">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Create Account
            </div>
            <p className="text-gray-600 text-sm sm:text-base font-light">
              Enter your credentials to continue
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5 lg:space-y-6"
          >
            {/* Username Input */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleData}
                  placeholder="Enter your full name"
                  className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 ${
                    errors.username
                      ? "border-red-400 bg-red-50 shadow-sm shadow-red-200 focus:border-red-500"
                      : "border-gray-200 bg-gray-50/50 hover:border-indigo-300 focus:border-indigo-500"
                  }`}
                />
              </div>
              {errors.username && (
                <p className="flex items-center gap-1 text-xs text-red-500 mt-2 font-medium">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  {errors.username}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleData}
                  placeholder="Enter your email"
                  className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 ${
                    errors.email
                      ? "border-red-400 bg-red-50 shadow-sm shadow-red-200 focus:border-red-500"
                      : "border-gray-200 bg-gray-50/50 hover:border-indigo-300 focus:border-indigo-500"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="flex items-center gap-1 text-xs text-red-500 mt-2 font-medium">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
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
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleData}
                  placeholder="Create a password"
                  className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 ${
                    errors.password
                      ? "border-red-400 bg-red-50 shadow-sm shadow-red-200 focus:border-red-500"
                      : "border-gray-200 bg-gray-50/50 hover:border-indigo-300 focus:border-indigo-500"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="flex items-center gap-1 text-xs text-red-500 mt-2 font-medium">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleData}
                  placeholder="Confirm your password"
                  className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 ${
                    errors.confirmPassword
                      ? "border-red-400 bg-red-50 shadow-sm shadow-red-200 focus:border-red-500"
                      : "border-gray-200 bg-gray-50/50 hover:border-indigo-300 focus:border-indigo-500"
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="flex items-center gap-1 text-xs text-red-500 mt-2 font-medium">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="group relative w-full py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-bold text-base sm:text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 overflow-hidden transform hover:scale-[1.02] border-2 border-indigo-600/30 active:scale-[0.98]"
            >
              <span className="relative z-10">Create Account</span>
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </form>
          <div className="relative my-6 sm:my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm uppercase">
              <span className="px-3 sm:px-4 bg-white text-gray-500 font-medium">
                or
              </span>
            </div>
          </div>
          <p className="text-center text-xs sm:text-sm">
            <span className="text-gray-600 font-medium">
              Already have an account?
            </span>{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors duration-200 ml-1 hover:underline"
            >
              Sign In
            </button>
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Register;

