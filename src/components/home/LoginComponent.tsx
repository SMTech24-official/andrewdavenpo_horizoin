"use client";

import bigLogo from "@/assets/image 38.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetUserDataFromApiQuery, useLoginMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/slice/usersSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/router";
import { authKey } from "@/constants/authkey";
import setAccessToken from "@/service/actions/setAccessToken";
import { getUserInfo } from "@/utils/getUserInfo";
import { setToLocalStorage } from "@/utils/local-storage";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { RootState } from "@/redux/store";

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

  const [loginMutationFn, { isLoading: isLoginLoading, data }] = useLoginMutation();
  const { data: userDataFromApi } = useGetUserDataFromApiQuery(
    {},
    {
      skip: !data?.success,
    }
  );

  const user = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userDataFromApi) {
      dispatch(setUser(userDataFromApi?.data));
    }
  }, [userDataFromApi, dispatch]);

  const route = useRouter();

  const onSubmit = async (formData: FormData) => {
    if (user) {
      toast.error("You are already logged in");
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginMutationFn(formData).unwrap();

      if (response.success) {
        toast.success("Logged in successfully");
        await setAccessToken(response.data.token);
        setToLocalStorage(authKey, response.data.token);

        const userFormToken = getUserInfo();
        if (userFormToken?.role === "SUPER_ADMIN" || userFormToken?.role === "ADMIN") {
          route.push("/dashboard");
        } else {
          route.push("/");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     const userFormToken = getUserInfo();
  //     if (userFormToken?.role === "SUPER_ADMIN") {
  //       route.push("/dashboard");
  //     } else {
  //       route.push("/");
  //     }
  //   }
  // }, [user]);

  return (
    <div className="min-h-[437px] py-40 bg-[#17191e] flex items-center justify-center p-4">
      <div className="w-full container p-10 grid md:grid-cols-2 lg:gap-20 gap-10 items-center justify-center bg-[#2e3034] rounded-lg">
        <div className="flex justify-center md:justify-start">
          <Image
            src={bigLogo.src}
            alt="Event Horizon Logo"
            width={1000}
            height={1000}
            className="object-contain h-full w-full"
          />
        </div>

        <div className="space-y-6 bg-[#424448] p-5 rounded-md">
          <div className="space-y-2">
            <h2 className="text-2xl text-white font-medium">Subscribe / Longevity</h2>
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
              {isLoading || isLoginLoading ? "Loading..." : "LOGIN"}
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
