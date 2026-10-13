import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import "./Projects.css";

const projects = [
  {
    title: "Environmental Management",
    category: "Environmental",
    location: "Nigeria",
    year: "2026",
    image: "/images/environmental-solutions.jpg",
    size: "tall",
  },
  { 
    title: "Industrial Operations",
    category: "Industrial",
    location: "Nigeria",
    year: "2026",
    image: "/images/industrial-services.jpg",
    size: "short",
  },
  {
    title: "Infrastructure Development",
    category: "Construction",
    location: "Nigeria",
    year: "2025",
    image: "/images/infrastructure-development.jpg",
    size: "medium",
  },
  {
    title: "Technical & Engineering Services",
    category: "Technical Services",
    location: "Nigeria",
    year: "2025",
    image: "/images/technical-engineering-services.jpg",
    size: "medium",
  },
  {
    title: "Waste Management",
    category: "Environmental",
    location: "Nigeria",
    year: "2025",
    image: "/images/waste-management.jpg",
    size: "short",
  },
  {
    title: "Procurement & Logistics",
    category: "Industrial",
    location: "Nigeria",
    year: "2025",
    image: "/images/procurement-logistics.jpg",
    size: "medium",
  },
];

function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const elements = section.querySelectorAll(".projects-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.08,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <section
      className="projects-section"
      id="projects"
      ref={sectionRef}
    >
      {/* =========================================
          DOT FIELD
      ========================================= */}

      <div className="projects-dots projects-dots-top">
        {Array.from({ length: 56 }).map((_, index) => (
          <span key={index}></span>
        ))}
      </div>

      <div className="projects-dots projects-dots-bottom">
        {Array.from({ length: 40 }).map((_, index) => (
          <span key={index}></span>
        ))}
      </div>

      <div className="projects-container">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="projects-header projects-reveal">

          <div className="section-label projects-label">
            <span></span>
            03 / OUR PROJECTS
          </div>

          <div className="projects-heading">

            <h2>
              Work that
              <br />
              <span>speaks for itself.</span>
            </h2>

            <p>
              A selection of projects where our environmental,
              industrial and construction expertise comes together
              to deliver practical, lasting results.
            </p>

          </div>

        </div>


        {/* =========================================
            TRUE MASONRY
        ========================================= */}

        <div className="projects-masonry">

          {projects.map((project, index) => (
            <article
              key={project.number}
              className={`project-card ${project.size} projects-reveal`}
              style={{
                transitionDelay: `${index * 0.07}s`,
              }}
            >

              {/* IMAGE */}

              <div className="project-card-image">

                <img
                  src={project.image}
                  alt={project.title}
                />

                <div className="project-card-overlay"></div>

                <span className="project-card-number">
                  {project.number}
                </span>

                <span className="project-card-arrow">
                  <ArrowUpRight
                    size={19}
                    strokeWidth={1.8}
                  />
                </span>

              </div>


              {/* CONTENT */}

              <div className="project-card-content">

                <div className="project-meta">

                  <span>
                    {project.category}
                  </span>

                  <span>
                    {project.location}
                  </span>

                  <span>
                    {project.year}
                  </span>

                </div>

                <h3>
                  {project.title}
                </h3>

                <a href="/projects">
                  View Project
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.8}
                  />
                </a>

              </div>

            </article>
          ))}

        </div>


        {/* =========================================
            FOOTER
        ========================================= */}

        <div className="projects-footer projects-reveal">

          <span>
            Explore our completed and ongoing work
          </span>

          <a href="/projects">
            View All Projects
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

export default Projects;