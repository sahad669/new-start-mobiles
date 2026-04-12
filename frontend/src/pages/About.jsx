
import React from "react";
import {
  FaMobileAlt,
  FaTools,
  FaTags,
  FaShieldAlt,
  FaVideo,
} from "react-icons/fa";
import Branches from "../components/Branches";

const About = () => {
  return (
    <div className="bg-linear-to-br from-slate-50 via-white to-indigo-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-linear-to-br from-indigo-900 via-purple-900/50 to-gray-900">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <img
          src="/images/new-star-about.webp"
          alt="About Us"
          className="absolute inset-0 w-full h-[500px] sm:h-[600px] lg:h-[500px] object-cover opacity-40"
        />
        
        <div className="relative z-10 flex flex-col justify-center items-center h-[60vh] sm:h-[65vh] lg:h-[70vh]">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black bg-linear-to-r from-white via-indigo-50 to-white bg-clip-text text-transparent mb-6 sm:mb-8 drop-shadow-2xl leading-tight">
              About New Star Mobile
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-indigo-100/90 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Your trusted destination for premium smartphones, genuine accessories, 
              expert repairs, and professional CCTV installation in Abu Dhabi
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT DESCRIPTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-linear-to-r from-indigo-50/50 via-white/80 to-purple-50/50" />
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Video Section */}
          <div className="order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
              <video
                width="100%"
                height="100%"
                autoPlay
                loop
                muted
                playsInline
                controls
                className="relative rounded-3xl shadow-2xl w-full aspect-video max-w-md mx-auto lg:max-w-none block object-cover border-8 border-white/50"
                poster="/images/video-poster.jpg"
              >
                <source src="/videos/new-start-group-vedio.mp4" type="video/mp4" />
                <source src="/videos/new-start-group-vedio.ogg" type="video/ogg" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full mb-8 font-semibold text-sm">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
              About Our Company
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-linear-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">
              Trusted Tech Partner Since 2008
            </h2>
            
            <p className="text-md sm:text-lg text-gray-700 mb-8 leading-relaxed max-w-lg lg:max-w-none">
              New Star Mobile is Abu Dhabi's premier destination for smartphones, 
              genuine accessories, and professional repair services. With years of 
              experience serving thousands of satisfied customers, we combine cutting-edge 
              technology with personalized service.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="text-left">
                <div className="w-12 h-12 bg-linear-to-r from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-xl text-gray-900 mb-2">100% Genuine Products</h4>
                <p className="text-gray-600">Every device and accessory comes with authentic warranty</p>
              </div>
              <div className="text-left">
                <div className="w-12 h-12 bg-linear-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-xl text-gray-900 mb-2">Best Prices Guaranteed</h4>
                <p className="text-gray-600">Competitive pricing with regular promotions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
    <section className="relative overflow-hidden py-12 sm:py-14 lg:py-16">
        <div className="absolute inset-0 bg-linear-to-rr from-indigo-50/80 via-white to-purple-50/80" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-linear-to-r from-emerald-400 to-emerald-500 text-white px-6 py-3 rounded-full mb-8 font-semibold shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Why Thousands Choose Us
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black bg-linear-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent mb-6">
              What Makes Us Different
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience excellence in every purchase and service
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8 justify-items-center">
            {[
              { 
                icon: FaMobileAlt, 
                title: "Latest Smartphones", 
                color: "from-indigo-500 to-blue-600",
                desc: "iPhone, Samsung, latest models"
              },
              { 
                icon: FaShieldAlt, 
                title: "Genuine Accessories", 
                color: "from-emerald-500 to-teal-600",
                desc: "Chargers, cases, screen protectors"
              },
              { 
                icon: FaTags, 
                title: "Best Prices", 
                color: "from-yellow-500 to-orange-600",
                desc: "Unbeatable deals & offers"
              },
              { 
                icon: FaTools, 
                title: "Expert Repairs", 
                color: "from-purple-500 to-pink-600",
                desc: "Fast, reliable service"
              },
              { 
                icon: FaVideo, 
                title: "CCTV Installation", 
                color: "from-red-500 to-rose-600",
                desc: "Professional security systems"
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative w-48 h-48 lg:w-52 lg:h-52 bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 overflow-hidden cursor-pointer hover:scale-105"
              >
                {/* Decorative Ring */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-white/50 to-transparent opacity-75 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6 lg:p-8">
                  <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-linear-to-br ${item.color} shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 mx-auto`}>
                    <item.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white shadow-lg" />
                  </div>
                  <h3 className="font-black text-lg lg:text-xl text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors px-2">
                    {item.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-500 px-2 leading-tight">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANCHES */}
    <section  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <Branches />
      </section>
    </div>
  );
};

export default About;
