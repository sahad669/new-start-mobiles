import React, { useState } from "react";
import "flowbite";

const branchesData = [
  {
    name: "Branch 1",
    location: "7 Ath Thiqah 8 St - Musaffah-17 - Musaffah Industrial - Abu Dhabi",
    images: [
      "/images/new-star.jpg",
      "/images/newstar-two.webp",
      "/images/newstar-one.webp",
      "/images/newstar-three.webp",
      "/images/newstar-four.webp",
    ],
  },
  {
    name: "Branch 2",
    location: "Musaffah-17 - Abu Dhabi ",
    images: [
      "/images/img-one.jpeg",
      "/images/img-two.jpeg",
      "/images/img-three.jpeg",
    ],
  },
  {
    name: "Branch 3",
    location: "Western Region Beda Zayed Sanaya - Abu Dhabi ",
    images: [
      "/images/img-one.jpeg",
      "/images/img-two.jpeg",
      "/images/img-three.jpeg",
    ],
  },
];

const BranchCard = ({ branch }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div className="bg-white rounded-2xl shadow-lg p-4">
      {/* Carousel */}
      <div className="relative w-full">
        <div className="relative h-56 md:h-64 overflow-hidden rounded-xl">
          {branch.images.map((img, i) => (
            <div
              key={i}
              className={`${
                i === currentIndex ? "block" : "hidden"
              } duration-700 ease-in-out`}
            >
              <img
                src={img}
                alt={`Branch ${branch.name} ${i}`}
                className="absolute block w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </div>

        {/* Carousel controls */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute top-1/2 left-0 z-30 flex items-center justify-center h-10 w-10 -translate-y-1/2 rounded-full bg-white/70 hover:bg-white/90"
        >
          &#10094;
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="absolute top-1/2 right-0 z-30 flex items-center justify-center h-10 w-10 -translate-y-1/2 rounded-full bg-white/70 hover:bg-white/90"
        >
          &#10095;
        </button>
      </div>

      {/* Branch info */}
      <div className="mt-4 text-center">
        <h3 className="text-xl font-semibold">{branch.name}</h3>
        <p className="text-gray-500">{branch.location}</p>
      </div>
    </div>
  );
};

const Branches = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Our Branches</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {branchesData.map((branch, index) => (
          <BranchCard key={index} branch={branch} />
        ))}
      </div>
    </section>
  );
};

export default Branches;
