import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";

const PaymentSuccessCash = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearCart());
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [dispatch]);

  /* =========================
        LOADING SCREEN
  ========================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-white to-blue-50 px-4">
        <div className="text-center max-w-md w-full">

          {/* Spinner */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-24 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>

            <div className="absolute">
              <svg
                className="w-10 h-10 text-green-600 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Processing your order...
          </h2>

          <p className="text-gray-500 text-sm sm:text-base">
            Confirming your Cash on Delivery order
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-6 overflow-hidden">
            <div className="bg-linear-to-r from-green-500 to-blue-500 h-2 rounded-full animate-pulse w-[75%]"></div>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Almost done...
          </p>
        </div>
      </div>
    );
  }

  /* =========================
        SUCCESS SCREEN
  ========================= */

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-white to-blue-50 px-4 py-10">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 max-w-md w-full text-center border border-gray-100">

        {/* Success Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-green-600 mb-3">
          Order Placed Successfully! 🎉
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed">
          Your order has been confirmed and will be processed shortly.
        </p>

        <p className="text-gray-600 text-sm sm:text-base mb-6">
          You selected <span className="font-semibold text-gray-800">Cash on Delivery</span>.  
          Please pay the amount when your order arrives.
        </p>

        {/* Order Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-600">
          <p>
            <span className="font-semibold text-gray-700">Payment Method:</span> Cash on Delivery
          </p>
          <p>
            <span className="font-semibold text-gray-700">Order Status:</span> Confirmed
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">

          <button
            onClick={() => navigate("/ordersummery", { replace: true })}
            className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            View My Orders
          </button>

          <button
            onClick={() => navigate("/product")}
            className="flex-1 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-100 transition font-medium"
          >
            Continue Shopping
          </button>

        </div>

      </div>
    </div>
  );
};

export default PaymentSuccessCash;