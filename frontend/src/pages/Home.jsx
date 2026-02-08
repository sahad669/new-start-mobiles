import React from "react";
import HomeCarousel from "../components/HomeCarousel";
import { Link } from "react-router-dom";
import { FaMobileAlt, FaLaptop, FaVideo, FaNetworkWired } from "react-icons/fa";

const Home = () => {
  return (
    <div className="">
      <HomeCarousel />

      {/* Products section */}
      <div className="max-w-6xl mx-auto px-4 pt-18 pb-18">
        <h1 className="text-center text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Products
        </h1>
        <p className="text-center text-sm md:text-base text-gray-500 mb-12 max-w-2xl mx-auto">
          Explore our latest smartphones, high‑performance laptops, and
          essential accessories in both fresh and used options, including
          quality checked used and brand‑new laptops and mobiles for every
          budget.
        </p>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group relative flex flex-col rounded-2xl  shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl">
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
                alt="Mobile Phones"
                className="w-full h-44 sm:h-52 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <span className="absolute top-3 left-3 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                Fresh &amp; Used
              </span>
            </div>

            <div className="flex flex-col flex-1 p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-1 text-center">
                Mobile Phones
              </h2>
              <p className="text-xs text-gray-500 mb-4 text-center">
                Latest Android &amp; iOS devices with warranty and expert setup
                support.
              </p>

              <button className="mt-auto w-full rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-yellow-600">
                View More...
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative flex flex-col rounded-2xl bg-white shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl">
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
                alt="Laptops"
                className="w-full h-44 sm:h-52 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <span className="absolute top-3 left-3 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                Work &amp; Gaming
              </span>
            </div>

            <div className="flex flex-col flex-1 p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-1 text-center">
                Laptops
              </h2>
              <p className="text-xs text-gray-500 mb-4 text-center">
                Reliable laptops for office, study, and gaming with upgrade
                options.
              </p>

              <button className="mt-auto w-full rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-yellow-600">
                View More...
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative flex flex-col rounded-2xl bg-white shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl">
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80"
                alt="Accessories"
                className="w-full h-44 sm:h-52 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <span className="absolute top-3 left-3 rounded-full bg-purple-500 px-3 py-1 text-xs font-semibold text-white">
                All Accessories
              </span>
            </div>

            <div className="flex flex-col flex-1 p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-1 text-center">
                Accessories
              </h2>
              <p className="text-xs text-gray-500 mb-4 text-center">
                Cases, chargers, earphones, smartwatches, and more to match your
                device.
              </p>

              <button className="mt-auto w-full rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-yellow-600">
                View More...
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Services section */}
      <div className=" py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-center text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Our Services
        </h1>
        <p className="text-center text-sm md:text-base text-gray-500 mb-12 max-w-2xl mx-auto">
          Professional CCTV, IT support, computer and mobile repair, and
          on‑site home & office IT services to keep your tech secure and
          running smoothly.
        </p>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {/* Mobile Service */}
          <div className="group flex flex-col h-full rounded-2xl bg-gray-50 shadow-md p-6 text-center transition hover:-translate-y-1 hover:shadow-xl cursor-pointer">
            <FaMobileAlt className="mx-auto mb-4 text-5xl text-yellow-500 group-hover:scale-110 transition" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Service</h3>
            <p className="text-sm text-gray-500 mb-6 grow">
              Mobile repair, software, upgrades, and accessories.
            </p>
            <Link to="/services" className="mt-auto">
              <span className="inline-block rounded-md bg-yellow-500 px-5 py-2 text-sm font-semibold text-white transition group-hover:bg-yellow-600">
                Read More
              </span>
            </Link>
          </div>

          {/* Computer Service */}
          <div className="group flex flex-col h-full rounded-2xl bg-gray-50 shadow-md p-6 text-center transition hover:-translate-y-1 hover:shadow-xl cursor-pointer">
            <FaLaptop className="mx-auto mb-4 text-5xl text-blue-500 group-hover:scale-110 transition" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Computer Service</h3>
            <p className="text-sm text-gray-500 mb-6 grow">
              Laptop & desktop repair, OS installation, upgrades.
            </p>
            <Link to="/services" className="mt-auto">
              <span className="inline-block rounded-md bg-yellow-500 px-5 py-2 text-sm font-semibold text-white transition group-hover:bg-yellow-600">
                Read More
              </span>
            </Link>
          </div>

          {/* CCTV Service */}
          <div className="group flex flex-col h-full rounded-2xl bg-gray-50 shadow-md p-6 text-center transition hover:-translate-y-1 hover:shadow-xl cursor-pointer">
            <FaVideo className="mx-auto mb-4 text-5xl text-purple-500 group-hover:scale-110 transition" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">CCTV Service</h3>
            <p className="text-sm text-gray-500 mb-6 grow">
              Installation and maintenance of CCTV systems for homes and businesses.
            </p>
            <Link to="/services" className="mt-auto">
              <span className="inline-block rounded-md bg-yellow-500 px-5 py-2 text-sm font-semibold text-white transition group-hover:bg-yellow-600">
                Read More
              </span>
            </Link>
          </div>

          {/* IT Support */}
          <div className="group flex flex-col h-full rounded-2xl bg-gray-50 shadow-md p-6 text-center transition hover:-translate-y-1 hover:shadow-xl cursor-pointer">
            <FaNetworkWired className="mx-auto mb-4 text-5xl text-green-500 group-hover:scale-110 transition" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">IT Support</h3>
            <p className="text-sm text-gray-500 mb-6 grow">
              Home & office IT support, networking, Wi-Fi setup.
            </p>
            <Link to="/services" className="mt-auto">
              <span className="inline-block rounded-md bg-yellow-500 px-5 py-2 text-sm font-semibold text-white transition group-hover:bg-yellow-600">
                Read More
              </span>
            </Link>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
};

export default Home;
