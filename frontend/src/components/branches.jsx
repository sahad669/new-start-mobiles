import React, { useState, useEffect } from "react";

const branchesData = [
  {
    name: "Branch 1",
    location:
      "7 Ath Thiqah 8 St - Musaffah-17 - Musaffah Industrial - Abu Dhabi",
    images: [
      "/images/new-star.jpg",
      "/images/newstar-two.webp",
      "/images/newstar-one.webp",
      "/images/newstar-three.webp",
      "/images/new-star-about.webp",
    ],
  },
  {
    name: "Branch 2",
    location: "Musaffah-17 - Abu Dhabi ",
    images: [
      "/images/new-star.jpg",
      "/images/newstar-two.webp",
      "/images/newstar-one.webp",
      "/images/newstar-three.webp",
      "/images/new-star-about.webp",
    ],
  },
  {
    name: "Branch 3",
    location: "Western Region Beda Zayed Sanaya - Abu Dhabi ",
    images: [
      "/images/new-star.jpg",
      "/images/newstar-two.webp",
      "/images/newstar-one.webp",
      "/images/newstar-three.webp",
      "/images/new-star-about.webp",
    ],
  },
];

const BranchCard = ({ branch }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === branch.images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [branch.images.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? branch.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === branch.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl border border-white/50 hover:border-emerald-200/50 transition-all duration-500 hover:-translate-y-3 overflow-hidden w-full h-full flex flex-col">
      {/* Carousel - Fixed height */}
      <div className="relative w-full h-80 shrink-0 overflow-hidden rounded-t-3xl">
        {branch.images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out transform ${
              i === currentIndex
                ? "scale-100 opacity-100"
                : "scale-105 opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Branch ${branch.name} ${i + 1}`}
              className="w-full h-full object-cover rounded-t-3xl group-hover:scale-110 transition-transform duration-700"
              loading={i === 0 ? "eager" : "lazy"}
            />
            {/* Fixed: Correct gradient syntax */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent rounded-t-3xl" />
          </div>
        ))}

        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-2xl">
          {currentIndex + 1} / {branch.images.length}
        </div>

        {/* Carousel controls */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-14 h-14 bg-white/90 hover:bg-white backdrop-blur-sm rounded-2xl shadow-2xl hover:shadow-xl hover:scale-110 transition-all duration-300 border hover:border-emerald-400"
        >
          <svg
            className="w-7 h-7 text-slate-800 hover:text-emerald-600 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-14 h-14 bg-white/90 hover:bg-white backdrop-blur-sm rounded-2xl shadow-2xl hover:shadow-xl hover:scale-110 transition-all duration-300 border hover:border-emerald-400"
        >
          <svg
            className="w-7 h-7 text-slate-800 hover:text-emerald-600 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* FIXED: Perfectly aligned content + button */}
      <div className="flex-1 flex flex-col justify-between p-8">
        {/* Title + Location - Fixed height container */}
        <div className="flex-1 flex flex-col justify-center space-y-4">
          <h3 className="text-2xl font-bold bg-linear-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 text-center">
            {branch.name}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed text-center px-4 line-clamp-3">
            {branch.location}
          </p>
        </div>

        {/* FIXED BUTTON: Always same position + size */}
        <div className="pt-6 pb-2 border-t border-slate-200/50">
          <button className="w-full max-w-md mx-auto 
  bg-linear-to-r from-gray-900 via-indigo-900 to-gray-900 
  hover:from-emerald-700 hover:to-teal-700
  text-white 
  font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl 
  transition-all duration-300 text-lg flex items-center justify-center gap-2 h-14">
            <svg
              className="w-6 h-6 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Visit Branch
          </button>
        </div>
      </div>
    </div>
  );
};

const Branches = () => {
  return (
    <section className="min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-4 bg-linear-to-r from-emerald-600 via-teal-600 to-emerald-700 px-10 py-6 rounded-3xl backdrop-blur-sm shadow-2xl mb-8 border border-emerald-200/50 hover:shadow-3xl transition-all duration-300 max-w-4xl mx-auto">
            <svg
              className="w-12 h-12 text-white drop-shadow-2xl shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div>
              <h2 className="text-3xl lg:text-4xl font-black bg-linear-to-r from-slate-900 via-gray-900 to-emerald-900 bg-clip-text text-transparent tracking-tight leading-tight">
                Our Branches
              </h2>
              <p className="text-emerald-100 text-lg font-semibold mt-2">
                Visit us across Abu Dhabi
              </p>
            </div>
          </div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
            Discover our locations across Abu Dhabi with expert service and premium products. Find the nearest branch for all your mobile and laptop needs.
          </p>
        </div>

        {/* Branches Grid - Fixed equal sizing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {branchesData.map((branch, index) => (
            <BranchCard key={index} branch={branch} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Branches;
