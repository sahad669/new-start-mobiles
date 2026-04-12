import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { SiTiktok } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-linear-to-br from-slate-900 via-indigo-900 to-purple-900/80 text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* LEFT SECTION - Brand & Social */}
          <div className="lg:col-span-1">
            <div className="mb-8">
              <img
                src="/images/New-star-logo-with-name.png"
                alt="New Star"
                className="w-36 h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>

            <p className="text-sm leading-relaxed text-slate-300 mb-8 max-w-md">
              Your trusted destination for mobile phones, laptops, and accessories. 
              Quality products, repair services, and reliable support.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mb-8">
              <a
                href="https://whatsapp.com/channel/0029Vb6rRDR11ulRLblcsx3N"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Channel"
                className="group p-3.5 rounded-2xl bg-linear-to-r from-slate-100/10 to-indigo-500/20 backdrop-blur-sm hover:from-slate-100/20 hover:to-indigo-400/30 hover:scale-110 hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 border border-slate-300/20 hover:border-emerald-400"
              >
                <FaWhatsapp className="w-6 h-6 text-slate-200 group-hover:text-emerald-400 transition-all duration-200" />
              </a>
              
              <a
                href="https://www.tiktok.com/@newstar_bedazayed?_r=1&_t=ZS-94hbhPYRMDg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="group p-3.5 rounded-2xl bg-linear-to-r from-slate-100/10 to-indigo-500/20 backdrop-blur-sm hover:from-slate-100/20 hover:to-indigo-400/30 hover:scale-110 hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 border border-slate-300/20 hover:border-indigo-400"
              >
                <SiTiktok className="w-6 h-6 text-slate-200 group-hover:text-indigo-400 transition-all duration-200" />
              </a>
              
              <a
                href="https://www.instagram.com/newstar_bedazayed?igsh=bHkwc3RkYzR6cWY1&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group p-3.5 rounded-2xl bg-linear-to-r from-slate-100/10 to-indigo-500/20 backdrop-blur-sm hover:from-slate-100/20 hover:to-indigo-400/30 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 border border-slate-300/20 hover:border-purple-400"
              >
                <FaInstagram className="w-6 h-6 text-slate-200 group-hover:text-purple-400 transition-all duration-200" />
              </a>
              
              <a
                href="https://www.facebook.com/share/1Ap4H58gJ8/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group p-3.5 rounded-2xl bg-linear-to-r from-slate-100/10 to-indigo-500/20 backdrop-blur-sm hover:from-slate-100/20 hover:to-indigo-400/30 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 border border-slate-300/20 hover:border-blue-400"
              >
                <FaFacebookF className="w-6 h-6 text-slate-200 group-hover:text-blue-400 transition-all duration-200" />
              </a>
            </div>

            {/* BACK TO TOP */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 border-2 border-slate-400/50 hover:border-indigo-300 px-6 py-3 rounded-2xl text-sm font-semibold hover:bg-linear-to-r hover:from-indigo-500/10 hover:to-purple-500/10 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 hover:scale-[1.02]"
            >
              <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Back to Top
            </button>
          </div>

          {/* SITE MAP */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white tracking-tight bg-linear-to-r from-slate-200 to-indigo-200 bg-clip-text">Quick Links</h3>
            <ul className="space-y-3">
              <li  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Link 
                  to="/" 
                  className="block text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="group-hover:text-indigo-400 transition-colors">→</span>
                  Homepage
                </Link>
              </li>
              <li  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Link 
                  to="/services" 
                  className="block text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="group-hover:text-indigo-400 transition-colors">→</span>
                  Our Services
                </Link>
              </li>
              <li  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Link 
                  to="/product" 
                  className="block text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="group-hover:text-indigo-400 transition-colors">→</span>
                  Products
                </Link>
              </li>
              <li  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Link 
                  to="/about" 
                  className="block text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="group-hover:text-indigo-400 transition-colors">→</span>
                  About Us
                </Link>
              </li>
              <li  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Link 
                  to="/about#branches" 
                  className="block text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="group-hover:text-indigo-400 transition-colors">→</span>
                  Our Branches
                </Link>
              </li>
              <li  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Link 
                  to="/contact" 
                  className="block text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="group-hover:text-indigo-400 transition-colors">→</span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white tracking-tight bg-linear-to-r from-slate-200 to-indigo-200 bg-clip-text">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="/privacy" className="block text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 group">
                  <span className="group-hover:text-indigo-400 transition-colors">→</span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="block text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 group">
                  <span className="group-hover:text-indigo-400 transition-colors">→</span>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/licenses" className="block text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 group">
                  <span className="group-hover:text-indigo-400 transition-colors">→</span>
                  Licenses & Notices
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6 text-white tracking-tight bg-linear-to-r from-slate-200 to-indigo-200 bg-clip-text">Contact Info</h3>
            <div className="space-y-4 text-md text-slate-300">
              <div className="flex items-start gap-3 p-4 bg-linear-to-r from-slate-800/50 to-indigo-900/30 backdrop-blur-sm rounded-2xl hover:from-slate-700/70 hover:to-indigo-800/40 transition-all border border-slate-600/30">
                <svg className="w-6 h-6 mt-1 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>+971 567574124</div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-linear-to-r from-slate-800/50 to-indigo-900/30 backdrop-blur-sm rounded-2xl hover:from-slate-700/70 hover:to-indigo-800/40 transition-all border border-slate-600/30">
                <svg className="w-6 h-6 mt-1 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>Beda Zayed, Sanaya, Abu Dhabi, UAE</div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-linear-to-r from-slate-800/50 to-indigo-900/30 backdrop-blur-sm rounded-2xl hover:from-slate-700/70 hover:to-indigo-800/40 transition-all border border-slate-600/30">
                <svg className="w-6 h-6 mt-1 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.27 7.27c.396.377.916.58 1.45.58.534 0 1.054-.203 1.45-.58L21 8M4 16h18M4 12h18M4 20h18" />
                </svg>
                <div>newstarsalesuae@gmail.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-slate-700/50 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center text-xs md:text-sm text-slate-400">
            <p>Copyright © 2026 New Star. All Rights Reserved.</p>
            <div className="flex flex-wrap gap-4 text-xs">
              <a href="/privacy" className="hover:text-indigo-300 hover:underline transition-all">Privacy Policy</a>
              <a href="/terms" className="hover:text-indigo-300 hover:underline transition-all">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
