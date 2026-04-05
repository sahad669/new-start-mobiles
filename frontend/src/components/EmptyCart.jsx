import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingBag, ArrowRight, PackageCheck } from "lucide-react";

const EmptyCart = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-slate-50 via-white to-slate-100 min-h-[calc(100vh-100px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 mt-18 sm:py-16">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-indigo-100/50 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-slate-200/40 blur-3xl" />
      </div>

      <div className="w-full max-w-5xl">
        <div className="grid overflow-hidden rounded-[28px] border border-white/70 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur xl:grid-cols-2">
          
          {/* Left content */}
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-600">
              <ShoppingBag className="h-4 w-4" />
              Shopping cart
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              Your cart feels a little lonely
            </h1>

            <p className="mt-4 max-w-lg text-sm sm:text-base leading-7 text-slate-500">
              You haven’t added any products yet. Explore our latest collection
              and discover items worth bringing home.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => navigate("/product")}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-black"
              >
                Start shopping
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {user?.role === "user" && (
                <button
                  onClick={() => navigate("/ordersummery")}
                  className="inline-flexmin-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm sm:text-base font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-50 hover:border-slate-400"
                >
                  <PackageCheck className="h-4 w-4" />
                  View orders
                </button>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-400">
              <span>Free delivery on selected items</span>
              <span className="hidden sm:inline">•</span>
              <span>Secure checkout</span>
              <span className="hidden sm:inline">•</span>
              <span>Easy returns</span>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative flex items-center justify-center bg-linear-to-br from-slate-100 via-white to-indigo-50 px-6 py-10 sm:px-10 sm:py-14">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 rounded-[30px] bg-indigo-200/30 blur-3xl" />
              
              <div className="relative overflow-hidden rounded-[28px] border border-white/60 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
                <img
                  src="/images/empty-cart.webp"
                  alt="Empty cart"
                  className="h-60 w-full object-cover sm:h-80"
                />
              </div>

              <div className="absolute -bottom-4 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
                <p className="text-sm font-semibold text-slate-800">
                  No items added yet
                </p>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  Add products to review them here before checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmptyCart;