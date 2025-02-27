"use client";
import { ReactNode, useEffect } from "react";

import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    // check for accessToken in localStorage . If not found redirect to login page
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex">
      <div className="w-fit ">
        <Sidebar />
      </div>
      <div className="p-4 w-full h-screen overflow-hidden overflow-y-auto bg-[#2b2f33] text-white ">{children}</div>
    </div>
  );
};

export default DashboardLayout;
