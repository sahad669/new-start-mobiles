import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white p-4 pt-30">
      {/* Image */}
      <div className="w-full max-w-lg mb-8">
        <img
         src="/images/newstar-logo.png.png"
          alt="Page Not Found"
          className="w-full h-auto object-cover rounded-2xl shadow-lg"
        />
      </div>

      {/* Text */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
        404
      </h1>
      <p className="text-lg md:text-2xl text-gray-700 mb-6 text-center">
        Oops! The page you are looking for doesn’t exist.
      </p>

      {/* Back to Home Button */}
      <Link to="/">
        <span className="inline-block bg-yellow-500 text-white font-semibold px-6 py-3 rounded-md text-sm md:text-base hover:bg-yellow-600 transition">
          Go Back Home
        </span>
      </Link>
    </div>
  );
};

export default NotFound;