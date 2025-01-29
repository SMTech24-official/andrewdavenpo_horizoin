"use client";

import EducationCardSlider from "./EducationCardSlider";

export default function Education() {
  return (
    <div className="mx-auto py-[80px] sm:px-6 lg:px-8 bg-[#2b2f33]">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-[38px] font-bold  mb-2">Educational Resources</h1>
          <p className="text-lg ">Explore the Most Popular Courses on YouTube and Start Learning Today!</p>
        </div>

        <div>
          <EducationCardSlider />
        </div>
      </div>
    </div>
  );
}
