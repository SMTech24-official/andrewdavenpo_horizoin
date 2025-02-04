"use client";
import books from "@/assets/home/book.png";

import { useGetAllBooksQuery } from "@/redux/api/bookApi";
import Image from "next/image";
import Link from "next/link";

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
  const { data, isLoading } = useGetAllBooksQuery(undefined);
  const books = data?.data || [];

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="relative my-20">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {books?.slice(0, 3)?.map((book: IBook) => (
          <div key={book?.id}>
            <div key={book.id} className="">
              <div className="bg-[#25272b] shadow-md rounded-lg overflow-hidden">
                <div className="relative pb-[56.25%]">
                  <Image
                    height={100}
                    width={100}
                    src={book.thumbImage}
                    alt={book.name}
                    className="absolute top-0 rounded-lg left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold line-clamp-2">{book.name}</h3>

                  <div className="flex gap-4 py-[20px] items-center">
                    <h2 className=" text-[20px]">$ {book.discountPrice}</h2>
                    <h2 className="text-[18px] ">
                      <del>${book.price}</del>
                    </h2>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`#`}
                      className="rounded-[4px] bg-white/20 inline-flex py-[9px] px-[37px] justify-center items-center"
                    >
                      Add to Cart
                    </Link>
                    <Link
                      href={`/productDetails/${book.id}`}
                      className="rounded-[4px] bg-white inline-flex py-[9px] px-[46px] justify-center items-center text-black"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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
