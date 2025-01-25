import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import React, { ReactNode } from "react";


const CommonLayout = ({ children }: { children: ReactNode }) => {

    return (
        <div>
           <Navbar/>
            <div className="text-textColor-primary">{children}</div>
            <Footer/>
        </div>
    );
};

export default CommonLayout;
