import Hero from "../components/Hero";
import AboutIntro from "../components/AboutIntro";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Team from "../components/Team";
import Testimonials from "../components/Testimonials";

function Home() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <Services />
      <Projects />
      <Testimonials />
      <Team />
    </>
  );
}

export default Home;