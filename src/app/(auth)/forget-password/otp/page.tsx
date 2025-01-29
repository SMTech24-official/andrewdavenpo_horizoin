"use client";

import { useState, useRef, type KeyboardEvent, type ChangeEvent } from "react";
import Image from "next/image";
import student from "@/assets/student.png";
import { useRouter } from "next/navigation";

import Link from "next/link";

export default function OTPVerification() {
  const [otp, setOtp] = useState<string[]>(Array(5).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: ChangeEvent<HTMLInputElement>, index: number) => {
    if (isNaN(Number(element.target.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.target.value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (element.target.value !== "" && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const route = useRouter();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join("");
    console.log("Verifying OTP:", otpValue);
    route.push("/user/success");

    // Add your verification logic here
  };

  return (
    <div className="min-h-screen flex bg-custom-gradient">
      {/* Left Section - Image */}
      <div className="hidden md:flex md:w-1/2 relative ">
        <Image src={student} alt="Person using laptop" fill className="object-cover" priority />
      </div>

      {/* Right Section - OTP Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-6">
            <Link href="/forget-password" className="inline-flex items-center text-sm  ">
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

            <div>
              <h1 className="text-2xl font-semibold ">Enter OTP</h1>
              <p className="mt-2 text-sm ">
                We have share a code of your registered email address
                <br />
                <span className="">kristin.watson@example.com</span>
              </p>
            </div>

            <div className="flex gap-4 justify-center text-black">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-xl font-semibold border  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-label={`Digit ${index + 1} of OTP`}
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-white text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
