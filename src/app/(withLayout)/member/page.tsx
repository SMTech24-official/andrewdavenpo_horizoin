"use client";

import { useEffect, useState } from "react";
import Herosection from "@/components/home/Herosection";
// import Subscribe from "@/components/home/Subscribe";
import EducationalResourcesCard from "@/components/shared/EducationalResourcesCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useGetAllVideoQuery } from "@/redux/api/videoApi";
import heroSectionImage from "@/assets/young-people-celebrating-youth-day (1) 1.png";
import { getUserInfo } from "@/utils/getUserInfo";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
interface Video {
  id: string;
  title: string;
  ytVideoLink: string;
  thumbImage: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
export default function MembersPage() {
  const { data, isLoading, error } = useGetAllVideoQuery(undefined);

  const router = useRouter();

  const user = getUserInfo();

  const videos = data?.data || [];
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(videos.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVideos = videos.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      toast.error("You need to login first");
    }
  }, [router, user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong..</div>;

  return (
    <div>
      <Herosection
        heroImg={heroSectionImage.src}
        heading="Member Area"
        subHeading="Only for our special member"
        overlay={true}
      />

      <div className="container mx-auto pt-[40px] pb-[50px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentVideos?.map((item: Video) => (
            <EducationalResourcesCard item={item} key={item.id} />
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

      {/* <Subscribe /> */}
    </div>
  );
}
