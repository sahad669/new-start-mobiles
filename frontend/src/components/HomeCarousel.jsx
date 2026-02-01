import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "/images/img-one.jpeg",
    title: "Professional CCTV Installation & Setup",
    description:
      "Secure your home or business with expertly installed CCTV cameras, DVR/NVR systems, and remote monitoring so you can watch every corner 24/7 with confidence.",
  },
  {
    id: 2,
    image: "/images/img-two.jpeg",
    title: "Smartphones, Gadgets & Accessories in One Place",
    description:
      "Discover fresh and used mobiles, smartwatches, earbuds, power banks, and premium cases—all carefully selected to keep you connected and fully equipped.",
  },
  {
    id: 3,
    image: "/images/img-three.jpeg",
    title: "Expert Laptop & PC Repair",
    description:
      "Professional diagnostics, hardware repair, and software support to keep your computers performing fast, secure, and reliable for both home and office use.",
  },
];

const HomeCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[500px] overflow-hidden">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full shrink-0 relative h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white text-center px-4">
              <h1 className="text-3xl md:text-5xl font-bold">{slide.title}</h1>
              <p className="mt-4 max-w-xl text-sm md:text-lg">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() =>
          setCurrent((current - 1 + slides.length) % slides.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 px-3 py-1 rounded"
      >
        ❮
      </button>

      <button
        onClick={() => setCurrent((current + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 px-3 py-1 rounded"
      >
        ❯
      </button>
    </div>
  );
};

export default HomeCarousel;
