"use client";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SwiperSlide } from "swiper/react";

import { useGetAllVideoQuery } from "@/redux/api/videoApi";
import EducationalResourcesCard from "../shared/EducationalResourcesCard";
interface Video {
  id: string;
  title: string;
  ytVideoLink: string;
  thumbImage: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

function EducationCardSlider() {
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading } = useGetAllVideoQuery(undefined);
  const videos = data?.data || [];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="grid grid-cols-3 gap-10 my-20">
      {videos?.slice(0, 3)?.map((item: Video) => (
        <SwiperSlide key={item.id}>
          <EducationalResourcesCard item={item} />
        </SwiperSlide>
      ))}
    </div>
  );
}

export default EducationCardSlider;
