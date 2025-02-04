"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FcMenu } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { MdLibraryBooks, MdBook, MdVideoLibrary, MdPeople, MdShoppingCart, MdLogout } from "react-icons/md";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { removeUser } from "@/redux/slice/usersSlice";
import { removeFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/authkey";
import { FaVideo } from "react-icons/fa6";
import { Home } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dispatech = useDispatch();

  return (
    <div className="relative  bg-[#2a2c31]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-2 right-4 lg:hidden p-2 m-3 border rounded-md focus:outline-none focus:ring"
      >
        {isOpen ? <RxCross2 /> : <FcMenu />}
      </button>

      <div
        className={`fixed flex flex-col justify-between lg:static top-0 left-0 bg-[#2a2c31] text-white p-4 transition-transform transform lg:translate-x-0 z-50 lg:w-[300px] h-screen overflow-hidden overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="mb-4 font-bold text-lg">
            <Link href={"/dashboard"}>Dashboard</Link>
          </div>

          <nav className="flex flex-col justify-between">
            <ul className="space-y-2">
              <li className="flex gap-4 justify-start items-center">
                <MdLibraryBooks size={24} />
                <Link
                  href={"/dashboard/create-book"}
                  className={`flex items-center  space-x-2 p-2 rounded hover:border-none w-full font-semibold 
                  ${pathname === "/dashboard/create-book" ? "bg-white text-black" : "border border-white text-white"}
                `}
                >
                  Create Book
                </Link>
              </li>
              <li className="flex gap-4 justify-start items-center">
                <MdBook size={24} />
                <Link
                  href={"/dashboard/all-books"}
                  className={`flex items-center  space-x-2 p-2 rounded hover:border-none w-full font-semibold 
                  ${pathname === "/dashboard/all-books" ? "bg-white text-black" : "border border-white text-white"}
                `}
                >
                  All Books
                </Link>
              </li>
              <li className="flex gap-4 justify-start items-center">
                <MdVideoLibrary size={24} />
                <Link
                  href={"/dashboard/add-video"}
                  className={`flex items-center  space-x-2 p-2 rounded hover:border-none w-full font-semibold 
                  ${pathname === "/dashboard/add-video" ? "bg-white text-black" : "border border-white text-white"}
                `}
                >
                  Add Video
                </Link>
              </li>
              <li className="flex gap-4 justify-start items-center">
                <FaVideo size={24} />
                <Link
                  href={"/dashboard/all-videos"}
                  className={`flex items-center  space-x-2 p-2 rounded hover:border-none w-full font-semibold 
                  ${pathname === "/dashboard/all-videos" ? "bg-white text-black" : "border border-white text-white"}
                `}
                >
                  All Videos
                </Link>
              </li>
              <li className="flex gap-4 justify-start items-center">
                <MdPeople size={24} />
                <Link
                  href={"/dashboard/all-users"}
                  className={`flex items-center  space-x-2 p-2 rounded hover:border-none w-full font-semibold 
                  ${pathname === "/dashboard/all-users" ? "bg-white text-black" : "border border-white text-white"}
                `}
                >
                  All Users
                </Link>
              </li>
              <li className="flex gap-4 justify-start items-center">
                <MdShoppingCart size={24} />
                <Link
                  href={"/dashboard/all-orders"}
                  className={`flex items-center  space-x-2 p-2 rounded hover:border-none w-full font-semibold 
                  ${pathname === "/dashboard/all-orders" ? "bg-white text-black" : "border border-white text-white"}
                `}
                >
                  All Orders
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 justify-start items-center">
            <Home size={24} />
            <Button
              onClick={() => {
                // dispatech(removeUser());
                // removeFromLocalStorage(authKey);
                window.location.href = "/";
              }}
              variant={"ghost"}
              className={`flex items-center  border space-x-2 p-2 rounded hover:bg-gray-700 hover:text-white hover:border-none w-full font-semibold`}
            >
              Go Home
            </Button>
          </div>
          <div className="flex gap-4 justify-start items-center">
            <MdLogout size={24} />
            <Button
              onClick={() => {
                dispatech(removeUser());
                removeFromLocalStorage(authKey);
                window.location.href = "/login";
              }}
              variant={"destructive"}
              className={`flex items-center  space-x-2 p-2 rounded hover:bg-gray-700 hover:text-white hover:border-none w-full font-semibold 
                  ${pathname === "/dashboard/logout" ? "bg-white text-primary" : "border border-white text-white"}
                `}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {isOpen && <div className="fixed inset-0 bg-black opacity-50 lg:hidden" onClick={() => setIsOpen(false)}></div>}
    </div>
  );
};

export default Sidebar;
