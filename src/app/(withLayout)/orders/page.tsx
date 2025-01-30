"use client"

import { useCreateOrderMutation } from "@/redux/api/orderApi";
import { clearCart } from "@/redux/slice/cartSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
interface FormData {
    name: string
    email: string
}

export default function OrderConfirmationForm() {
    const router = useRouter()
    const [createOrder, { isLoading }] = useCreateOrderMutation()
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
    })



    const dispatch = useDispatch();
    const items = useSelector((state: RootState) => state.cart.items) || [];
    // Restructure cart items to match the desired structure
    const books = items.map((item) => ({
        bookId: item.bookId,
        quantity: item.quantity,
    }));

    const userCartData = {
        name: formData.name,
        email: formData.email,
        books,
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (items.length === 0) {
            toast.error("Your cart is empty.Please select Item")
            return;
        }

        try {

            // Make the API call to create the order
            const res = await createOrder(userCartData).unwrap();

            if (res.success) {
                // Show success toast on successful order creation
                toast.success("Order placed successfully!", {
                    position: "top-center",
                    autoClose: 3000,
                });

                dispatch(clearCart())

                // Redirect to success page
                router.push("/orders/successorder");
            } else {
                // Show error toast if order creation fails
                toast.error("Failed to place order. Please try again.", {
                    position: "top-center",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            // Handle any errors and show error toast
            toast.error("Something went wrong. Please try again later.", {
                position: "top-center",
                autoClose: 3000,
            });
            console.error(error); // Log the error for debugging
        }
    };


    return (
        <div className="min-h-screen bg-[#F3F2F2] flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <p className="text-gray-700 mb-6">
                    To confirm the order, the client must provide their name and email address. Once the details are submitted, I
                    will send an email to confirm the order.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 text-black">
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
                        disabled={isLoading}
                        type="submit"
                        className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
                    >
                        {
                            isLoading ? (
                                <span className="spinner-border spinner-border-sm mr-3"> Loading...</span>

                            ) : (
                                "Place Order"
                            )
                        }
                    </button>
                </form>

                {/* <div className="mt-6 text-center">
                    <Link href="" className="text-gray-600 hover:text-gray-800 text-sm">
                        Back to Previous page
                    </Link>
                </div> */}
            </div>
        </div>
    )
}

