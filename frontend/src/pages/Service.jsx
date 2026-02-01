import React from "react";
import {
  FaMobileAlt,
  FaLaptopCode,
  FaVideo,
  FaNetworkWired,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Service = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative w-full h-[450px]">
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20240327/pngtree-repairing-and-upgrade-mobile-phone-electronic-computer-hardware-and-technology-concept-image_15645837.jpg"
          alt="Services Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Our Services
          </h1>
          <p className="text-sm md:text-lg text-gray-200 max-w-3xl">
            We provide professional CCTV, IT support, computer and mobile
            repair, and on‑site home & office IT services to keep your tech
            secure, optimized, and running smoothly.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto px-4 py-20 space-y-16">
        {/* Mobile Service */}
        <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 overflow-hidden">
          <div className="md:w-1/2 h-64 md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80"
              alt="Mobile Service"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-yellow-100 text-yellow-500 mr-4">
                <FaMobileAlt className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Mobile Service
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Comprehensive mobile repair and support for all major brands. We
              handle <span className="font-semibold">screen replacements</span>,{" "}
              <span className="font-semibold">battery issues</span>, software
              troubleshooting, and accessories setup, ensuring your device runs
              smoothly and efficiently.
            </p>
            <ul className="list-disc list-inside text-gray-500 mb-6">
              <li>
                <span className="font-semibold">
                  Screen and battery replacement
                </span>
              </li>
              <li>
                <span className="font-semibold">
                  Software updates, backup, and troubleshooting
                </span>
              </li>
              <li>Accessories setup and performance optimization</li>
            </ul>
            <Link to="/services">
              <span className="inline-block rounded-md bg-yellow-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-yellow-600">
                Read More
              </span>
            </Link>
          </div>
        </div>

        {/* Computer Service */}
        <div className="flex flex-col md:flex-row-reverse items-center bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 overflow-hidden">
          <div className="md:w-1/2 h-64 md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80"
              alt="Computer Service"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-100 text-blue-500 mr-4">
                <FaLaptopCode className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Computer Service
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Professional laptop and desktop repair services including{" "}
              <span className="font-semibold">hardware upgrades</span>,{" "}
              <span className="font-semibold">OS installation</span>, virus
              removal, and performance optimization. Keep your computer fast,
              secure, and reliable.
            </p>
            <ul className="list-disc list-inside text-gray-500 mb-6">
              <li>
                <span className="font-semibold">
                  OS installation and virus removal
                </span>
              </li>
              <li>
                <span className="font-semibold">
                  Hardware upgrades (RAM, SSD, GPU)
                </span>
              </li>
              <li>Custom PC build and office setup support</li>
            </ul>
            <Link to="/services">
              <span className="inline-block rounded-md bg-yellow-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-yellow-600">
                Read More
              </span>
            </Link>
          </div>
        </div>

        {/* CCTV & Security */}
        <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 overflow-hidden">
          <div className="md:w-1/2 h-64 md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=80"
              alt="CCTV & Security"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-red-100 text-red-500 mr-4">
                <FaVideo className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                CCTV & Security
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Complete security solutions including{" "}
              <span className="font-semibold">CCTV</span>,{" "}
              <span className="font-semibold">alarm systems</span>, and{" "}
              <span className="font-semibold">intercom setups</span> for homes
              and businesses.
            </p>
            <ul className="list-disc list-inside text-gray-500 mb-6">
              <li>
                <span className="font-semibold">
                  CCTV camera installation and configuration
                </span>
              </li>
              <li>Alarm and intercom systems</li>
              <li>Regular maintenance and on‑call support</li>
            </ul>
            <Link to="/services">
              <span className="inline-block rounded-md bg-yellow-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-yellow-600">
                Read More
              </span>
            </Link>
          </div>
        </div>

        {/* IT Support & Networking */}
        <div className="flex flex-col md:flex-row-reverse items-center bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 overflow-hidden">
          <div className="md:w-1/2 h-64 md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80"
              alt="IT Support & Networking"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-green-100 text-green-500 mr-4">
                <FaNetworkWired className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                IT Support & Networking
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Full-service IT support for homes and offices. We handle{" "}
              <span className="font-semibold">Wi-Fi setup</span>,{" "}
              <span className="font-semibold">LAN configuration</span>, server
              and printer connectivity, and ongoing maintenance.
            </p>
            <ul className="list-disc list-inside text-gray-500 mb-6">
              <li>Router, Wi-Fi, and LAN setup</li>
              <li>Server, printer, and device connectivity</li>
              <li>On-site troubleshooting and remote support</li>
            </ul>
            <Link to="/services">
              <span className="inline-block rounded-md bg-yellow-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-yellow-600">
                Read More
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
