"use client";

import Image from "next/image";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

import marketing from "@/assets/home/marketing.png";
import { IoIosArrowBack } from "react-icons/io";

const courses = [
  {
    id: 1,
    title: "The Complete digital marketing course 12 in 1",
    image: marketing,
  },
  {
    id: 2,
    title: "The Complete digital marketing course 12 in 1",
    image: marketing,
  },
  {
    id: 3,
    title: "The Complete digital marketing course 12 in 1",
    image: marketing,
  },
  {
    id: 4,
    title: "The Complete digital marketing course 12 in 1",
    image: marketing,
  },
];

export default function Education() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === courses.length - 3 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? courses.length - 3 : prev - 1));
  };

  return (
    <div className="  mx-auto py-[80px] sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-[38px] font-bold  mb-2">Educational Resources</h1>
          <p className="text-lg ">Explore the Most Popular Courses on YouTube and Start Learning Today!</p>
        </div>

        <div className="relative overflow-hidden px-10">
          {/* Previous Button */}
          <div
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous slide"
          >
            <IoIosArrowBack />
          </div>

          {/* Slider Container */}
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / 3)}%)`,
            }}
          >
            {courses.map((course) => (
              <div key={course.id} className="flex-none w-full md:w-1/2 p-2 bg-[#464646] lg:w-1/3 px-2">
                <div className="e rounded-lg shadow-lg overflow-hidden">
                  <div className="relative pb-[56.25%]">
                    <Image
                      src={course.image}
                      alt={course.title}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold  mb-4 line-clamp-2">{course.title}</h3>
                    <button className="w-full bg-bg_primary hover:bg-gray-700 text-white py-3 px-6 rounded-md transition-colors duration-200">
                      Watch now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <div
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next slide"
          >
            <IoIosArrowForward />
          </div>
        </div>
      </div>
    </div>
  );
}
