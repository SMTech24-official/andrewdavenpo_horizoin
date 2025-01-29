"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import student from '@/assets/student.png'

export default function LoginPage() {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        rememberMe: false,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle login logic here
        console.log("Login attempted:", formData)
    }

    return (
        <div className="min-h-screen flex">
            {/* Left Section - Image */}
            <div className="hidden md:flex md:w-1/2 relative">
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
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-gray-900">Create New Account</h1>
                        <p className="mt-2 text-sm text-bg_primary">Please enter details</p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="fname" className="block text-sm font-medium text-[#333333]">
                                    firstName
                                </label>
                                <input
                                    id="fname"
                                    name="fname"
                                    type="text"
                                    required
                                    value={formData.fname}
                                    onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="kristin.watson@example.com"
                                />
                            </div>
                     
                            <div>
                                <label htmlFor="lname" className="block text-sm font-medium text-[#333333]">
                                    Last Name
                                </label>
                                <input
                                    id="lname"
                                    name="lname"
                                    type="text"
                                    // autoComplete="email"
                                    required
                                    value={formData.lname}
                                    onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="kristin.watson@example.com"
                                />
                            </div>
                     
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

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-[#333333]">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                   I agree to the
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link href="/forgot-password" className="text-gray-600 hover:text-gray-900">
                                    Terms & Condition
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

