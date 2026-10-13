
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import "./AboutIntro.css";

const capabilities = [
  {
    title: "Environmental Solutions",
    description:
      "Sustainable environmental solutions, waste management and responsible practices designed to protect the environment and create lasting value.",
  },
  {
    title: "Industrial Services",
    description:
      "Vessel tank cleaning, hazardous waste transportation and industrial waste handling to support safer, more efficient operations.",
  },
  {
    title: "Construction Solutions",
    description:
      "Professional construction services focused on quality workmanship, precision, safety and dependable project delivery.",
  },
  {
    title: "Technical Expertise",
    description:
      "Specialist technical knowledge and practical expertise to plan, manage and deliver complex projects effectively.",
  },
];

export default function AboutIntro() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`about-intro ${isVisible ? "is-visible" : ""}`}
    >
      {/* Decorative dots behind the image */}
      <div className="about-dots about-dots-top" aria-hidden="true">
        {Array.from({ length: 40 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      {/* Main introduction */}
      <div className="about-intro-content">
        <div className="about-intro-heading">
          <div className="about-eyebrow">
            <span className="about-eyebrow-line" />
            <span>01 / WHO WE ARE</span>
          </div>

          <h2>
            Engineering
            <br />
            solutions
            <br />
            <span>that matter.</span>
          </h2>

          <p>
            TMCH Group delivers integrated environmental, industrial and
            construction solutions designed to solve complex challenges and
            create lasting value.
          </p>
        </div>

        {/* Construction image */}
        <div className="about-intro-visual">
          <div className="about-image-wrapper">
            <img
              src="/images/aboutinfo.png"
              alt="TMCH Group construction and industrial operations"
            />
          </div>

          <div className="about-image-label">
            <span>TMCH GROUP</span>
            <span>EST. 2007</span>
          </div>
        </div>
      </div>

      {/* Four capability cards */}
      <div className="about-stats">
        {capabilities.map((item, index) => {
          const isActive = activeCard === index;

          return (
            <button
              type="button"
              key={item.title}
              className={`about-stat ${isActive ? "is-active" : ""}`}
              aria-expanded={isActive}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              onFocus={() => setActiveCard(index)}
              onBlur={() => setActiveCard(null)}
              onClick={() =>
                setActiveCard((current) =>
                  current === index ? null : index
                )
              }
            >
              <span className="about-stat-number">
                0{index + 1}
              </span>

              <ArrowUpRight
                className="about-stat-arrow"
                size={21}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <h3 className="about-stat-title">
                {item.title}
              </h3>

              <p className="about-stat-description">
                {item.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Bottom-right decorative dots */}
      <div
        className="about-dots about-dots-bottom"
        aria-hidden="true"
      >
        {Array.from({ length: 8 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
    </section>
  );
}
