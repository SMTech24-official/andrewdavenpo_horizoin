"use client";

import EducationCardSlider from "./EducationCardSlider";

export default function Education() {
  return (
    <div className="mx-auto pt-[80px] pb-10 sm:px-6 lg:px-8 bg-[#17191e]">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-[38px] font-bold  mb-2">Educational Resources</h1>
          <p className="text-lg ">Discover new products and how they will change your health.</p>
        </div>

        <div>
          <EducationCardSlider />
        </div>
      </div>
    </div>
  );
}
