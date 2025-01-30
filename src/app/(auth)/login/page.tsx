"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import student from "@/assets/student.png";
import { useRouter } from "next/navigation";
import { useGetUserDataFromApiQuery, useLoginMutation } from "@/redux/api/authApi";
import { toast } from "react-toastify";
import setAccessToken from "@/service/actions/setAccessToken";
import { setToLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/authkey";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slice/usersSlice";
import { RootState } from "@/redux/store";

export default function LoginPage() {
  const [loginMutationFn, { isLoading, data }] = useLoginMutation();
  const { data: userDataFromApi } = useGetUserDataFromApiQuery(
    {},
    {
      skip: !data?.success,
    }
  );

  const user = useSelector((state: RootState) => state.user.user);

  console.log("userDataFromApi:", userDataFromApi);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userDataFromApi) {
      console.log("Dispatching setUser with:", userDataFromApi?.data); // Add this line
      dispatch(setUser(userDataFromApi?.data));
    }
  }, [userDataFromApi, dispatch]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempted:", formData);

    const formattedData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await loginMutationFn(formattedData).unwrap();
      console.log("Response:", response);

      if (response.success) {
        toast.success("Logged in successfully");
        setAccessToken(response.data.token);
        setToLocalStorage(authKey, response.data.token);
        // if (user) {
        //   route.push("/");
        // }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Invalid credentials");
    }
  };

  useEffect(() => {
    if (user) {
      route.push("/");
    }
  }, [route, user]);

  return (
    <div className="min-h-screen flex bg-custom-gradient">
      {/* Left Section - Image */}
      <div className="hidden md:flex md:w-1/2 relative">
        <Image src={student} alt="Person using laptop" fill className="object-cover" priority />
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full  md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Welcome To Event Horizon 👋</h1>
            <p className="mt-2 text-sm ">Please login here</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium ">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={"pybekece@mailinator.com"}
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  defaultValue={"12345678"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="h-4 w-4 focus:ring-bg_primary text-white border-gray-300 rounded "
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm ">
                  Remember Me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forget-password" className="">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium  bg-white text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
          {/* new to here signup */}
          <div className="text-center text-sm">
            <p>
              New to Event Horizon?{" "}
              <Link href="/signup" className="text-blue-500">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
