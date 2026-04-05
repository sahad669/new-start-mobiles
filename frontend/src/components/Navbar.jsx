import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, LogOut, User, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { clearCart } from "../features/cartSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    localStorage.removeItem("cart");
    navigate("/login");
  };

  const cartCount = items?.length || 0;

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-linear-to-r from-slate-50 via-white to-indigo-50/80 backdrop-blur-xl shadow-xl border-b border-slate-200/50">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* LOGO - LEFT */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 hover:scale-105 transition-all duration-300"
          >
            <img
              src="/images/newstar-logo.png.png"
              alt="New Star"
              className="w-16 h-16 lg:w-18 lg:h-18 object-contain"
            />
            <div className="flex flex-col leading-tight min-w-[120px]">
              <h1 className="text-xl lg:text-2xl font-black bg-linear-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent tracking-tight">
                New Star
              </h1>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Premium Electronics
              </p>
            </div>
          </Link>

          {/* DESKTOP MENU + ACTIONS - RIGHT */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {/* Navigation Links */}
            <ul className="flex items-center gap-2 lg:gap-8 font-semibold text-lg">
              {[
                { to: "/", label: "Home" },
                { to: "/services", label: "Services" },
                { to: "/product", label: "Products" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={handleNavClick}
                    className="group relative px-3 py-2 text-slate-700 hover:text-indigo-600 font-semibold transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {user?.role === "admin" && (
                <li>
                  <Link
                    to="/admin"
                    className="px-4 py-2 bg-linear-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                  >
                    Admin
                  </Link>
                </li>
              )}
            </ul>

            {/* Auth + Cart */}
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Cart */}
              <Link
                to="/cart"
                  onClick={handleNavClick}
                className="group relative p-2 rounded-2xl bg-linear-to-r from-slate-100 to-indigo-100 hover:from-indigo-100 hover:to-purple-100 border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all duration-300"
                title="Shopping Cart"
              >
                <ShoppingCart className="w-7 h-7 text-slate-700 group-hover:text-indigo-600 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-linear-to-r from-yellow-400 to-orange-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-2xl font-bold shadow-lg border-2 border-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              {/* Auth */}
              {!user ? (
                <Link
                  to="/login"
                  onClick={handleNavClick}
                  className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  title="Login"
                >
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              ) : (
                <div className="flex items-center gap-4">
                  {/* User Greeting */}
                  <div className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-slate-100 to-indigo-100 rounded-2xl border border-slate-200 hover:bg-indigo-50 transition-all">
                    <div className="w-10 h-10 bg-linear-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-semibold text-slate-800 capitalize">
                        {user.name}
                      </p>
                      <p className="text-xs text-indigo-600 font-medium">
                        {user.role}
                      </p>
                    </div>
                  </div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-slate-200 to-indigo-100 hover:from-slate-300 hover:to-indigo-200 text-slate-800 font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2 rounded-xl bg-linear-to-r from-slate-100 to-indigo-100 hover:from-indigo-100 hover:to-purple-100 text-slate-800 hover:text-indigo-600 transition-all duration-300 shadow-sm hover:shadow-md border border-slate-200"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU - Fullscreen Overlay */}
      {open && (
        <div className="md:hidden bg-linear-to-b from-slate-50 via-white to-indigo-50/80 backdrop-blur-md border-t border-slate-200 shadow-2xl">
          <div className="max-w-2xl mx-auto px-6 py-8">
            <ul className="space-y-6 text-center">
              {[
                { to: "/", label: "🏠 Home" },
                { to: "/services", label: "🔧 Services" },
                { to: "/product", label: "📱 Products" },
                { to: "/about", label: "ℹ️ About" },
                { to: "/contact", label: "📞 Contact" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => {
                      handleNavClick();
                      setOpen(false);
                    }}
                    className="block text-2xl font-bold text-slate-800 hover:text-indigo-600 py-4 px-8 rounded-3xl bg-linear-to-r from-white/70 to-indigo-50/50 backdrop-blur-sm hover:from-indigo-100 hover:to-purple-100 border border-slate-200/50 hover:border-indigo-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              {user?.role === "admin" && (
                <li>
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="block text-2xl font-bold bg-linear-to-r from-indigo-500 to-purple-500 text-white py-4 px-8 rounded-3xl shadow-2xl hover:shadow-3xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-[1.02]"
                  >
                    🛠️ Admin Panel
                  </Link>
                </li>
              )}

              {/* Mobile Cart */}
              <li>
                <Link
                  to="/cart"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-3 text-2xl font-bold bg-linear-to-r from-slate-100 to-indigo-100 text-slate-800 py-4 px-8 rounded-3xl shadow-lg hover:shadow-xl hover:from-indigo-100 hover:to-purple-100 hover:text-indigo-700 transition-all duration-300 hover:scale-[1.02]"
                >
                  🛒 Cart ({cartCount})
                </Link>
              </li>

              {/* Mobile Auth */}
              {!user ? (
                <li>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="block text-2xl font-bold bg-linear-to-r from-indigo-500 to-purple-500 text-white py-5 px-12 rounded-3xl shadow-2xl hover:shadow-3xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-[1.02] border-4 border-indigo-200/30"
                  >
                    Login
                  </Link>
                </li>
              ) : (
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="block w-full text-xl font-bold bg-linear-to-r from-slate-200 to-indigo-200 text-slate-800 py-5 px-12 rounded-3xl shadow-2xl hover:shadow-3xl hover:from-slate-300 hover:to-indigo-300 transition-all duration-300 hover:scale-[1.02]"
                  >
                    👋 Logout ({user.name})
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
