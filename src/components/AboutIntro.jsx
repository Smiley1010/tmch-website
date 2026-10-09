import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import "./AboutIntro.css";

function AboutIntro() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const elements = section.querySelectorAll(".about-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <section
      className="about-intro"
      id="about"
      ref={sectionRef}
    >

      {/* TOP RIGHT DOT FIELD */}
      <div className="about-dots about-dots-top about-reveal">
        {Array.from({ length: 64 }).map((_, index) => (
          <span key={index}></span>
        ))}
      </div>

      {/* BOTTOM LEFT DOT FIELD */}
      <div className="about-dots about-dots-bottom about-reveal">
        {Array.from({ length: 64 }).map((_, index) => (
          <span key={index}></span>
        ))}
      </div>

      <div className="about-container">

        {/* LEFT CONTENT */}
        <div className="about-content about-reveal">

          <div className="section-label dark-label">
            <span></span>
            01 / WHO WE ARE
          </div>

          <h2>
            Engineering
            <br />
            solutions
            <br />
            <span>that matter.</span>
          </h2>

          <p>
            TMCH Group delivers integrated environmental, industrial
            and construction solutions designed to solve complex
            challenges and create lasting value.
          </p>

        </div>

        {/* RIGHT IMAGE */}
        <div className="about-visual about-reveal">

          <div className="about-image-wrapper">
            <img
              src="/images/about-2.png"
              alt="TMCH Group project"
            />

            <div className="about-image-overlay"></div>
          </div>

          <div className="about-image-label">
            <span>TMCH GROUP</span>
            <span>EST. 2007</span>
          </div>

        </div>

      </div>

      {/* STATS */}
      <div className="about-stats about-reveal">

        <div className="about-stat">
          <strong>01</strong>
          <span>
            Environmental
            <br />
            Solutions
          </span>
        </div>

        <div className="about-stat">
          <strong>02</strong>
          <span>
            Industrial
            <br />
            Services
          </span>
        </div>

        <div className="about-stat">
          <strong>03</strong>
          <span>
            Construction
            <br />
            Solutions
          </span>
        </div>

        <div className="about-stat">
          <strong>04</strong>
          <span>
            Technical
            <br />
            Expertise
          </span>
        </div>

      </div>

    </section>
  );
}

export default AboutIntro;