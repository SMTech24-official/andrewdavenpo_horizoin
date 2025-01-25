import Image from 'next/image';
import React from 'react';
import logo from '@/assets/logo.png'
import Link from 'next/link';
import { LuSearch } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";



export default function Navbar() {
    return (
        <div className="shadow-md">
            <div className="container mx-auto py-[20px]">
                <div className="grid lg:grid-cols-3  justify-between items-center">
                    <Link href={'/'} className='cursor-pointer'>
                        <Image src={logo} width={206} height={30} className='w-[206px] ' alt='logo' />
                    </Link>
                    <div>
                        <ul className='text-bg_primary text-[18px] flex justify-between'>
                            <li className='cursor-pointer font-[500]'><Link href={'/'}>Home</Link></li>
                            <li className='cursor-pointer font-[500]'><Link href={'/'}>Education</Link></li>
                            <li className='cursor-pointer font-[500]'><Link href={'/'}>Store</Link></li>
                            <li className='cursor-pointer font-[500]'><Link href={'/'}>Member Area</Link></li>
                        </ul>
                    </div>
                    <div className='flex gap-8 items-center justify-end'>
                        <div>
                            <LuSearch className='text-bg_primary w-6 h-6 cursor-pointer' />
                        </div>
                        <div>
                            <BsCart3 className='text-bg_primary w-6 h-6 cursor-pointer' />
                        </div>
                        <Link href={'/login'} className='py-[10px] px-[20px] rounded-[8px] text-white text-[18px] bg-bg_primary hover:bg-gray-900 transition-all'>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
