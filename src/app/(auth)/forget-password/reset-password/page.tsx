"use client";

import { useState, useRef, type KeyboardEvent, type ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import student from "@/assets/student.png";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import Link from "next/link";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { authKey } from "@/constants/authkey";
import { useDispatch } from "react-redux";
import { removeFromLocalStorage } from "@/utils/local-storage";
import { removeUser } from "@/redux/slice/usersSlice";

export default function ResetPassword({ params }: { params: any }) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [resetPassword, { isLoading }] = useResetPasswordMutation()
  const router = useRouter()
  const handleLogout = () => {
    removeFromLocalStorage(authKey);
    dispatch(removeUser());
  };

  // Extract the token query param
  const searchParams = useSearchParams();
  const token = searchParams.get('token') as string;
  useEffect(() => {
    if (token) {
      localStorage.setItem(authKey, token);
    }
  }, [params?.token]);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('The passwords do not match. Please ensure both fields contain the same password.');
      return;
    }

    try {
      const res = await resetPassword({ password: password }).unwrap();
      if (res?.success) {
        handleLogout()
        toast.success('Your password has been reset successfully.');
        router.push("/login");
      }
      // router.push("/user/success"); // Uncomment if needed
    } catch (error) {
      toast.error('An error occurred while resetting your password. Please try again.');
      console.error('Password reset error:', error);
    }
  };

  return (
    <div className="min-h-screen flex bg-custom-gradient">
      {/* Left Section - Image */}
      <div className="hidden md:flex md:w-1/2 relative ">
        <Image src={student} alt="Person using laptop" fill className="object-cover" priority />
      </div>

      {/* Right Section - OTP Form */}
      <div className="w-full md:w-1/2 flex items-center  p-8">

        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div>
            <Link href="/login" className="inline-flex items-center text-sm text-white hover:text-gray-200">
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
            <h1 className="text-2xl font-semibold text-white">Reset Password</h1>
            <p className="mt-2 text-sm text-gray-200">Please enter your new password below</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              New Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                required
                className="w-full pr-10 bg-white text-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white">
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                className="w-full pr-10 bg-white text-black"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full bg-white text-blue-600 hover:bg-gray-100">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}
