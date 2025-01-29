"use client";

import marketing from "@/assets/home/marketing.png";
import Image from "next/image";
import { IoMdArrowForward } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";

import { useState } from "react";
import Herosection from "@/components/home/Herosection";
import Subscribe from "@/components/home/Subscribe";

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

const itemperPage = 3;
const totalPage = Math.ceil(courses.length / itemperPage);

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);

  const indexLastCourse = currentPage * itemperPage;
  const indexFirstCourse = indexLastCourse - itemperPage;
  const currentcourse = courses.slice(indexFirstCourse, indexLastCourse);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleprevpage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  return (
    <div>
      <Herosection />

      <div className="container mx-auto pt-[40px] pb-[50px]">
        <div className="grid lg:grid-cols-3 gap-[24px] gap-y-[40px]">
          {currentcourse.map((course) => (
            <div key={course.id} className="flex-none w-full   px-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative pb-[56.25%]">
                  <Image
                    src={course.image}
                    alt={course.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#807D7D] mb-4 line-clamp-2">{course.title}</h3>
                  <button className="w-full bg-bg_primary hover:bg-gray-700 text-white py-3 px-6 rounded-md transition-colors duration-200">
                    Watch now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={handleprevpage}
          className="w-[40px] h-[40px] flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-200 cursor-pointer transition-colors"
          disabled={currentPage === 1}
        >
          <IoMdArrowBack className="w-5 h-5" />
        </button>

        {Array.from({ length: totalPage }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`w-[40px] h-[40px] flex items-center justify-center rounded-full transition-colors
                            ${
                              currentPage === index + 1
                                ? "bg-[#333333] text-white"
                                : "border border-gray-300 hover:bg-gray-50"
                            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          className="w-[40px] h-[40px] flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-200 cursor-pointer transition-colors"
          disabled={currentPage === totalPage}
        >
          <IoMdArrowForward className="w-5 h-5" />
        </button>
      </div>

      <Subscribe />
    </div>
  );
}
