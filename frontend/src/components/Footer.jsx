import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0f4a46] text-white pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {/* LEFT SECTION */}
        <div>
          <div className="mb-4">
            <img
              src="/images/newstar-logo.png.png"
              alt="New Star"
              className="w-32 h-auto object-contain"
            />
          </div>

          <p className="text-sm text-gray-300 mb-6">
            Your trusted destination for mobile phones, laptops, and
            accessories. We provide quality products, repair services, and
            reliable support to keep your devices running smoothly.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mb-6">
            <FaXTwitter className="cursor-pointer hover:text-gray-300" />
            <FaLinkedinIn className="cursor-pointer hover:text-gray-300" />
            <FaInstagram className="cursor-pointer hover:text-gray-300" />
            <FaFacebookF className="cursor-pointer hover:text-gray-300" />
          </div>

          {/* BACK TO TOP */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="border border-gray-400 px-4 py-2 text-sm hover:bg-white hover:text-black transition"
          >
            ↑ Back to Top
          </button>
        </div>

        {/* SITE MAP */}
        <div>
          <h3 className="font-semibold mb-4">Site Map</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link to="/" className="hover:text-white cursor-pointer">
                Homepage
              </Link>
            </li>
            <li className="hover:text-white cursor-pointer">
             <Link to="/services">
                Our Services
              </Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to="/product">
                Products
              </Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to="/about">
                About Us
              </Link>
            </li>
            <li className="hover:text-white cursor-pointer">
                <Link to="/about#branches">
                Our Branches
              </Link>
                </li>
            <li className="hover:text-white cursor-pointer">
                   <Link to="/contact">
                Contact Us
              </Link>
                </li>
            
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">
              Terms of Service
            </li>
            <li className="hover:text-white cursor-pointer">
              Licenses & Notices
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-500 mt-10 pt-4 text-center text-xs text-gray-300">
        Copyright © 2026 New Star. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
