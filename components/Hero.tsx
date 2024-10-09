import { HomeCarousel } from "@/components/HomeCarousel";
import { H1, H2, P } from "@/components/typography/HeadingsTypography";

function Hero() {
  return (
    <div id="home" className="grid grid-cols-2 gap-20">
      <div className="items-left flex flex-col justify-center gap-10">
        <H1 H1="Future Is With Wave" />
        <H2 H2="Innovation Meets Simplicity" />
        <P P="Discover the power of seamless technology designed to elevate your everyday experience. Wave brings you the perfect blend of creativity and functionality, helping you stay ahead in a fast-paced world." />
      </div>
      <div>
        <HomeCarousel></HomeCarousel>
      </div>
    </div>
  );
}

export default Hero;
