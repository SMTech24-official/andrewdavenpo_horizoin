"use client";

import Image from "next/image";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

import books from "@/assets/home/book.png";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Link from "next/link";
import OurShopSlider from "./OurShopSlider";

const courses = [
  {
    id: 1,
    title: "English Textbook for Class 12",
    discountPrice: "170",
    OldPrice: "200",
    image: books,
  },
  {
    id: 2,
    title: "English Textbook for Class 12",
    discountPrice: "170",
    OldPrice: "200",
    image: books,
  },
  {
    id: 3,
    title: "English Textbook for Class 12",
    discountPrice: "170",
    OldPrice: "200",
    image: books,
  },
  {
    id: 4,
    title: "English Textbook for Class 12",
    discountPrice: "170",
    OldPrice: "200",
    image: books,
  },
];

export default function Shop() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === courses.length - 3 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? courses.length - 3 : prev - 1));
  };

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
