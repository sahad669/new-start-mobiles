import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-5 py-2 flex items-center justify-between">
        {/* LEFT: LOGO + NAME */}
        <div className="flex items-center gap-2">
          <img
            src="/images/newstar-logo.png.png"
            alt="New Start"
            className="w-30 h-14 object-contain"
          />
          <h1 className="text-xl font-bold text-[#eb2525]">New Start</h1>
        </div>

        {/* RIGHT: MENU + CART + AUTH */}
        <div className="flex items-center text-xl gap-6">
          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-6 font-medium">
            <li>
              <Link to="/" className="text-[#eb2525] hover:text-[#2563EB]">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-[#eb2525] hover:text-[#2563EB]"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/product"
                className="text-[#eb2525] hover:text-[#2563EB]"
              >
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-[#eb2525] hover:text-[#2563EB]">
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-[#eb2525] hover:text-[#2563EB]"
              >
                Contact
              </Link>
            </li>

            {/* LOGIN / LOGOUT ICON */}
            <li>
              {!user ? (
                <Link
                  to="/login"
                  className="text-[#eb2525] hover:text-[#2563EB]"
                  title="Login"
                >
                  <LogIn size={22} />
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-[#eb2525] hover:text-[#2563EB]"
                  title="Logout"
                >
                  <LogOut size={22} />
                </button>
              )}
            </li>
          </ul>

          {/* CART — ALWAYS VISIBLE */}
          <Link
            to="/cart"
            title="Cart"
            className="text-[#eb2525] hover:text-[#2563EB] transition-colors duration-300"
          >
            <ShoppingCart size={28} />
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <ul className="md:hidden bg-white px-5 pb-4 space-y-3 font-medium shadow-md">
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" onClick={() => setOpen(false)}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={() => setOpen(false)}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/cart" onClick={() => setOpen(false)}>
              Cart
            </Link>
          </li>

          {/* MOBILE LOGIN / LOGOUT */}
          <li>
            {!user ? (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2"
              >
                <LogIn size={18} /> Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="flex items-center gap-2 text-red-600"
              >
                <LogOut size={18} /> Logout
              </button>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
