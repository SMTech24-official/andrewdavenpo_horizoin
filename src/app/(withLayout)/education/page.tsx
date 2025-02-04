/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Herosection from "@/components/home/Herosection";
import Subscribe from "@/components/home/Subscribe";
import EducationalResourcesCard from "@/components/shared/EducationalResourcesCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useGetAllVideoQuery } from "@/redux/api/videoApi";
import heroSectonImage from "@/assets/black-white-portrait-digital-nomads 1.png";

export default function EducationPage() {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetAllVideoQuery(undefined);
  const videos = data?.data || [];
  const totalPages = Math.ceil(videos.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVideos = videos.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Herosection
        heading="Educational Resources"
        subHeading="Explore the Most Popular Courses on YouTube and Start Learning Today!"
        heroImg={heroSectonImage.src}
        overlay={true}
      />
      <div className="container mx-auto pt-[40px] pb-[50px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentVideos?.map((item: any) => (
            <EducationalResourcesCard item={item} key={item?.id} />
          ))}
        </div>
        <div className="flex justify-center gap-3 items-center mt-6">
          <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-2 py-2  rounded-full border">
            <FaArrowLeft />
          </button>

          {/* rounded page number */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={`h-11 flex items-center border border-gray-400 justify-center w-11 rounded-full ${
                currentPage === index + 1 ? "bg-gray-300" : ""
              } rounded`}
            >
              {index + 1}
            </span>
          ))}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-2 py-2  rounded-full border"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      <Subscribe />
    </div>
  );
}
