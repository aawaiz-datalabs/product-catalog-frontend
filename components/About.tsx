import { H1, H2, P } from "@/components/typography/HeadingsTypography";

function About() {
  return (
    <div className="flex flex-col pt-20" id="about">
      <div className="items-center justify-center text-center">
        <H1 H1="About Wave" />
      </div>
      <div
        id="about"
        className="items-left flex flex-col justify-between gap-4 pt-8"
      >
        <div>
          <H2 H2="Welcome To Wave" />
          <P P="At Wave, we believe in creating experiences that inspire and empower. Our mission is simple: to craft innovative, user-centered solutions that make life smoother, smarter, and more connected. Whether you're a creator, a thinker, or someone who values simplicity, Wave is here to help you ride the next wave of innovation." />
        </div>
        <div>
          <H2 H2="Our Vision" />
          <P P="Wave exists to bridge the gap between technology and human potential. We envision a world where technology is seamlessly integrated into our lives, elevating how we work, play, and connect." />
        </div>
        <div>
          <H2 H2="Why Wave?" />
          <P P="We stand out by blending creativity with cutting-edge technology. Our team is dedicated to pushing the boundaries of what's possible, offering products and services that are both functional and beautiful." />
        </div>
        <div>
          <H2 H2="Join The Wave?" />
          <P P="Be part of a movement that's shaping the future. Stay connected, stay innovative, and ride the wave with us." />
        </div>
      </div>
    </div>
  );
}

export default About;
