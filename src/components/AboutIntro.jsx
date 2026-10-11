
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./AboutIntro.css";

const capabilities = [
  {
    number: "01",
    title: "Environmental Solutions",
    description:
      "Environmental compliance monitoring, waste management, soil remediation and oil-spill clean-up to help protect ecosystems and meet environmental requirements.",
  },
  {
    number: "02",
    title: "Industrial Services",
    description:
      "Vessel tank cleaning, hazardous waste transportation and industrial waste handling to support safer, more efficient operations.",
  },
  {
    number: "03",
    title: "Construction Solutions",
    description:
      "Civil construction and infrastructure development services supporting the delivery of functional, durable industrial and commercial facilities.",
  },
  {
    number: "04",
    title: "Technical Expertise",
    description:
      "Laboratory testing, environmental assessments, sampling and technical support to help organisations make informed operational decisions.",
  },
];

function AboutIntro() {
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);

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
      { threshold: 0.15 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="about-intro"
      id="about"
      ref={sectionRef}
    >
      <div className="about-dots about-dots-top about-reveal">
        {Array.from({ length: 64 }).map((_, index) => (
          <span key={index}></span>
        ))}
      </div>

      <div className="about-dots about-dots-bottom about-reveal">
        {Array.from({ length: 64 }).map((_, index) => (
          <span key={index}></span>
        ))}
      </div>

      <div className="about-container">
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

        <div className="about-visual about-reveal">
          <div className="about-image-wrapper">
            <img
              src="/images/aboutinfo.png"
              alt="TMCH Group personnel carrying out industrial operations"
            />
            <div className="about-image-overlay"></div>
          </div>

          <div className="about-image-label">
            <span>TMCH GROUP</span>
            <span>EST. 2007</span>
          </div>
        </div>
      </div>

      <div className="about-stats about-reveal">
        {capabilities.map((capability, index) => (
          <button
            type="button"
            className={`about-stat ${
              activeCard === index ? "is-active" : ""
            }`}
            key={capability.number}
            aria-expanded={activeCard === index}
            onClick={() =>
              setActiveCard((current) =>
                current === index ? null : index
              )
            }
          >
            <span className="about-stat-number">
              {capability.number}
            </span>

            <span className="about-stat-title">
              {capability.title}
            </span>

            <span className="about-stat-description">
              {capability.description}
            </span>

            <span className="about-stat-arrow" aria-hidden="true">
              <ArrowUpRight size={18} />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default AboutIntro;
