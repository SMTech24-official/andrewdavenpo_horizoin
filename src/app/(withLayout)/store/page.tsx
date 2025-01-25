'use client'

import Image from "next/image";
import { HiOutlineShoppingCart } from "react-icons/hi";
import books from '@/assets/home/book.png'
import { useState } from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import Herosection from "@/app/components/home/Herosection";
import Subscribe from "@/app/components/home/Subscribe";


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

]


const itemperPage = 3
const totalPage = Math.ceil(courses.length / itemperPage)

export default function Page() {



    const [currentPage, setCurrentPage] = useState(1)

    const indexLastCourse = currentPage * itemperPage
    const indexFirstCourse = indexLastCourse - itemperPage
    const currentcourse = courses.slice(indexFirstCourse, indexLastCourse)


    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    const handleprevpage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage((prev) => prev + 1)
        }
    }

    return (
        <div>
            <Herosection />


            <div className="container mx-auto pt-[40px] pb-[50px]">
                <div className="grid lg:grid-cols-3 gap-[24px] gap-y-[40px]" >
                    {currentcourse.map((course) => (
                        <div key={course.id} className="flex-none px-2">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="relative pb-[56.25%]">
                                    <Image
                                        src={course.image}
                                        alt={course.title}
                                        className="absolute top-0 left-0 w-full h-full object-cover"
                                    />
                                    <div className="w-[50px] h-[50px] p-2 rounded-full z-[1000] absolute top-8 cursor-pointer right-2 transform -translate-y-1/2 bg-[#535252fc] hover:bg-[#434141fc] flex items-center justify-center">
                                        <HiOutlineShoppingCart className="text-white text-[24px]" />
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-[#807D7D] mb-4 line-clamp-2">{course.title}</h3>

                                    <div className="flex gap-4 py-[20px] items-center">
                                        <h2 className="text-black text-[20px]">$ {course.discountPrice}</h2>
                                        <h2 className="text-[18px] text-[#807D7D]"><del>${course.OldPrice}</del></h2>
                                    </div>


                                    <button className="w-full bg-bg_primary hover:bg-gray-700 text-white py-3 px-6 rounded-md transition-colors duration-200">
                                        Watch now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center items-center gap-2 mt-8">
                <button
                    onClick={handleprevpage}
                    className="w-[40px] h-[40px] flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-200 cursor-pointer transition-colors"
                    disabled={currentPage === 1}
                >
                    <IoMdArrowBack className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPage }).map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`w-[40px] h-[40px] flex items-center justify-center rounded-full transition-colors
                                        ${currentPage === index + 1
                                ? "bg-[#333333] text-white"
                                : "border border-gray-300 hover:bg-gray-50"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}


                <button
                    onClick={handleNextPage}
                    className="w-[40px] h-[40px] flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-200 cursor-pointer transition-colors"
                    disabled={currentPage === totalPage}
                >
                    <IoMdArrowForward className="w-5 h-5" />
                </button>
            </div>


            <Subscribe />
        </div>
    );
}