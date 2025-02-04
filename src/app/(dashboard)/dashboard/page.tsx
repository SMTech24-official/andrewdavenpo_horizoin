import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { FaShop } from "react-icons/fa6";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#2b2f33] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <FaShop className="h-12 w-12 " />
          </div>
          <CardTitle className="text-2xl text-center text-black">Welcome to dashboard </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">Thank you for logging in. We&apos;re glad to have you back.</p>
          <div className="flex justify-center">
            <Link href={"/dashboard/all-appointments"}>
              <Button className="bg-gray-600 hover:bg-gray-700">
                <Calendar className="mr-2 h-4 w-4" /> Exprlore
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
