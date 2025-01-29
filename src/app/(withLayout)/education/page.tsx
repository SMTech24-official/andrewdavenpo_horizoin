"use client";

import Herosection from "@/components/home/Herosection";
import Subscribe from "@/components/home/Subscribe";
import EducationCardSlider from "@/components/home/EducationCardSlider";

export default function Page() {
  return (
    <div>
      <Herosection />

      <div className="container mx-auto pt-[40px] pb-[50px]">
        <div className="">
          <EducationCardSlider />
        </div>
      </div>

      <Subscribe />
    </div>
  );
}
