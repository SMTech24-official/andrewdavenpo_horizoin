"use client";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  heroImg: string;
  actions?: boolean;
  subHeading?: string;
  heading: string;
  overlay?: boolean;
}

export default function Herosection({ heroImg, heading, subHeading, actions, overlay }: HeroSectionProps) {
  return (
    <div className="pt-28 pb-20  bg-black">
      <div className="container relative mx-auto">
        {overlay && (
          <div // give an overlay to the image from left to right (black to transparent)
            style={{
              position: "absolute",
              zIndex: 1,
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, rgba(0, 0, 0, 0.8) 70%, rgba(0, 0, 0, 0) 90%)",
            }}
          ></div>
        )}
        <div className="grid lg:grid-cols-2 items-center justify-between">
          <div className="" style={{ zIndex: 2, position: "relative" }}>
            <h2 className="font-bold text-5xl text-white leading-[62px] pb-4">{heading}</h2>
            {subHeading && <p className="text-white text-[20px]">{subHeading}</p>}
            {actions && (
              <div className="flex gap-6 pt-10">
                <Link
                  href={"/"}
                  className="py-[10px] border-2 px-[20px] rounded-[8px] bg-white text-[18px] text-black  transition-all"
                >
                  Explore more
                </Link>
                <Link
                  href={"/"}
                  className="py-[10px] px-[20px] rounded-[8px]  text-[18px] border-2  border-white bg-transparent text-white transition-all"
                >
                  Shop Now
                </Link>
              </div>
            )}
          </div>

          <div className="flex  justify-end">
            <Image src={heroImg} width={392} height={648} alt="heroImg" className="h-full w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
