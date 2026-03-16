// import React from "react";
// import HomeCarousel from "../components/HomeCarousel";
// import { Link } from "react-router-dom";
// import { FaMobileAlt, FaLaptop, FaVideo, FaNetworkWired } from "react-icons/fa";

// const Home = () => {
//   return (
//     <div className="">
//       <HomeCarousel />

//       {/* Products section */}
//       <div className="max-w-6xl mx-auto px-4 pt-18 pb-18">
//         <h1 className="text-center text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
//           Products
//         </h1>
//         <p className="text-center text-sm md:text-base text-gray-500 mb-12 max-w-2xl mx-auto">
//           Explore our latest smartphones, high‑performance laptops, and
//           essential accessories in both fresh and used options, including
//           quality checked used and brand‑new laptops and mobiles for every
//           budget.
//         </p>

//         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {/* Card 1 */}
//           <div className="group relative flex flex-col rounded-2xl  shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl">
//             <div className="relative overflow-hidden">
//               <img
//                 src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
//                 alt="Mobile Phones"
//                 className="w-full h-44 sm:h-52 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
//               />
//               <span className="absolute top-3 left-3 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
//                 Fresh &amp; Used
//               </span>
//             </div>

//             <div className="flex flex-col flex-1 p-5">
//               <h2 className="text-lg font-semibold text-gray-900 mb-1 text-center">
//                 Mobile Phones
//               </h2>
//               <p className="text-xs text-gray-500 mb-4 text-center">
//                 Latest Android &amp; iOS devices with warranty and expert setup
//                 support.
//               </p>
//               <Link to="/product">
//                 <button className="mt-auto w-full rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-yellow-600">
//                   View More...
//                 </button>
//               </Link>
//             </div>
//           </div>

//           {/* Card 2 */}
//           <div className="group relative flex flex-col rounded-2xl bg-white shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl">
//             <div className="relative overflow-hidden">
//               <img
//                 src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
//                 alt="Laptops"
//                 className="w-full h-44 sm:h-52 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
//               />
//               <span className="absolute top-3 left-3 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
//                 Work &amp; Gaming
//               </span>
//             </div>

//             <div className="flex flex-col flex-1 p-5">
//               <h2 className="text-lg font-semibold text-gray-900 mb-1 text-center">
//                 Laptops
//               </h2>
//               <p className="text-xs text-gray-500 mb-4 text-center">
//                 Reliable laptops for office, study, and gaming with upgrade
//                 options.
//               </p>
//               <Link to="/product">
//                 <button className="mt-auto w-full rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-yellow-600">
//                   View More...
//                 </button>
//               </Link>
//             </div>
//           </div>

//           {/* Card 3 */}
//           <div className="group relative flex flex-col rounded-2xl bg-white shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl">
//             <div className="relative overflow-hidden">
//               <img
//                 src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80"
//                 alt="Accessories"
//                 className="w-full h-44 sm:h-52 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
//               />
//               <span className="absolute top-3 left-3 rounded-full bg-purple-500 px-3 py-1 text-xs font-semibold text-white">
//                 All Accessories
//               </span>
//             </div>

//             <div className="flex flex-col flex-1 p-5">
//               <h2 className="text-lg font-semibold text-gray-900 mb-1 text-center">
//                 Accessories
//               </h2>
//               <p className="text-xs text-gray-500 mb-4 text-center">
//                 Cases, chargers, earphones, smartwatches, and more to match your
//                 device.
//               </p>
//               <Link to="/product">
//                 <button className="mt-auto w-full rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-yellow-600">
//                   View More...
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </section>
//       </div>

//       {/* Services section */}
//       <div className=" py-20">
//         <div className="max-w-6xl mx-auto px-4">
//           <h1 className="text-center text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
//             Our Services
//           </h1>
//           <p className="text-center text-sm md:text-base text-gray-500 mb-12 max-w-2xl mx-auto">
//             Professional CCTV, IT support, computer and mobile repair, and
//             on‑site home & office IT services to keep your tech secure and
//             running smoothly.
//           </p>

//           <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
//             {/* Mobile Service */}
//             <div className="group flex flex-col h-full rounded-2xl bg-gray-50 shadow-md p-6 text-center transition hover:-translate-y-1 hover:shadow-xl cursor-pointer">
//               <FaMobileAlt className="mx-auto mb-4 text-5xl text-yellow-500 group-hover:scale-110 transition" />
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 Mobile Service
//               </h3>
//               <p className="text-sm text-gray-500 mb-6 grow">
//                 Mobile repair, software, upgrades, and accessories.
//               </p>
//               <Link to="/services#mobileServices" className="mt-auto">
//                 <span className="inline-block rounded-md bg-yellow-500 px-5 py-2 text-sm font-semibold text-white transition group-hover:bg-yellow-600">
//                   Read More
//                 </span>
//               </Link>
//             </div>

//             {/* Computer Service */}
//             <div className="group flex flex-col h-full rounded-2xl bg-gray-50 shadow-md p-6 text-center transition hover:-translate-y-1 hover:shadow-xl cursor-pointer">
//               <FaLaptop className="mx-auto mb-4 text-5xl text-blue-500 group-hover:scale-110 transition" />
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 Computer Service
//               </h3>
//               <p className="text-sm text-gray-500 mb-6 grow">
//                 Laptop & desktop repair, OS installation, upgrades.
//               </p>
//               <Link to="/services#computerServices" className="mt-auto">
//                 <span className="inline-block rounded-md bg-yellow-500 px-5 py-2 text-sm font-semibold text-white transition group-hover:bg-yellow-600">
//                   Read More
//                 </span>
//               </Link>
//             </div>

//             {/* CCTV Service */}
//             <div className="group flex flex-col h-full rounded-2xl bg-gray-50 shadow-md p-6 text-center transition hover:-translate-y-1 hover:shadow-xl cursor-pointer">
//               <FaVideo className="mx-auto mb-4 text-5xl text-purple-500 group-hover:scale-110 transition" />
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 CCTV Service
//               </h3>
//               <p className="text-sm text-gray-500 mb-6 grow">
//                 Installation and maintenance of CCTV systems for homes and
//                 businesses.
//               </p>
//               <Link to="/services#cctvServices" className="mt-auto">
//                 <span className="inline-block rounded-md bg-yellow-500 px-5 py-2 text-sm font-semibold text-white transition group-hover:bg-yellow-600">
//                   Read More
//                 </span>
//               </Link>
//             </div>

//             {/* IT Support */}
//             <div className="group flex flex-col h-full rounded-2xl bg-gray-50 shadow-md p-6 text-center transition hover:-translate-y-1 hover:shadow-xl cursor-pointer">
//               <FaNetworkWired className="mx-auto mb-4 text-5xl text-green-500 group-hover:scale-110 transition" />
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 IT Support
//               </h3>
//               <p className="text-sm text-gray-500 mb-6 grow">
//                 Home & office IT support, networking, Wi-Fi setup.
//               </p>
//               <Link to="/services#itSupportServices" className="mt-auto">
//                 <span className="inline-block rounded-md bg-yellow-500 px-5 py-2 text-sm font-semibold text-white transition group-hover:bg-yellow-600">
//                   Read More
//                 </span>
//               </Link>
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React from "react";
import HomeCarousel from "../components/HomeCarousel";
import { Link } from "react-router-dom";
import { FaMobileAlt, FaLaptop, FaVideo, FaNetworkWired, FaShieldAlt } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-linear-to-br from-slate-50 via-white to-indigo-50 min-h-screen">
      {/* Featured Carousel */}
      <section className="relative overflow-hidden">
        <HomeCarousel />
        {/* Floating gradient elements */}
        <div className="absolute top-20 left-4 w-24 h-24 bg-linear-to-r from-yellow-400/30 to-orange-400/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-1/2 right-8 w-32 h-32 bg-linear-to-b from-blue-400/20 to-indigo-400/20 rounded-full blur-2xl animate-pulse delay-1000" />
      </section>

      {/* Products Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-block items-center gap-2 bg-linear-to-r from-emerald-400 to-emerald-500 text-white px-6 py-3 rounded-full mb-6 font-semibold shadow-lg inline-block">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Featured Categories
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-linear-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">
            Premium Products
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Latest smartphones, powerful laptops, and essential accessories - 
            fresh & used options for every budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Mobile Phones Card */}
          <Link to="/product" className="group">
            <div className="relative h-full bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden border border-gray-100 hover:border-indigo-200">
              <div className="relative overflow-hidden bg-linear-to-br from-indigo-50 to-purple-50 pt-4 px-6 pb-6">
                <img
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
                  alt="Mobile Phones"
                  className="w-full h-56 lg:h-64 object-cover rounded-2xl mx-2 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                <span className="absolute top-4 left-4 bg-linear-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                  Fresh & Used
                </span>
                <div className="absolute bottom-4 right-4 w-20 h-20 bg-linear-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl blur-sm group-hover:scale-110 transition-transform" />
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <FaMobileAlt className="w-12 h-12 text-indigo-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-black text-gray-900 text-center mb-4 bg-linear-to-r from-gray-900 to-indigo-900 bg-clip-text">
                  Mobile Phones
                </h2>
                <p className="text-gray-600 text-center mb-8 leading-relaxed text-lg">
                  iPhone • Samsung • OnePlus with warranty & expert setup
                </p>
                <button className="w-full group-hover:bg-linear-to-r group-hover:from-yellow-500 group-hover:to-orange-500 bg-yellow-500 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-yellow-500/50">
                  Explore Now →
                </button>
              </div>
            </div>
          </Link>

          {/* Laptops Card */}
          <Link to="/product" className="group">
            <div className="relative h-full bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200">
              <div className="relative overflow-hidden bg-linear-to-br from-blue-50 to-indigo-50 pt-4 px-6 pb-6">
                <img
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
                  alt="Laptops"
                  className="w-full h-56 lg:h-64 object-cover rounded-2xl mx-2 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                <span className="absolute top-4 left-4 bg-linear-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                  Work & Gaming
                </span>
                <div className="absolute bottom-4 right-4 w-20 h-20 bg-linear-to-r from-blue-400/20 to-indigo-400/20 rounded-2xl blur-sm group-hover:scale-110 transition-transform" />
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <FaLaptop className="w-12 h-12 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-black text-gray-900 text-center mb-4 bg-linear-to-r from-gray-900 to-blue-900 bg-clip-text">
                  Laptops
                </h2>
                <p className="text-gray-600 text-center mb-8 leading-relaxed text-lg">
                  MacBook • Dell • Gaming rigs with upgrade options
                </p>
                <button className="w-full group-hover:bg-linear-to-r group-hover:from-yellow-500 group-hover:to-orange-500 bg-yellow-500 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-yellow-500/50">
                  Explore Now →
                </button>
              </div>
            </div>
          </Link>

          {/* Accessories Card */}
          <Link to="/product" className="group">
            <div className="relative h-full bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden border border-gray-100 hover:border-purple-200">
              <div className="relative overflow-hidden bg-linear-to-br from-purple-50 to-pink-50 pt-4 px-6 pb-6">
                <img
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80"
                  alt="Accessories"
                  className="w-full h-56 lg:h-64 object-cover rounded-2xl mx-2 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                <span className="absolute top-4 left-4 bg-linear-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                  All Accessories
                </span>
                <div className="absolute bottom-4 right-4 w-20 h-20 bg-linear-to-r from-purple-400/20 to-pink-400/20 rounded-2xl blur-sm group-hover:scale-110 transition-transform" />
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <FaShieldAlt className="w-12 h-12 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-black text-gray-900 text-center mb-4 bg-linear-to-r from-gray-900 to-purple-900 bg-clip-text">
                  Accessories
                </h2>
                <p className="text-gray-600 text-center mb-8 leading-relaxed text-lg">
                  Cases • Chargers • Earbuds • Smartwatches
                </p>
                <button className="w-full group-hover:bg-linear-to-r group-hover:from-yellow-500 group-hover:to-orange-500 bg-yellow-500 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-yellow-500/50">
                  Explore Now →
                </button>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28 bg-linear-to-b from-indigo-50/50 via-white to-purple-50/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,var(--tw-gradient-stops))] from-blue-200/30 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-block items-center gap-2 bg-linear-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full mb-6 font-semibold shadow-lg inline-block">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Professional Services
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-linear-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent mb-6">
              Expert Tech Services
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Professional repair, CCTV installation, and IT support for homes & businesses
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Mobile Service */}
            <Link to="/services#mobileServices" className="group">
              <div className="relative h-full bg-white/70 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 border border-white/50 hover:border-yellow-200/50 overflow-hidden">
                <div className="absolute top-0 -right-10 w-32 h-32 bg-linear-to-br from-yellow-400/30 to-orange-500/20 rounded-bl-full blur-sm group-hover:scale-110 transition-transform" />
                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-linear-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl mb-6 group-hover:scale-110 transition-all duration-500 mx-auto">
                    <FaMobileAlt className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4 bg-linear-to-r from-gray-900 to-yellow-900 bg-clip-text">
                    Mobile Repair
                  </h3>
                  <p className="text-gray-600 mb-8 flex-1 leading-relaxed text-lg">
                    Screen replacement, battery service, software fixes
                  </p>
                  <span className="group-hover:bg-linear-to-r group-hover:from-yellow-500 group-hover:to-orange-500 inline-block bg-yellow-500 text-white px-8 py-3 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                    Read More →
                  </span>
                </div>
              </div>
            </Link>

            {/* Computer Service */}
            <Link to="/services#computerServices" className="group">
              <div className="relative h-full bg-white/70 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 border border-white/50 hover:border-blue-200/50 overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-linear-to-br from-blue-400/30 to-indigo-500/20 rounded-tr-full blur-sm group-hover:scale-110 transition-transform" />
                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-linear-to-br from-blue-400 to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl mb-6 group-hover:scale-110 transition-all duration-500 mx-auto">
                    <FaLaptop className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4 bg-linear-to-r from-gray-900 to-blue-900 bg-clip-text">
                    Computer Repair
                  </h3>
                  <p className="text-gray-600 mb-8 flex-1 leading-relaxed text-lg">
                    OS installation, hardware upgrades, virus removal
                  </p>
                  <span className="group-hover:bg-linear-to-r group-hover:from-yellow-500 group-hover:to-orange-500 inline-block bg-yellow-500 text-white px-8 py-3 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                    Read More →
                  </span>
                </div>
              </div>
            </Link>

            {/* CCTV Service */}
            <Link to="/services#cctvServices" className="group">
              <div className="relative h-full bg-white/70 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 border border-white/50 hover:border-purple-200/50 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-purple-400/30 to-pink-500/20 rounded-tl-full blur-sm group-hover:scale-110 transition-transform" />
                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-linear-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl mb-6 group-hover:scale-110 transition-all duration-500 mx-auto">
                    <FaVideo className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4 bg-linear-to-r from-gray-900 to-purple-900 bg-clip-text">
                    CCTV Installation
                  </h3>
                  <p className="text-gray-600 mb-8 flex-1 leading-relaxed text-lg">
                    Professional security camera systems for homes & offices
                  </p>
                  <span className="group-hover:bg-linear-to-r group-hover:from-yellow-500 group-hover:to-orange-500 inline-block bg-yellow-500 text-white px-8 py-3 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                    Read More →
                  </span>
                </div>
              </div>
            </Link>

            {/* IT Support */}
            <Link to="/services#itSupportServices" className="group">
              <div className="relative h-full bg-white/70 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 border border-white/50 hover:border-green-200/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-green-400/30 to-emerald-500/20 rounded-bl-full blur-sm group-hover:scale-110 transition-transform" />
                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-linear-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl mb-6 group-hover:scale-110 transition-all duration-500 mx-auto">
                    <FaNetworkWired className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4 bg-linear-to-r from-gray-900 to-green-900 bg-clip-text">
                    IT Networking
                  </h3>
                  <p className="text-gray-600 mb-8 flex-1 leading-relaxed text-lg">
                    Wi-Fi setup, LAN configuration, server support
                  </p>
                  <span className="group-hover:bg-linear-to-r group-hover:from-yellow-500 group-hover:to-orange-500 inline-block bg-yellow-500 text-white px-8 py-3 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                    Read More →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
