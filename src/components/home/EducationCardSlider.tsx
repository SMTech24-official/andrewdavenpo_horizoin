"use client";
import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import EducationalResourcesCard from "../shared/EducationalResourcesCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useGetAllVideoQuery } from "@/redux/api/videoApi";
 interface Video {
  id: string;
  title: string;
  ytVideoLink: string;
  thumbImage: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

function EducationCardSlider() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const { data, isLoading } = useGetAllVideoQuery(undefined)
  const videos = data?.data || []


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative my-20">
      <div className="mb-6 absolute -top-20 right-0">
        <div className="flex gap-2">
          <button
            ref={prevRef}
            className="  bg-[#404347] rounded-md text-white border p-2  shadow-md hover:bg-primary hover:text-white transition"
          >
            <FaArrowLeft />
          </button>
          <button
            ref={nextRef}
            className=" bg-[#404347] rounded-md text-white border p-2  shadow-md hover:bg-primary hover:text-white transition"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        loop={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        centeredSlides={false}
        breakpoints={{
          540: {
            slidesPerView: 1,
            spaceBetween: 10,
            centeredSlides: true,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
            centeredSlides: false,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 14,
            centeredSlides: false,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 14,
          },
        }}
        className="mySwiper"
      >
        {videos?.map((item: Video) => (
          <SwiperSlide key={item.id}>
            <EducationalResourcesCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default EducationCardSlider;

const cateGoryCards = [0, 1, 2, 3, 4, 5, 6];
