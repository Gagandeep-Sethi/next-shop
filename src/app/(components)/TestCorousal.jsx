import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const TestCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    let interval;
    if (!isHovered) {
      interval = setInterval(() => {
        nextSlide();
      }, 4000);
    }

    return () => clearInterval(interval);
  }, [currentIndex, isHovered, nextSlide]);

  return (
    <div
      className="w-full h-full py-10 mx-auto relative group"
      //className="max-w-[1400px] md:h-[740px] h-[500px] w-80 md:w-[600px] py-10 m-auto relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="duration-500  w-full h-full">
        <Image
          className="duration-500 w-full h-full  rounded-xl "
          alt=""
          width={1200}
          height={740}
          src={`https://res.cloudinary.com/dyja4tbmu/${images[currentIndex]}.jpg`}
        />
      </div>
      {/* <div
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dyja4tbmu/${images[currentIndex]}.jpg)`,
        }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      ></div> */}
      {/* Left Arrow */}
      <div className="md:hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="md:hidden group-hover:block absolute top-[50%]  -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {images.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer ${
              slideIndex === currentIndex ? "text-blue-500" : "text-gray-300"
            }`}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCarousel;
