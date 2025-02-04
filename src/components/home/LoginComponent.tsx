"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import bigLogo from "@/assets/image 38.png";

interface FormData {
  email: string;
  password: string;
}

export default function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Handle form submission here
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" min-h-[437px] pb-40 bg-[#17191e] flex items-center justify-center p-4">
      <div className="w-full container p-10 grid md:grid-cols-2 gap-6 items-center justify-center bg-[#2e3034] rounded-lg">
        <div className="flex justify-center md:justify-start">
          <Image src={bigLogo.src} alt="Event Horizon Logo" width={300} height={100} className="object-contain" />
        </div>

        <div className="space-y-6 bg-[#424448] p-5 rounded-md">
          <div className="space-y-2">
            <h2 className="text-2xl text-white font-medium  ">Login to view premium videos</h2>
            {/* <p className="text-zinc-400">Reward Course Updates</p> */}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-[#424448]">
            <div className="space-y-2">
              <Input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Enter your email"
                className="rounded-[12px] border border-white flex py-[16px] px-[24px] items-center"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Password"
                className="rounded-[12px] border border-white flex py-[16px] px-[24px] items-center"
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <Button
              type="submit"
              className="rounded-[12px] text-black border border-white bg-white flex w-full py-[16px] justify-center items-center hover:bg-white hover:text-black"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "LOGIN"}
            </Button>
          </form>

          <div className="text-center">
            <span className="text-zinc-400">Don&apos;t have an account? </span>
            <Link href="/signup" className="text-purple-400 hover:text-purple-300">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
