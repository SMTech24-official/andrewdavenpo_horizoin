'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import logo from '@/assets/logo.png';
import Link from 'next/link';
import { LuSearch } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { FiMenu, FiX } from 'react-icons/fi';
// import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        if (!isOpen) {
            setIsOpen(true);
            setTimeout(() => setShowMenu(true), 200); // Delay showing the menu for the sliding effect
        } else {
            setShowMenu(false);
            setTimeout(() => setIsOpen(false), 200); // Delay hiding the menu for the sliding effect
        }
    };



    return (
        <div className="border-b-2 shadow-md bg-[#F3F2F2]">
            <div className="container mx-auto py-[20px]">
                <div className="flex justify-between items-center">
                    <Link href={'/'} className="cursor-pointer">
                        <Image src={logo} width={206} height={30} className="w-[206px]" alt="logo" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:block">
                        <ul className="text-bg_primary text-[18px] flex justify-between gap-8">
                            <li className="cursor-pointer font-[500]"><Link href={'/'}>Home</Link></li>
                            <li className="cursor-pointer font-[500]"><Link href={'/education'}>Education</Link></li>
                            <li className="cursor-pointer font-[500]"><Link href={'/store'}>Store</Link></li>
                            <li className="cursor-pointer font-[500]"><Link href={'/member'}>Member Area</Link></li>
                        </ul>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-bg_primary text-2xl focus:outline-none">
                            {isOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>

                    {/* Icons Section */}
                    <div className="hidden lg:flex gap-8 items-center">
                        <LuSearch className="text-bg_primary w-6 h-6 cursor-pointer" />
                        <BsCart3 className="text-bg_primary w-6 h-6 cursor-pointer" />
                        <Link href={'/login'} className="py-[10px] px-[20px] rounded-[8px] text-white text-[18px] bg-bg_primary hover:bg-gray-900 transition-all">Login</Link>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div
                        className={`lg:hidden mt-4 bg-[#F3F2F2] shadow-md p-4 transition-all duration-300 ${showMenu ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}
                    >
                        <ul className="text-bg_primary text-[18px] flex flex-col gap-4">
                            <li className="cursor-pointer font-[500]"><Link href={'/'}>Home</Link></li>
                            <li className="cursor-pointer font-[500]"><Link href={'/education'}>Education</Link></li>
                            <li className="cursor-pointer font-[500]"><Link href={'/store'}>Store</Link></li>
                            <li className="cursor-pointer font-[500]"><Link href={'/member'}>Member Area</Link></li>
                            <div className="flex gap-4 mt-4">
                                <LuSearch className="text-bg_primary w-6 h-6 cursor-pointer" />
                                <BsCart3 className="text-bg_primary w-6 h-6 cursor-pointer" />
                            </div>
                            <Link href={'/login'} className="py-[10px] px-[20px] rounded-[8px] text-white text-[18px] bg-bg_primary text-center hover:bg-gray-900 transition-all">Login</Link>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}