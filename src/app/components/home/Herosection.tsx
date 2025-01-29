"use client";
import Image from "next/image";
import heroImg from "@/assets/home/hero_girl.png";
import barnnerImage from "@/assets/Hero-section.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Herosection() {
  const pathname = usePathname();

  return (
    <div
      className=""
      // background image
      style={{
        backgroundImage: `url(${barnnerImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 items-center justify-between">
          {pathname === "/" ? (
            <div>
              <h2 className="font-bold text-5xl text-white leading-[62px] pb-4">
                Explore, Learn, Shop at
                <br />
                Event Horizon!
              </h2>
              <p className="text-white text-[20px]">Discover new skills and exclusive products in one place.</p>
              <div className="flex gap-6 pt-10">
                <Link
                  href={"/"}
                  className="py-[10px] border-2 hover:border-bg_primary hover:text-bg_primary px-[20px] rounded-[8px] text-white text-[18px] bg-bg_primary hover:bg-transparent transition-all"
                >
                  Explore more
                </Link>
                <Link
                  href={"/"}
                  className="py-[10px] px-[20px] rounded-[8px] text-bg_primary text-[18px] border-2  border-bg_primary bg-transparent hover:bg-bg_primary hover:text-white transition-all"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ) : pathname === "/education" ? (
            <div>
              <h2 className="font-bold text-5xl text-white leading-[62px] pb-4">Educational Resources </h2>
              <p className="text-white text-[20px]">Discover new skills and exclusive products in one place.</p>
            </div>
          ) : pathname === "/store" ? (
            <div>
              <h2 className="font-bold text-5xl text-white leading-[62px] pb-4">Our shop</h2>
              <p className="text-white text-[20px]">Find Everything You Need in One Place</p>
            </div>
          ) : (
            <div>
              <h2 className="font-bold text-5xl text-white leading-[62px] pb-4">Members Area</h2>
              <p className="text-white text-[20px]">Special Content, Special Benefits—Just for Members</p>
            </div>
          )}

          <div className="flex justify-end">
            <Image src={heroImg} width={392} height={648} alt="heroImg" />
          </div>
        </div>
      </div>
    </div>
  );
}
