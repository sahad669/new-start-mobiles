

import React, { useEffect } from "react";
import {
  FaMobileAlt,
  FaLaptopCode,
  FaVideo,
  FaNetworkWired,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Service = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <div className="bg-linear-to-br from-slate-50 via-white to-indigo-50 min-h-screen">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-linear-to-r from-indigo-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0">
          <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20240327/pngtree-repairing-and-upgrade-mobile-phone-electronic-computer-hardware-and-technology-concept-image_15645837.jpg"
            alt="Services Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-black/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-linear-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent mb-6 sm:mb-8 drop-shadow-2xl">
              Professional Tech Services
            </h1>

            <p className="text-xl sm:text-2xl lg:text-3xl text-indigo-100/90 font-light max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              Expert CCTV installation, IT support, computer & mobile repair,
              and on-site services for homes & offices in Abu Dhabi
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-900 text-lg font-bold rounded-2xl shadow-2xl hover:-translate-y-1 transition-all"
            >
              Get Quote Now
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">

            {/* Mobile Repair */}
            <div
              id="mobileServices"
              className="bg-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center bg-yellow-500 rounded-xl mr-4">
                  <FaMobileAlt className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold">Mobile Repair</h2>
              </div>

              <p className="text-gray-600 mb-6">
                Fast & reliable repairs for smartphones including screen
                replacement, battery service and software fixes.
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex gap-2">
                  ✔ Screen & Battery Replacement
                </li>
                <li className="flex gap-2">
                  ✔ Software Updates & Backup
                </li>
                <li className="flex gap-2">
                  ✔ Performance optimization & accessories
                </li>
              </ul>

              <Link to="/contact" className="text-indigo-600 font-semibold">
                Learn More →
              </Link>
            </div>

            {/* Computer Repair */}
            <div
              id="computerServices"
              className="bg-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-500 rounded-xl mr-4">
                  <FaLaptopCode className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold">Computer Repair</h2>
              </div>

              <p className="text-gray-600 mb-6">
                Professional laptop and desktop services including OS
                installation, virus removal and hardware upgrades.
              </p>

              <ul className="space-y-3 mb-6">
                <li>✔ OS Install & Virus Removal</li>
                <li>✔ RAM, SSD & GPU Upgrades</li>
                <li>✔ Custom PC builds & office setups</li>
              </ul>

              <Link to="/contact" className="text-indigo-600 font-semibold">
                Learn More →
              </Link>
            </div>

            {/* CCTV Security */}
            <div
              id="cctvServices"
              className="bg-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center bg-red-500 rounded-xl mr-4">
                  <FaVideo className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold">CCTV Security</h2>
              </div>

              <p className="text-gray-600 mb-6">
                Professional CCTV installation, alarm systems and security
                monitoring solutions for homes and businesses.
              </p>

              <ul className="space-y-3 mb-6">
                <li>✔ CCTV Installation & Configuration</li>
                <li>✔ Alarm & Intercom Systems</li>
                <li>✔ 24/7 maintenance & support</li>
              </ul>

              <Link to="/contact" className="text-indigo-600 font-semibold">
                Learn More →
              </Link>
            </div>

            {/* IT Networking */}
            <div
              id="itSupportServices"
              className="bg-white rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center bg-green-500 rounded-xl mr-4">
                  <FaNetworkWired className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold">IT Networking</h2>
              </div>

              <p className="text-gray-600 mb-6">
                Networking services including Wi-Fi setup, LAN configuration
                and office IT infrastructure support.
              </p>

              <ul className="space-y-3 mb-6">
                <li>✔ Wi-Fi Router & LAN Setup</li>
                <li>✔ Server & Printer Connectivity</li>
                <li>✔ On-site & remote support</li>
              </ul>

              <Link to="/contact" className="text-indigo-600 font-semibold">
                Learn More →
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;






