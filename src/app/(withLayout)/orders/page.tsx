"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface FormData {
    name: string
    email: string
}

export default function OrderConfirmationForm() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
    })
const router = useRouter()
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Here you would typically send the data to your API
        console.log("Form submitted:", formData)
        router.push('/orders/successorder')
        // Add your API call here
    }

    return (
        <div className="min-h-screen bg-[#F3F2F2] flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <p className="text-gray-700 mb-6">
                    To confirm the order, the client must provide their name and email address. Once the details are submitted, I
                    will send an email to confirm the order.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Enter Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                            placeholder="Your Name"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Enter Your Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                            placeholder="Your Email"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
                    >
                        Send
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link href="#" className="text-gray-600 hover:text-gray-800 text-sm">
                        Back to Previous page
                    </Link>
                </div>
            </div>
        </div>
    )
}

