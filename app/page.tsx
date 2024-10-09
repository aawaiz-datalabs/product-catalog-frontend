import Container from "@/components/container";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Range from "@/components/Range";
import ContactForm from "@/components/ContactForm";

function Home() {
  return (
    <Container>
      <Hero></Hero>
      <About></About>
      <Range></Range>
      <ContactForm></ContactForm>
    </Container>
  );
}

export default Home;
