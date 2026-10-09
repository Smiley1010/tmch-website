import Hero from "../components/Hero";
import AboutIntro from "../components/AboutIntro";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Team from "../components/Team";

function Home() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <Services />
      <Projects />
      <Team />
    </>
  );
}

export default Home;