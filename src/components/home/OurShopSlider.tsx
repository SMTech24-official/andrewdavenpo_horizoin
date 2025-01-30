"use client";
import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import books from "@/assets/home/book.png";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Link from "next/link";
import { useGetAllBooksQuery } from "@/redux/api/bookApi";

interface IBook {
  id: string;
  name: string;
  price: number;
  discountPercent: number;
  discountPrice: number;
  thumbImage: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

function OurShopSlider() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const { data, isLoading } = useGetAllBooksQuery(undefined);
  const books = data?.data || [];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  if (isLoading) {
    return <p>Loading...</p>;
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
        {books?.map((book: IBook) => (
          <SwiperSlide key={book?.id}>
            <div key={book.id} className="">
              <div className="bg-[#3f4145] p-3 rounded-lg shadow-lg overflow-hidden">
                <div className="relative pb-[56.25%]">
                  <Image
                    height={100}
                    width={100}
                    src={book.thumbImage}
                    alt={book.name}
                    className="absolute top-0 rounded-lg left-0 w-full h-full object-cover"
                  />
                  <div className="w-[50px] h-[50px] p-2 rounded-full z-[1000] absolute top-8 cursor-pointer right-2 transform -translate-y-1/2 bg-[#535252fc] hover:bg-[#434141fc] flex items-center justify-center">
                    <HiOutlineShoppingCart className="text-white text-[24px]" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold  mb-4 line-clamp-2">{book.name}</h3>

                  <div className="flex gap-4 py-[20px] items-center">
                    <h2 className=" text-[20px]">$ {book.discountPrice}</h2>
                    <h2 className="text-[18px] ">
                      <del>${book.price}</del>
                    </h2>
                  </div>

                  <Link
                    href={`/productDetails/${book.id}`}
                    className="bg-white text-black py-3 px-6 w-full block text-center rounded-md transition-colors duration-200"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default OurShopSlider;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cateGoryCards = [
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
  {
    id: 5,
    title: "English Textbook for Class 12",
    discountPrice: "170",
    OldPrice: "200",
    image: books,
  },
  {
    id: 6,
    title: "English Textbook for Class 12",
    discountPrice: "170",
    OldPrice: "200",
    image: books,
  },
];
