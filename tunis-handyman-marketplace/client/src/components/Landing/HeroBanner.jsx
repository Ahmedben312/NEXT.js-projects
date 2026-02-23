import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import AnimatedText from "../../utils/AnimatedText";

const images = [
  "/bg-herof.png",
  "/bg-hero2.png",
  "/bg-hero3.png",
  "/bg-hero5.png",
  "/bg-hero6.png",
];

const popularSearchTerms = [
  { label: "Plumbing", query: "plumbing" },
  { label: "Electrical", query: "electrical" },
  { label: "Carpentry", query: "carpentry" },
  { label: "Painting", query: "painting" },
];

const HeroBanner = () => {
  const router = useRouter();
  const [image, setImage] = useState(0);
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    const interval = setInterval(
      () => setImage(image >= 4 ? 0 : image + 1),
      4000,
    );
    return () => clearInterval(interval);
  }, [image]);

  const handleSearch = () => {
    router.push(`/search?q=${searchData}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="h-[460px] bg-slate-900 md:h-[680px] relative bg-cover overflow-hidden">
      <div className="hidden md:block absolute top-0 right-0 w-full h-full transition-opacity z-0">
        {images.map((img, index) => (
          <Image
            key={index}
            alt="hero"
            src={img}
            fill
            className={`${
              index === image ? "opacity-100" : "opacity-0"
            } transition-all duration-1000 ease-in-out object-cover`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40 z-5"></div>

      <div className="z-10 relative md:w-1/2 flex justify-center flex-col h-full gap-8 md:gap-5 md:ml-20 mx-6">
        <div>
          <p className="text-emerald-400 text-sm font-semibold mb-2">
            ✨ TRUSTED HANDYMAN SERVICES
          </p>
          <h1 className="font-macan text-white font-bold text-4xl md:text-6xl leading-snug">
            <AnimatedText
              text="Find Trusted Handyman Services in Tunis"
              className="flex flex-wrap pr-0 md:pr-20"
            />
          </h1>
          <p className="text-gray-300 text-lg mt-3 pr-4">
            Connect with verified local professionals for all your home and
            business repairs
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:align-middle gap-4 md:gap-0">
          <div className="relative">
            <IoSearchOutline className="absolute text-gray-400 text-2xl flex align-middle h-full left-2" />
            <input
              type="text"
              placeholder="Search services or professionals..."
              className="h-14 md:w-[450px] w-full pl-10 pr-5 rounded-lg md:rounded-r-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
              onChange={(e) => setSearchData(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <button
            className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 md:py-0 px-8 text-lg font-semibold rounded-lg md:rounded-l-none transition-colors duration-300"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="hidden text-gray-300 md:flex gap-4 text-sm">
          <span className="text-white font-semibold">Popular services:</span>
          <ul className="flex gap-5">
            {popularSearchTerms.map(({ label, query }) => (
              <li
                key={query}
                className="py-1 px-3 border border-gray-500 rounded-full hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300 cursor-pointer"
                onClick={() => router.push(`/search?q=${query}`)}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
