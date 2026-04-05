import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";

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

  const handleSubmit = (e) => {
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
      newErrors.email = "Please enter a valid email";
      hasError = true;
    }
    if (!data.password.trim()) {
      newErrors.password = "Enter password";
      hasError = true;
    }
    if (!data.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm your password";
      hasError = true;
    }
    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    dispatch(register(data));
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center px-4 py-8 sm:py-12 lg:py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-linear-to-r from-slate-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-linear-to-l from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      {/* MAIN CARD */}
      <div className="relative z-10 w-full max-w-md lg:max-w-2xl xl:max-w-4xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden flex flex-col lg:flex-row animate-slide-up mt-25">
        {/* LEFT SIDE (Same as Login) */}
        <div className="w-full lg:w-1/2 bg-linear-to-br from-slate-900 via-indigo-900 to-purple-900 p-8 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

          <div className="relative z-10 mb-6 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"
              />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-6 tracking-tight">
            Create Account
          </h1>

          <img
            src="/images/New-star-logo-with-name.png"
            alt="logo"
            className="w-40 sm:w-48 lg:w-56 xl:w-64 rounded-2xl drop-shadow-2xl mx-auto  h-auto mb-6 sm:mb-8 hover:scale-105 transition-transform duration-300 filter brightness-0 invert"
          />

          <p className="text-slate-200/90 text-sm sm:text-base lg:text-lg max-w-xs">
            Join us to explore latest products and exclusive offers
          </p>
          <div className="flex gap-2 py-4 sm:gap-3 mb-4">
            <a
              href="https://whatsapp.com/channel/0029Vb6rRDR11ulRLblcsx3N"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Channel"
              className="group p-3 rounded-xl bg-linear-to-r from-slate-100/10 to-indigo-500/20 backdrop-blur-sm hover:from-slate-100/20 hover:to-indigo-400/30 hover:scale-110 hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 border border-slate-300/20 hover:border-emerald-400"
            >
              <FaWhatsapp className="w-5 h-5 text-slate-200 group-hover:text-emerald-400 transition-all duration-200" />
            </a>

            <a
              href="https://www.tiktok.com/@newstar_bedazayed?_r=1&_t=ZS-94hbhPYRMDg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="group p-3 rounded-xl bg-linear-to-r from-slate-100/10 to-indigo-500/20 backdrop-blur-sm hover:from-slate-100/20 hover:to-indigo-400/30 hover:scale-110 hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 border border-slate-300/20 hover:border-indigo-400"
            >
              <SiTiktok className="w-5 h-5 text-slate-200 group-hover:text-indigo-400 transition-all duration-200" />
            </a>

            <a
              href="https://www.instagram.com/newstar_bedazayed?igsh=bHkwc3RkYzR6cWY1&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group p-3 rounded-xl bg-linear-to-r from-slate-100/10 to-indigo-500/20 backdrop-blur-sm hover:from-slate-100/20 hover:to-indigo-400/30 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 border border-slate-300/20 hover:border-purple-400"
            >
              <FaInstagram className="w-5 h-5 text-slate-200 group-hover:text-purple-400 transition-all duration-200" />
            </a>

            <a
              href="https://www.facebook.com/share/1Ap4H58gJ8/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="group p-3 rounded-xl bg-linear-to-r from-slate-100/10 to-indigo-500/20 backdrop-blur-sm hover:from-slate-100/20 hover:to-indigo-400/30 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 border border-slate-300/20 hover:border-blue-400"
            >
              <FaFacebookF className="w-5 h-5 text-slate-200 group-hover:text-blue-400 transition-all duration-200" />
            </a>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="inline-flex items-center gap-2bg-linear-to-rr from-slate-100 to-indigo-100 text-slate-800 px-4 py-2 rounded-full mb-4 font-semibold text-sm sm:text-base shadow-md">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
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
              Register
            </div>
            <p className="text-slate-600 text-sm sm:text-base font-light">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NAME */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-slate-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12H8m0 0l4-4m-4 4l4 4"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleData}
                  placeholder="Enter full name"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 ${
                    errors.username
                      ? "border-red-400 bg-red-50 shadow-sm shadow-red-200 focus:border-red-500"
                      : "border-slate-200 bg-slate-50/50 hover:border-indigo-300 focus:border-indigo-500"
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
            {/* EMAIL */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-slate-700 mb-2">
                Email
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-slate-400"
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
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 ${
                    errors.email
                      ? "border-red-400 bg-red-50 shadow-sm shadow-red-200 focus:border-red-500"
                      : "border-slate-200 bg-slate-50/50 hover:border-indigo-300 focus:border-indigo-500"
                  }`}
                />
              </div>

              {errors.email && (
                <p className="flex items-center gap-1 text-xs text-red-500 mt-2 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c0-1.657 1.343-3 3-3h1V7a4 4 0 10-8 0v1h1c1.657 0 3 1.343 3 3zm-7 0h14v10H5V11z"
                    />
                  </svg>
                </div>

                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleData}
                  placeholder="Enter password"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 font-medium  text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 ${
                    errors.password
                      ? "border-red-400 bg-red-50 shadow-sm shadow-red-200 focus:border-red-500"
                      : "border-slate-200 bg-slate-50/50 hover:border-indigo-300 focus:border-indigo-500"
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

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-slate-700 mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c0-1.657 1.343-3 3-3h1V7a4 4 0 10-8 0v1h1c1.657 0 3 1.343 3 3zm-7 0h14v10H5V11z"
                    />
                  </svg>
                </div>

                <input
                  type="password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleData}
                  placeholder="Confirm your password"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 ${
                    errors.confirmPassword
                      ? "border-red-400 bg-red-50 shadow-sm shadow-red-200 focus:border-red-500"
                      : "border-slate-200 bg-slate-50/50 hover:border-indigo-300 focus:border-indigo-500"
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

            {/* BUTTON */}
            <button
              type="submit"
              className="group relative w-full py-4 px-8 rounded-2xl bg-linear-to-r from-slate-900 via-indigo-900 to-purple-900 text-white font-bold text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 overflow-hidden transform hover:scale-[1.02] border-2 border-slate-800/30 active:scale-[0.98]"
            >
              <span className="relative z-10">Sign Up</span>
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-4 bg-white text-slate-500">or</span>
            </div>
          </div>

          {/* LOGIN LINK */}
          <p className="text-center text-sm sm:text-base">
            <span className="text-slate-600 font-medium">
              {" "}
              Already have an account?
            </span>{" "}
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                navigate("/login");
              }}
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
