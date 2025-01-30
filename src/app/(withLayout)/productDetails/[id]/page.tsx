"use client";

import { useState } from "react";
import Image from "next/image";
import orderBook from "@/assets/orderbook.png";
import { BsCart3 } from "react-icons/bs";
import Subscribe from "@/components/home/Subscribe";
import { useGetBookByIdQuery } from "@/redux/api/bookApi";
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

export default function ProductPage({ params }: { params: any }) {
  const { id } = params;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const images = Array(4).fill(orderBook);
  const originalPrice = 190.0;
  const discountedPrice = 170.0;
  const rating = 5.0;
  const reviews = 121;
  const { data, isLoading } = useGetBookByIdQuery(id)

  const book: IBook = data?.data || {};

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto mt-20 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className=" rounded-lg relative overflow-hidden">
            <Image
              src={book.thumbImage ? book.thumbImage : images[selectedImage]}
              alt={book.name}
              height={556}
              width={556}
              className=" max-w-[556px] h-auto p-8"
            />
          </div>
          {/* <div className="grid grid-cols-5 gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square rounded-lg relative overflow-hidden ${selectedImage === idx ? "ring-2 ring-black" : ""
                  }`}
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-contain p-2"
                />
              </button>
            ))}
          </div> */}
        </div>

        {/* Product Info */}
        <div className="space-y-6 pt-[30px]">
          <h1 className="text-[24px] font-semibold">English Textbook for Class 12</h1>

          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[16px] ">
              {rating} ({reviews} Reviews)
            </span>
          </div>

          <div className="flex items-baseline space-x-3">
            <span className="text-2xl font-bold">${discountedPrice.toFixed(2)}</span>
            <span className="text-lg  line-through">${originalPrice.toFixed(2)}</span>
          </div>

          <p className=" text-lg">
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.
          </p>

          <div className="flex space-x-4">
            <div className="flex items-center border rounded-md">
              <button onClick={decreaseQuantity} className="px-4 py-2 ">
                −
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                className="w-12 text-center bg-transparent border-x py-2"
              />
              <button onClick={increaseQuantity} className="px-4 py-2">
                +
              </button>
            </div>
            <button className="flex-1 bg-white text-black rounded-md px-6 py-2  transition-colors">Buy now</button>
            <button className="py-2 px-3 rounded-md bg-white text-black">
              <BsCart3 />
            </button>
          </div>
        </div>
      </div>

      <Subscribe />
    </div>
  );
}
