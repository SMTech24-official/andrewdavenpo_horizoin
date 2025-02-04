import Education from "@/components/home/Education";
import Herosection from "@/components/home/Herosection";
import Shop from "@/components/home/Shop";
import Subscribe from "@/components/home/Subscribe";
import WhoAreYou from "@/components/home/WhoAreYou";
import homeHeroImage from "@/assets/image 38.png";

export default function Home() {
  return (
    <>
      <Herosection
        heading={"Start your peptide journey to better health here."}
        subHeading={""}
        actions={true}
        heroImg={homeHeroImage.src}
      />
      <WhoAreYou />
      <Education />
      <Shop />
      <Subscribe />
    </>
  );
}
