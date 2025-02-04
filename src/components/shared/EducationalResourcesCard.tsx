import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { RootState } from "@/redux/store";

import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

interface Video {
  id: string;
  title: string;
  ytVideoLink: string;
  thumbImage: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
}

export default function EducationalResourcesCard({ item }: { item: Video }) {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <Card className="w-full border-0 h-fit bg-[#25272b] overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl flex flex-col">
      <div className="relative">
        <Image
          height={200}
          width={200}
          src={item.thumbImage}
          alt={item.title}
          className="w-full h-[278px] object-cover"
        />
        {/* <div className="absolute inset-0 bg-black/60" /> */}
      </div>
      <CardContent className="p-4 flex flex-col gap-4">
        <h3 className="text-white  text-[20px] font-bold leading-none">
          {item.title?.length > 40 ? item.title.slice(0, 40) + "..." : item.title}
        </h3>
        <p className="text-white font-inter text-sm font-normal leading-[22px]">
          {(item.description ?? "").length > 100
            ? (item.description ?? "").slice(0, 100) + "..."
            : item.description ??
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. exercitation "}
        </p>
      </CardContent>
      {/* card Footer */}
      <CardFooter className="pl-4">
        <Link href={user ? item.ytVideoLink : "/login"} target={user ? "_blank" : "_self"}>
          <Button variant="secondary" className="inline-flex py-2.5 px-5 justify-center items-center gap-2.5">
            {/* <Play className="w-4 h-4 mr-2" /> */}
            {user ? "Watch now" : "Login to Watch"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
