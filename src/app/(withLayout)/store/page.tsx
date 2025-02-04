"use client";

import Image from "next/image";
import { useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";

import Herosection from "@/components/home/Herosection";
import Subscribe from "@/components/home/Subscribe";
import { useGetAllBooksQuery } from "@/redux/api/bookApi";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import heroSectonImage from "@/assets/image 39.png";
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

export default function ShopPage() {
  const { data, isLoading } = useGetAllBooksQuery(undefined);
  const books = data?.data || [];
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(books.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selectedItems = books.slice(startIndex, startIndex + itemsPerPage);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Herosection
        heading="Our Shop"
        subHeading="Find Everything You Need in One Place"
        heroImg={heroSectonImage.src}
        overlay={true}
      />

      <div className="container mx-auto pt-[40px] pb-[50px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books?.map((book: IBook) => (
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
          ))}
        </div>
        <div className="flex justify-center gap-3 items-center mt-6">
          <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-2 py-2  rounded-full border">
            <FaArrowLeft />
          </button>

          {/* rounded page numger */}

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

      <Subscribe />
    </div>
  );
}
