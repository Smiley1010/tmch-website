import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import "./Services.css";

const services = [
  {
    number: "01",
    title: "Environmental\nSolutions",
    description:
      "Integrated environmental solutions focused on protecting ecosystems, managing environmental challenges and supporting sustainable operations.",
    image: "/images/services/environmental.jpg",
  },
  {
    number: "02",
    title: "Industrial\nServices",
    description:
      "Specialized industrial services supporting safe, efficient and reliable operations across complex industrial environments.",
    image: "/images/services/industrial.jpg",
  },
  {
    number: "03",
    title: "Construction\nSolutions",
    description:
      "Construction and infrastructure solutions delivered with precision, quality and a focus on long-term performance.",
    image: "/images/services/construction.jpg",
  },
  {
    number: "04",
    title: "Waste\nManagement",
    description:
      "Responsible waste management solutions helping organizations handle, process and manage waste efficiently.",
    image: "/images/services/waste.jpg",
  },
  {
    number: "05",
    title: "Technical\nServices",
    description:
      "Technical expertise and specialized support for demanding environmental, industrial and infrastructure requirements.",
    image: "/images/services/technical.jpg",
  },
  {
    number: "06",
    title: "Procurement &\nLogistics",
    description:
      "Procurement and logistics support connecting projects with the equipment, materials and resources they need.",
    image: "/images/services/logistics.jpg",
  },
];

function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const elements = section.querySelectorAll(".services-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <section
      className="services-section"
      id="services"
      ref={sectionRef}
    >
      {/* =================================
          BLUE DOT FIELD
      ================================= */}

      <div className="services-dots services-dots-top services-reveal">
        {Array.from({ length: 54 }).map((_, index) => (
          <span key={index}></span>
        ))}
      </div>

      <div className="services-dots services-dots-bottom services-reveal">
        {Array.from({ length: 42 }).map((_, index) => (
          <span key={index}></span>
        ))}
      </div>

      <div className="services-container">

        {/* =================================
            SECTION HEADER
        ================================= */}

        <div className="services-header services-reveal">
          <div className="section-label services-label">
            <span></span>
            02 / OUR SERVICES
          </div>

          <div className="services-heading">
            <h2>
              Built to solve
              <br />
              <span>complex challenges.</span>
            </h2>

            <p>
              From environmental management to industrial operations
              and construction, TMCH Group provides integrated
              solutions designed around the demands of each project.
            </p>
          </div>
        </div>

        {/* =================================
            SERVICES GRID
        ================================= */}

        <div className="services-grid">
          {services.map((service, index) => (
            <article
              className="service-card services-reveal"
              key={service.number}
              style={{
                transitionDelay: `${index * 0.08}s`,
              }}
            >
              {/* IMAGE */}

              <div className="service-image">
                <img
                  src={service.image}
                  alt={service.title.replace("\n", " ")}
                />

                <div className="service-image-overlay"></div>

                <span className="service-image-number">
                  {service.number}
                </span>

                <span className="service-image-arrow">
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.8}
                  />
                </span>
              </div>

              {/* CONTENT */}

              <div className="service-card-content">

                <div className="service-card-heading">
                  <h3>
                    {service.title.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}

                        {i !== service.title.split("\n").length - 1 && (
                          <br />
                        )}
                      </span>
                    ))}
                  </h3>
                </div>

                <p>{service.description}</p>

              </div>

              <div className="service-card-line"></div>
            </article>
          ))}
        </div>

        {/* =================================
            FOOTER CTA
        ================================= */}

        <div className="services-footer services-reveal">
          <span>
            Explore our full range of capabilities
          </span>

          <a href="/services">
            View All Services
            <ArrowUpRight
              size={17}
              strokeWidth={1.8}
            />
          </a>
        </div>

      </div>
    </section>
  );
}

export default Services;