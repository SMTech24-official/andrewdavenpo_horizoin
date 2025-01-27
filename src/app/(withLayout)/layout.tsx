'use client'
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";


const CommonLayout = ({ children }: { children: ReactNode }) => {
    const pathName = usePathname()

    return (
        <div>
            {pathName !== "/user/login" && pathName !== "/user/signup" && pathName !== "/user/forget_password" && pathName !== "/user/forget_password/otp" && pathName !== "/user/success" && pathName !== "/orders" && pathName !== "/orders/successorder" && <Navbar />}

            <div className="text-textColor-primary">{children}</div>
            {pathName !== "/user/login" && pathName !== "/user/signup" && pathName !== "/user/forget_password" && pathName !== "/user/forget_password/otp" && pathName !== "/user/success" && pathName !== "/orders" && pathName !== "/orders/successorder" && <Footer />}
        </div>
    );
};

export default CommonLayout;