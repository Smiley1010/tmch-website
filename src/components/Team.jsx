import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import "./Team.css";

const leaders = [
  {
    number: "01",
    name: "Rashid Amao",
    role: "Chairman",
    image: "/images/team/rashid-amao.jpg",
  },
  {
    number: "02",
    name: "Musa Asaka Yusuf",
    role: "Managing Director",
    image: "/images/team/musa-asaka-yusuf.jpg",
  },
  {
    number: "03",
    name: "Chibuike David Oparaji",
    role: "Deputy Managing Director",
    image: "/images/team/chibuike-oparaji.jpg",
  },
  {
    number: "04",
    name: "Sheidu Danjuma Asaka",
    role: "Head, Corporate Services",
    image: "/images/team/sheidu-asaka.jpg",
  },
];

function Team() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll(".team-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="team-section" ref={sectionRef}>
      <div className="team-container">
        <div className="team-heading team-reveal">
          <div className="team-heading-left">
            <span className="team-eyebrow">
              <span className="team-eyebrow-dot" />
              OUR PEOPLE / 05
            </span>

            <h2>
              The people
              <br />
              behind the <span>progress.</span>
            </h2>
          </div>

          <div className="team-heading-right">
            <p>
              Strong leadership. Specialized expertise. A shared commitment
              to delivering reliable environmental, industrial and
              construction solutions.
            </p>

            <a href="/team" className="team-view-all">
              Meet the wider team
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        <div className="team-grid">
          {leaders.map((leader, index) => (
            <article
              className="team-card team-reveal"
              key={leader.number}
              style={{ "--team-delay": `${index * 100}ms` }}
            >
              <div className="team-image-wrap">
                <img
                  src={leader.image}
                  alt={leader.name}
                  loading="lazy"
                />

                <span className="team-number">{leader.number}</span>

                <span className="team-image-arrow">
                  <ArrowUpRight size={20} />
                </span>
              </div>

              <div className="team-card-info">
                <div>
                  <h3>{leader.name}</h3>
                  <p>{leader.role}</p>
                </div>

                <span className="team-blue-line" />
              </div>
            </article>
          ))}
        </div>

        <div className="team-bottom team-reveal">
          <p>
            Different expertise. One shared direction.
          </p>

          <a href="/contact" aria-label="Contact TMCH Group">
            <span>Work with TMCH</span>
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Team;