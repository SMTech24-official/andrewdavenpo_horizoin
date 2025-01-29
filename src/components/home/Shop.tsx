"use client";

import OurShopSlider from "./OurShopSlider";

export default function Shop() {
  return (
    <div className=" bg-white mx-auto px-4 py-[80px] sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-[38px] font-bold text-gray-900 mb-2">Our Shop</h1>
          <p className="text-lg text-[#807D7D]">Find Everything You Need in One Place</p>
        </div>

        <div>
          <OurShopSlider />
        </div>
      </div>
    </div>
  );
}
