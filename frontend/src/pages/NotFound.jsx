import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-amber-50 flex flex-col items-center justify-center px-4 py-12 mt-25 sm:px-6 lg:px-8">
      {/* Logo/Image Section */}
      <div className="w-full max-w-md mb-8 lg:mb-12">
        <div className="relative">
          <img
            src="/images/newstar-logo.png.png"
            alt="Page Not Found"
            className="w-full h-64 sm:h-72 lg:h-80 object-contain rounded-3xl shadow-2xl border-4 border-white/50 bg-white/70 backdrop-blur-sm p-6 hover:scale-105 transition-all duration-300 hover:shadow-3xl mx-auto max-w-lg"
          />
          <div className="absolute -inset-2 bg-linear-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 rounded-3xl blur-xl opacity-75 animate-pulse"></div>
        </div>
      </div>

      {/* 404 Number */}
      <div className="relative mb-6 lg:mb-8">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black bg-linear-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent drop-shadow-2xl tracking-tight leading-none">
          404
        </h1>
        <div className="absolute inset-0 bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 blur-xl opacity-30 animate-pulse rounded-2xl -mx-4 -my-4 sm:-mx-6 sm:-my-6"></div>
      </div>

      {/* Error Message */}
      <div className="text-center mb-10 lg:mb-12 max-w-2xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-4 leading-tight">
          Oops! Page Not Found
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4  mt-20items-center justify-center">
        <Link  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          to="/"
          className="group relative inline-flex items-center gap-3 bg-linear-to-r from-indigo-600 via-purple-600 to-blue-600 hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-3xl text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Go Back Home
          <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
        
        <Link  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          to="/product"
          className="inline-flex items-center gap-2 px-6 py-4 font-semibold text-slate-700 bg-white/80 backdrop-blur-sm border-2 border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 text-base"
        >
          Browse Products
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-linear-to-r from-indigo-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-5 w-24 h-24 bg-linear-to-r from-pink-400 to-rose-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(10px, -10px) scale(1.1); }
          66% { transform: translate(-10px, 10px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default NotFound;
