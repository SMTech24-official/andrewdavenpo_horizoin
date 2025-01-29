import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import footerImage from "@/assets/footer-bg.png";

export default function Footer() {
  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${footerImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto">
        <div className="py-[48px] text-center flex flex-col items-center">
          <Link href={"/"} className="cursor-pointer">
            <Image
              src={logo}
              width={206}
              height={30}
              className="w-[206px]"
              alt="logo"
              // make the image white
              style={{
                filter: "invert(100%)",
              }}
            />
          </Link>
          <p className="max-w-[864px]  pt-[18px] pb-[24px] text-center">
            Event Horizon offers educational resources, YouTube course links, a store, and a members-only section with
            exclusive content while collecting user data for marketing
          </p>
          <ul className=" text-[18px] flex lg:gap-[48px] gap-4 justify-center lg:flex-row flex-col">
            <li className="cursor-pointer font-[500] hover:text-[#333333]">
              <Link href={"/"}>Education</Link>
            </li>
            <li className="cursor-pointer font-[500] hover:text-[#333333]">
              <Link href={"/"}>Store</Link>
            </li>
            <li className="cursor-pointer font-[500] hover:text-[#333333]">
              <Link href={"/"}>Member Area</Link>
            </li>
            <li className="cursor-pointer font-[500] hover:text-[#333333]">
              <Link href={"/"}>Terms</Link>
            </li>
            <li className="cursor-pointer font-[500] hover:text-[#333333]">
              <Link href={"/"}>Privacy</Link>
            </li>
          </ul>
          <div className="flex gap-[12px] justify-center pt-[24px]">
            <Link href={"/"} className="p-[11px] bg-white hover:bg-slate-100 transition-all rounded-[8px]">
              <FaFacebookF className="text-bg_primary text-[20px] " />
            </Link>
            <Link href={"/"} className="p-[11px] bg-white hover:bg-slate-100 transition-all rounded-[8px]">
              <BiLogoInstagramAlt className="text-bg_primary text-[20px] " />
            </Link>
            <Link href={"/"} className="p-[11px] bg-white hover:bg-slate-100 transition-all rounded-[8px]">
              <BsTwitterX className="text-bg_primary text-[20px] " />
            </Link>
            <Link href={"/"} className="p-[11px] bg-white hover:bg-slate-100 transition-all rounded-[8px]">
              <FaLinkedinIn className="text-bg_primary text-[20px] " />
            </Link>
          </div>
        </div>
      </div>
      <p className="text-white text-center text-[17px] border-t-[1px] border-[#626C6B] py-[11px]">
        © 2025 Event Horizon. All Rights Reserved.
      </p>
    </div>
  );
}
