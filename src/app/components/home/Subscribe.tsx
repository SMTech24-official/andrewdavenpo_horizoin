"use client"

import { useState } from "react"
// import { Button } from "@/components/ui/button"

export default function Subscribe() {
    const [email, setEmail] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement newsletter subscription logic
        console.log("Subscribing email:", email)
        setEmail("")
    }

    return (
        <div className="container mx-auto">
            <section className="w-full  mx-auto py-[100px]">
                <div className="bg-[#F3F2F2] rounded-[20px] p-8 md:p-12">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                            Subscribe to our Newsletter for Newest Course <br /> Updates
                        </h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-2xl mx-auto p-4">
                            <div className="relative w-full">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full h-12 px-4 sm:px-8 border border-[#989898] rounded-[28px] bg-white"
                                />
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto h-12 sm:h-9 px-8 mt-3 sm:mt-0 sm:absolute sm:top-[6px] sm:right-2 rounded-[28px] text-white bg-[#333333] hover:bg-gray-800 transition-colors duration-200"
                                >
                                    Subscribe!
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}