"use client";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CartSidebar } from "../shared/CartSidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "../ui/button";
import { removeFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/authkey";
import { removeUser } from "@/redux/slice/usersSlice";
// import { FiMenu, FiX } from 'react-icons/fi';
// import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dispatch = useDispatch();

  // get user from redux store

  const user = useSelector((state: RootState) => state.user.user);

  console.log(user);

  // chnage color in scroll
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    removeFromLocalStorage(authKey);
    dispatch(removeUser());
  };

  return (
    <div className={`absolute bg-black w-full  top-0 left-0 z-50 ${scroll ? "sticky" : ""} `}>
      <div className="container mx-auto py-4 px-4 md:px-8 bg-black">
        {/* Desktop View */}
        <div className="hidden lg:flex justify-between items-center  ">
          <Link href="/">
            <Image src={logo} width={206} height={30} alt="logo" className="w-[206px] cursor-pointer" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex  text-[18px] gap-8">
            <li className="cursor-pointer font-medium">
              <Link href="/">Home</Link>
            </li>
            <li className="cursor-pointer font-medium">
              <Link href="/education">Education</Link>
            </li>
            <li className="cursor-pointer font-medium">
              <Link href="/store">Store</Link>
            </li>
            <li className="cursor-pointer font-medium">
              <Link href="/member">Subscribe / Longevity</Link>
            </li>
          </ul>

          {/* Icons and Login Button */}
          <div className="hidden lg:flex justify-center items-center gap-6">
            {/* <LuSearch className=" w-6 h-6 cursor-pointer" /> */}
            <CartSidebar />
            {user ? (
              <Button onClick={handleLogout} variant={"destructive"}>
                Logout
              </Button>
            ) : (
              <Link
                href="/login"
                className="py-2 px-6  rounded-lg text-white text-[18px] bg-bg_primary text-center hover:bg-gray-900 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex justify-between items-center  lg:hidden ">
          <Link href="/">
            <Image
              src={logo}
              width={180}
              height={25}
              alt="logo"
              className="w-[180px] cursor-pointer"
              style={{
                // make the image white
                filter: "invert(1)",
              }}
            />
          </Link>
          <button className="focus:outline-none " onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`transition-transform  bg-custom-gradient duration-300 overflow-hidden lg:hidden ${
            isMobileMenuOpen ? "mt-4" : "hidden"
          }`}
        >
          <ul className=" text-[18px] flex flex-col gap-4 p-4">
            <li className="cursor-pointer font-medium">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li className="cursor-pointer font-medium">
              <Link href="/education" onClick={() => setIsMobileMenuOpen(false)}>
                Education
              </Link>
            </li>
            <li className="cursor-pointer font-medium">
              <Link href="/store" onClick={() => setIsMobileMenuOpen(false)}>
                Store
              </Link>
            </li>
            <li className="cursor-pointer font-medium">
              <Link href="/member" onClick={() => setIsMobileMenuOpen(false)}>
                Subscribe / Longevity
              </Link>
            </li>
            <div className="flex items-center justify-center gap-4 mt-4">
              {/* <LuSearch className=" w-6 h-6 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} /> */}
              <CartSidebar />
            </div>
            {user ? (
              <Button onClick={handleLogout} variant={"destructive"}>
                Logout
              </Button>
            ) : (
              <Link
                href="/login"
                className="py-2 px-6 mt-4 rounded-lg text-white text-[18px] bg-bg_primary text-center hover:bg-gray-900 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
