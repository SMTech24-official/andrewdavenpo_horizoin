/* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

import setAccessToken from "@/service/actions/setAccessToken";

import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";

export const userLogin = async (data: any) => {
  // console.log(data);
  try {
    // Fetch login API endpoint to authenticate user
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/auth/otp-enter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    console.log(res);

    const userInfo = await res.json();
    // console.log(userInfo);
    if (userInfo.data.accessToken) {
      setAccessToken(userInfo?.data?.accessToken);
    }

    return userInfo;
  } catch (error) {
    const errorMessage = (error as any)?.message || "An unexpected error occurred.";
    toast.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};
