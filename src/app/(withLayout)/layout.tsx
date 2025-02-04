import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import React, { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-rows-[1fr_auto] min-h-screen">
      {<Navbar />}
      <div className="">{children}</div>
      {<Footer />}
    </div>
  );
};

export default CommonLayout;
