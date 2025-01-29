import Image from "next/image";
import whoImg from "@/assets/home/study.png";
import books from "@/assets/svg/books.svg";
import store from "@/assets/svg/store.svg";
import teacher from "@/assets/svg/teacher.svg";
export default function WhoAreYou() {
  return (
    <div className="">
      <div className="container mx-auto py-[80px]">
        <div className="grid lg:grid-cols-2  grid-cols-1  justify-between items-center">
          <div className="lg:flex-none flex justify-center">
            <Image src={whoImg} width={538} height={413} alt="studying_girl" />
          </div>
          <div>
            <h2 className="font-bold text-4xl  leading-[62px] pb-2">
              Educational Resources at <br /> Your Fingertips
            </h2>
            <p className=" font-semibold text-[20px]">Who we are.</p>
            <p className=" text-[18px] pt-[14px] pb-[20px]">
              Event Horizon offers educational resources, YouTube course links, a store, and a members-only section with
              exclusive content while collecting user data for marketing
            </p>

            <div className="flex flex-col space-y-2">
              <div className="flex gap-[12px] items-center">
                <div className="bg-[#EBEBEB] rounded-full p-[9px]">
                  <Image src={teacher} alt="Books Icon" width={15} height={15} className="w-8 h-8" />
                </div>
                <p className=" text-[18px]">Learn with Experts</p>
              </div>
              <div className="flex gap-[12px] items-center">
                <div className="bg-[#EBEBEB] rounded-full p-[9px]">
                  <Image src={books} alt="Books Icon" width={15} height={15} className="w-8 h-8" />
                </div>
                <p className=" text-[18px]">Learn with Experts</p>
              </div>
              <div className="flex gap-[12px] items-center">
                <div className="bg-[#EBEBEB] rounded-full p-[9px]">
                  <Image src={store} alt="Books Icon" width={15} height={15} className="w-8 h-8" />
                </div>
                <p className=" text-[18px]">Learn with Experts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
