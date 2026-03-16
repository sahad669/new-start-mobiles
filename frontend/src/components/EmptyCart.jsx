import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EmptyCart = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-[60vh] md:min-h-[70vh] flex items-center justify-center px-4 py-12 pt-30 bg-gray-50">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-sm border border-gray-100 px-6 py-10 sm:px-10 sm:py-12 flex flex-col items-center text-center">
        {/* Illustration */}
        <div className="relative mb-6 sm:mb-8 w-40 h-32 sm:w-56 sm:h-40">
          <div className="absolute inset-0 rounded-3xl bg-indigo-50 blur-3xl opacity-60" />
          <img
            src="/images/cart-img.jpg"
            alt="Empty cart"
            className="relative w-full h-full object-contain rounded-2xl"
          />
        </div>

        {/* Text */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mb-6 max-w-md">
          Looks like you haven’t added anything to your cart yet. 
          Browse our products and find something you’ll love.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center">
          <button
            onClick={() => navigate("/product")}
            className="inline-flex items-center justify-center w-full sm:w-auto px-5 sm:px-6 py-3 rounded-full bg-gray-900 text-white text-sm sm:text-base font-semibold shadow-lg hover:bg-black transition-colors"
          >
            Start shopping
          </button>

          {user?.role === "user" && (
            <button
              onClick={() => navigate("/ordersummery")}
              className="inline-flex items-center justify-center w-full sm:w-auto px-5 sm:px-6 py-3 rounded-full border border-gray-300 text-sm sm:text-base font-semibold text-gray-800 bg-white hover:bg-gray-100 transition-colors"
            >
              View orders
            </button>
          )}
        </div>

        {/* Helper text */}
        <p className="mt-4 text-xs sm:text-sm text-gray-400">
          You can always access your cart from the top navigation bar.
        </p>
      </div>
    </div>
  );
};

export default EmptyCart;
