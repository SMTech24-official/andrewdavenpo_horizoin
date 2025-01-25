import Education from "../components/home/Education";
import Herosection from "../components/home/Herosection";
import MemberArea from "../components/home/MemberArea";
import Shop from "../components/home/Shop";
import Subscribe from "../components/home/Subscribe";
import WhoAreYou from "../components/home/WhoAreYou";

export default function Home() {
  return (
    <>
      <Herosection />
      <WhoAreYou />
      <Education />
      <Shop />
      <MemberArea />
      <Subscribe />
    </>

  );
}