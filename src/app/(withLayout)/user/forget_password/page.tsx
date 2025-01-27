"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import student from '@/assets/student.png'
import { useRouter } from "next/navigation"


export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    })
        const route = useRouter()
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle login logic here
        console.log("Login attempted:", formData)
        route.push('/user/forget_password/otp')

    }

    return (
        <div className="min-h-screen flex">
            {/* Left Section - Image */}
            <div className="hidden md:flex md:w-1/2 relative bg-[#B2E6F2]">
                <Image
                    src={student}
                    alt="Person using laptop"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Right Section - Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <Link href="/user/login" className="inline-flex items-center text-sm text-bg_primary hover:text-gray-900">
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </Link>

                    <div className="text-left">
                        <h1 className="text-2xl font-semibold text-gray-900">Forgot Password</h1>
                        <p className="mt-2 text-sm text-[#807D7D]">Enter your registered email address. we’ll send you a code to reset your password.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-[#333333]">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="kristin.watson@example.com"
                                />
                            </div>

                        </div>

                  

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-bg_primary hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Send Otp
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

