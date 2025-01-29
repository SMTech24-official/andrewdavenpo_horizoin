"use client"

import Image from "next/image"
import Link from "next/link"
import blurStudent   from "@/assets/blurstudent.png"
import successLogo from '@/assets/successLogo.png'


export default function PasswordSuccess() {
    return (
        <div className="h-[100vh] relative flex items-center justify-center">
            {/* Background Image with Blur */}
            <div className="fixed inset-0">
                <Image
                    src={blurStudent}
                    alt="Background"
                    fill
                    className="object-cover blur-sm"
                    priority
                />
            </div>

            {/* Success Modal */}
            <div className="relative z-10 bg-white rounded-2xl shadow-xl p-8 mx-4 w-full max-w-sm">
                <div className="flex flex-col items-center text-center">
                    <Image src={successLogo} width={108} height={108} alt="lgo" />

                    <h1 className="text-xl font-semibold text-gray-900 mb-2">Password Changed Successfully</h1>

                    <p className="text-gray-600 mb-6">Your password has been updated successfully</p>

                    <Link
                        href="/user/login"
                        className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 text-center"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

