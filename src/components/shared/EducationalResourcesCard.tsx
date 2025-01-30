import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Image from "next/image";
import cardImage from "@/assets/educatonCardImage.png";
import Link from "next/link";
import { getUserInfo } from "@/utils/getUserInfo";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface Video {
  id: string;
  title: string;
  ytVideoLink: string;
  thumbImage: string;
  createdAt: string;
  updatedAt: string;
}
export default function EducationalResourcesCard({ item }: { item: Video }) {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <Card className="w-full border-0 p-4 h-[458px] bg-[#404347] overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <Image
          height={200}
          width={200}
          src={item.thumbImage}
          alt={item.title}
          className="w-full h-[278px] object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <CardContent className="p-4">
        <h3 className="text-white text-lg font-semibold leading-7">{item.title}</h3>
      </CardContent>
      {/* card Footer */}
      <CardFooter className="p-0">
        <Link href={user ? item.ytVideoLink : "/login"} target={user ? "_blank" : "_self"}>
          <Button
            variant="secondary"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            <Play className="w-4 h-4 mr-2" />
            {user ? "Watch now" : "Login to Watch"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
