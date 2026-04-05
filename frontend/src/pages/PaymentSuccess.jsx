import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Processing your payment...
          </h2>

          <p className="text-gray-500 text-sm sm:text-base">
            Stripe is securely confirming your card payment
          </p>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-6 overflow-hidden">
            <div className="bg-linear-to-r from-green-500 to-blue-500 h-2 rounded-full animate-pulse w-[85%]"></div>
          </div>

          <p className="text-xs text-gray-400 mt-2">Finalizing your order...</p>
        </div>
      </div>
    );
  }

  /* =========================
        SUCCESS SCREEN
  ========================= */

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50 px-4 py-10 mt-20 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          {/* Top success section */}
          <div className="border-b border-slate-100 bg-linear-to-r from-emerald-50 via-white to-emerald-50 px-6 py-8 sm:px-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 shadow-inner sm:h-24 sm:w-24">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white sm:h-16 sm:w-16">
                <svg
                  className="h-8 w-8 sm:h-9 sm:w-9"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h1 className="mt-6 text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Payment successful
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-6 text-slate-600 sm:text-base">
              Thank you for your purchase. Your payment has been successfully
              processed, and your order is now confirmed.
            </p>

            <div className="mt-5 flex justify-center">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                Paid securely with Stripe
              </span>
            </div>
          </div>

          {/* Order details */}
          <div className="px-6 py-6 sm:px-10 sm:py-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Order Status
                </p>
                <p className="mt-2 text-sm font-semibold text-emerald-600">
                  Confirmed
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Payment Method
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  Card (Stripe)
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-4">
              <p className="text-sm leading-6 text-blue-800">
                A confirmation email and your order details will be sent to you
                shortly.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => {
                  scrollToTop();
                  navigate("/ordersummery", { replace: true });
                }}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800"
              >
                View My Orders
              </button>

              <button
                onClick={() => {
                  scrollToTop();
                  navigate("/product");
                }}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
