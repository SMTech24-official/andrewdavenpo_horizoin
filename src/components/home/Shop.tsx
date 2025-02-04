"use client";

import OurShopSlider from "./OurShopSlider";

export default function Shop() {
  return (
    <div className=" bg-[#17191e] mx-auto px-4 pt-[80px] pb-10 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-[38px] font-bold mb-2">Our Shop</h1>
          <p className="text-lg ">Find Everything You Need in One Place</p>
        </div>

        <div>
          <OurShopSlider />
        </div>
      </div>
    </div>
  );
}
