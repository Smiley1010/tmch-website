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
  return (
    <section className="team-section" id="team">
      <div className="team-container">

        {/* Section heading */}
        <div className="team-header">
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

              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
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

        {/* Three leadership profiles */}
        <div className="team-grid">
          {leaders.map((leader) => (
            <article className="team-card" key={leader.name}>
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

                <span className="team-card-accent" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>

        {/* Bottom link */}
        <div className="team-footer">
          <p>Different perspectives. One shared direction.</p>

          <a href="/about" className="team-footer-link">
            <span>Explore TMCH</span>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
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