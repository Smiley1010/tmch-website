
import { useEffect, useRef } from "react";
import "./Team.css";

const leaders = [
  {
    name: "Rashid Amao",
    role: "Chairman",
    image: "/images/team1.png",
    alt: "Rashid Amao, Chairman of TMCH Group Limited",
  },
  {
    name: "Musa Asaka Yusuf",
    role: "Managing Director",
    image: "/images/MUSA-YUSUF-ASAKA-MANAGING-DIRECTOR.jpeg",
    alt: "Musa Asaka Yusuf, Managing Director of TMCH Group Limited",
  },
  {
    name: "Chibuike David Oparaji",
    role: "Deputy Managing Director",
    image: "/images/CHIBUIKE-OPARAJI-DEPUTY-MANAGING-DIRECTOR.jpeg",
    alt: "Chibuike David Oparaji, Deputy Managing Director of TMCH Group Limited",
  },
];

export default function Team() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll(".team-reveal");

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach((element) =>
        element.classList.add("is-visible")
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="team-section" id="team" ref={sectionRef}>
      <div className="team-container">
        <div className="team-header team-reveal">
          <div className="team-heading">
            <div className="team-eyebrow">
              <span className="team-eyebrow-dot" />
              <span>OUR PEOPLE / LEADERSHIP</span>
            </div>

            <h2>
              The people behind the{" "}
              <span>progress.</span>
            </h2>
          </div>

          <div className="team-intro">
            <p>
              Strong leadership. Specialized expertise. A shared
              commitment to delivering reliable environmental,
              industrial and construction solutions.
            </p>

            <a href="/about" className="team-link">
              <span>Meet the wider team</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M7 17 17 7M8 7h9v9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="team-grid">
          {leaders.map((leader, index) => (
            <article
              className="team-card team-reveal"
              key={leader.name}
              style={{ "--reveal-delay": `${index * 140}ms` }}
            >
              <div className="team-image-wrapper">
                <img
                  className="team-image"
                  src={leader.image}
                  alt={leader.alt}
                  loading="lazy"
                />
              </div>

              <div className="team-card-details">
                <div className="team-card-text">
                  <h3>{leader.name}</h3>
                  <p>{leader.role}</p>
                </div>

                <span
                  className="team-card-accent"
                  aria-hidden="true"
                />
              </div>
            </article>
          ))}
        </div>

        <div className="team-footer team-reveal">
          <p>Different perspectives. One shared direction.</p>

          <a href="/about" className="team-footer-link">
            <span>Explore TMCH</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7 17 17 7M8 7h9v9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
