import React from "react";
import {
  FaMobileAlt,
  FaTools,
  FaTags,
  FaShieldAlt,
  FaVideo,
} from "react-icons/fa";
import Branches from "../components/branches";

const About = () => {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <div className="relative w-full h-[420px] overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzUdN4sYB9hgsdU5ePMhzHdHEuos7BXEclD_1ZtZnIvYRP1JJMyzJszCKENHQcuL-54PeTfGzE8mfqC35YSgbtRpttPMYjO0nX-ro9OsPWo1RanieiMES0i1TZekhIQy6-o8iR1=s680-w680-h510-rw"
          alt="Mobile Shop"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            About Our Mobile Shop
          </h1>
          <p className="text-gray-200 max-w-2xl text-sm md:text-base">
            Your trusted destination for smartphones, accessories, and expert service
          </p>
        </div>
      </div>

      {/* ABOUT DESCRIPTION */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <video
            width="100%"
            height="100%"
            autoPlay
            loop
            muted
            controls
            className="rounded-xl shadow-lg"
          >
            <source src="/videos/new-start-group-vedio.mp4" type="video/mp4" />
            <source src="/videos/new-start-group-vedio.ogg" type="video/ogg" />
            Your browser does not support the video tag.
          </video>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We are a trusted mobile phone shop offering the latest smartphones, accessories, and repair services. Our goal is to provide genuine products, competitive prices, and excellent customer support.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you are looking for a new phone, accessories, or technical help, our experienced team is always ready to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-linear-to-br from-gray-100 to-gray-200 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-14">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 justify-items-center">
            {[
              { icon: <FaMobileAlt size={32} />, title: "Latest Smartphones" },
              { icon: <FaShieldAlt size={32} />, title: "Genuine Accessories" },
              { icon: <FaTags size={32} />, title: "Affordable Prices" },
              { icon: <FaTools size={32} />, title: "Expert Repair Service" },
              { icon: <FaVideo size={32} />, title: "CCTV Installation" },
            ].map((item, index) => (
              <div
                key={index}
                className="w-52 h-52 bg-white rounded-full shadow-lg flex flex-col items-center justify-center text-center p-4
                           hover:bg-black hover:text-white hover:scale-105 transition-all duration-300"
              >
                <div className="mb-3 text-blue-600 group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-sm md:text-base">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANCHES */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <Branches />
      </section>
    </div>
  );
};

export default About;
