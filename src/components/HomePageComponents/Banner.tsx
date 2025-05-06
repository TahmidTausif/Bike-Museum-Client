import { useState, useEffect } from 'react';
// Import images (make sure they are in the right folder, e.g., src/assets)
import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

// Carousel image array
const bannerImages = [banner1, banner2, banner3];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerImages.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  // Function to go to the previous image
  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  // Function to go to the next image
  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % bannerImages.length);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[400px] lg:h-[500px] overflow-hidden">
      {/* Carousel Image */}
      <img
        src={bannerImages[current]}  // Use the current image in the array
        alt={`Banner ${current + 1}`}
        className="w-full h-full object-cover transition-all duration-1000"
      />

      <div className="absolute inset-0 bg-black/50 md:bg-gradient-to-r md:from-gray-900/30 md:via-purple-950/20 md:to-transparent z-10" />

      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-transparent text-4xl font-extrabold bg-opacity-50  rounded-full hover:bg-opacity-75 sm:text-2xl"
        aria-label="Previous"
        style={{ zIndex: 10 }} // Ensure the button is above the image
      >
        <RiArrowLeftWideLine className='text-white text-4xl font-extrabold sm:text-2xl' /> {/* Left arrow */}
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2  text-4xl font-extrabold bg-opacity-50 rounded-full hover:bg-opacity-75"
        aria-label="Next"
        style={{ zIndex: 10 }} // Ensure the button is above the image
      >
        <RiArrowRightWideLine className='text-white text-4xl font-extrabold sm:text-2xl' /> {/* Right arrow */}
      </button>

      {/* Text Overlay (optional) */}
      <div className="absolute inset-0 flex z-20 items-center justify-center">
        <div className="justify-center item-center flex flex-col md:flex-row px-4">
          <div className='md:w-1/2 pt-4 text-left justify-center md:justify-start'>
            <p className="text-white/90 text-lg md:text-xl mb-6 drop-shadow-md">
              Explore a legendary collection of classic and modern bikes.
            </p>
            <Link to="/products">
              <button className=" px-6 py-3 text-white rounded-xl shadow-xl border-2 border-white/50  bg-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-white/20  transition-colors duration-300">
                Browse Collection
              </button>
            </Link>
          </div>
          <div className='md:w-1/2 text-right'>
            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg">
              Rediscover <br/> the Ride
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
