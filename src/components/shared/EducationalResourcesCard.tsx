import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Image from "next/image";
import cardImage from "@/assets/educatonCardImage.png";

export default function EducationalResourcesCard() {
  return (
    <Card className="w-full border-0 p-4 h-[458px] bg-[#404347] overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <Image
          height={200}
          width={200}
          src={cardImage.src}
          alt="Digital Marketing Course"
          className="w-full h-[278px] object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <CardContent className="p-4">
        <h3 className="text-white text-lg font-semibold leading-7">The Complete digital marketing course 12 in 1</h3>
      </CardContent>
      <CardFooter className="p-0">
        <Button
          variant="secondary"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          <Play className="w-4 h-4 mr-2" />
          Watch now
        </Button>
      </CardFooter>
    </Card>
  );
}
