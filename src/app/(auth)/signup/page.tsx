/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import student from "@/assets/auth.png";
import { useSignupMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [signupMutationFunction, { isLoading }] = useSignupMutation();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    aggrement: false,
  });

  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //   {
    //     "firstName": "John",
    //     "lastName": "Doe",
    //     "email": "johndsoe@example.com",
    //     "password": "hashedpassword123"
    // }
    // Handle login logic here
    console.log("Login attempted:", formData);

    const formattedData = {
      firstName: formData.fname,
      lastName: formData.lname,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await signupMutationFunction(formattedData).unwrap();
      console.log("Response:", response);

      if (response.success) {
        // Redirect user to login page
        route.push("/login");
        toast.success("User Registered successfully!");
      }
    } catch (error: any) {
      console.error("Error:", error.data.message);
      toast.error(error.data.message);
    }
  };

  return (
    <div className="min-h-screen container flex ">
      {/* Left Section - Image */}
      <div className="hidden md:flex h-[552] w-[671]">
        <Image src={student} alt="Person using laptop" width={1000} height={1000} />
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full   flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Create New Account</h1>
            <p className="mt-2 text-sm ">Please enter details</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="fname" className="block text-sm font-medium ">
                  firstName
                </label>
                <input
                  id="fname"
                  name="fname"
                  type="text"
                  required={true}
                  value={formData.fname}
                  onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 
                  text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="kristin.watson@example.com"
                />
              </div>

              <div>
                <label htmlFor="lname" className="block text-sm font-medium ">
                  Last Name
                </label>
                <input
                  id="lname"
                  name="lname"
                  type="text"
                  // autoComplete="email"
                  required={true}
                  value={formData.lname}
                  onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="kristin.watson@example.com"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium ">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required={true}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="kristin.watson@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium ">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required={true}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <input
                  id="aggrement"
                  name="aggrement"
                  type="checkbox"
                  checked={formData.aggrement}
                  required={true}
                  onChange={(e) => setFormData({ ...formData, aggrement: e.target.checked })}
                  className="h-4 w-4  focus:ring-blue-500 border-gray-300 rounded text-black"
                />
                <label htmlFor="aggrement" className="ml-2 block text-sm ">
                  I agree to the
                </label>
              </div>

              <div className="text-sm">
                <Link href="#" className=" hover:">
                  Terms & Condition
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-white text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {isLoading ? "Loading..." : "Sign up"}
            </button>
          </form>
          {/* alrady have an acclunt? */}
          <div className="text-center text-sm">
            <Link href="/login" className="">
              Already have an account?<span className="text-blue-500">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
