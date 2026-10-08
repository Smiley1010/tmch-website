import { ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import "./Projects.css";

const projects = [
  {
    id: 1,
    title: "Project 01",
    category: "Environmental",
    location: "Nigeria",
    year: "2026",
    image: "/images/projects/project-01.jpg",
    size: "medium",
  },
  {
    id: 2,
    title: "Project 02",
    category: "Industrial",
    location: "Nigeria",
    year: "2026",
    image: "/images/projects/project-02.jpg",
    size: "short",
  },
  {
    id: 3,
    title: "Project 03",
    category: "Construction",
    location: "Nigeria",
    year: "2026",
    image: "/images/projects/project-03.jpg",
    size: "medium",
  },
  {
    id: 4,
    title: "Project 04",
    category: "Technical",
    location: "Nigeria",
    year: "2026",
    image: "/images/projects/project-04.jpg",
    size: "short",
  },
  {
    id: 5,
    title: "Project 05",
    category: "Environmental",
    location: "Nigeria",
    year: "2026",
    image: "/images/projects/project-05.jpg",
    size: "medium",
  },
  {
    id: 6,
    title: "Project 06",
    category: "Industrial",
    location: "Nigeria",
    year: "2026",
    image: "/images/projects/project-06.jpg",
    size: "short",
  },
  {
    id: 7,
    title: "Project 07",
    category: "Construction",
    location: "Nigeria",
    year: "2025",
    image: "/images/projects/project-07.jpg",
    size: "medium",
  },
  {
    id: 8,
    title: "Project 08",
    category: "Environmental",
    location: "Nigeria",
    year: "2025",
    image: "/images/projects/project-08.jpg",
    size: "short",
  },
  {
    id: 9,
    title: "Project 09",
    category: "Industrial",
    location: "Nigeria",
    year: "2025",
    image: "/images/projects/project-09.jpg",
    size: "medium",
  },
  {
    id: 10,
    title: "Project 10",
    category: "Construction",
    location: "Nigeria",
    year: "2025",
    image: "/images/projects/project-10.jpg",
    size: "short",
  },
  {
    id: 11,
    title: "Project 11",
    category: "Technical",
    location: "Nigeria",
    year: "2025",
    image: "/images/projects/project-11.jpg",
    size: "medium",
  },
  {
    id: 12,
    title: "Project 12",
    category: "Environmental",
    location: "Nigeria",
    year: "2025",
    image: "/images/projects/project-12.jpg",
    size: "short",
  },
  {
    id: 13,
    title: "Project 13",
    category: "Industrial",
    location: "Nigeria",
    year: "2025",
    image: "/images/projects/project-13.jpg",
    size: "short",
  },
  {
    id: 14,
    title: "Project 14",
    category: "Construction",
    location: "Nigeria",
    year: "2025",
    image: "/images/projects/project-14.jpg",
    size: "medium",
  },
  {
    id: 15,
    title: "Project 15",
    category: "Environmental",
    location: "Nigeria",
    year: "2025",
    image: "/images/projects/project-15.jpg",
    size: "short",
  },
  {
    id: 16,
    title: "Project 16",
    category: "Technical",
    location: "Nigeria",
    year: "2025",
    image: "/images/projects/project-16.jpg",
    size: "short",
  },
  {
    id: 17,
    title: "Project 17",
    category: "Industrial",
    location: "Nigeria",
    year: "2024",
    image: "/images/projects/project-17.jpg",
    size: "medium",
  },
  {
    id: 18,
    title: "Project 18",
    category: "Construction",
    location: "Nigeria",
    year: "2024",
    image: "/images/projects/project-18.jpg",
    size: "short",
  },
  {
    id: 19,
    title: "Project 19",
    category: "Environmental",
    location: "Nigeria",
    year: "2024",
    image: "/images/projects/project-19.jpg",
    size: "short",
  },
  {
    id: 20,
    title: "Project 20",
    category: "Industrial",
    location: "Nigeria",
    year: "2024",
    image: "/images/projects/project-20.jpg",
    size: "medium",
  },
  {
    id: 21,
    title: "Project 21",
    category: "Technical",
    location: "Nigeria",
    year: "2024",
    image: "/images/projects/project-21.jpg",
    size: "short",
  },
  {
    id: 22,
    title: "Project 22",
    category: "Construction",
    location: "Nigeria",
    year: "2024",
    image: "/images/projects/project-22.jpg",
    size: "short",
  },
  {
    id: 23,
    title: "Project 23",
    category: "Environmental",
    location: "Nigeria",
    year: "2024",
    image: "/images/projects/project-23.jpg",
    size: "medium",
  },
  {
    id: 24,
    title: "Project 24",
    category: "Industrial",
    location: "Nigeria",
    year: "2024",
    image: "/images/projects/project-24.jpg",
    size: "short",
  },
  {
    id: 25,
    title: "Project 25",
    category: "Construction",
    location: "Nigeria",
    year: "2024",
    image: "/images/projects/project-25.jpg",
    size: "short",
  },
  {
    id: 26,
    title: "Project 26",
    category: "Technical",
    location: "Nigeria",
    year: "2024",
    image: "/images/projects/project-26.jpg",
    size: "medium",
  },
  {
    id: 27,
    title: "Project 27",
    category: "Environmental",
    location: "Nigeria",
    year: "2024",
    image: "/images/projects/project-27.jpg",
    size: "short",
  },
  {
    id: 28,
    title: "Project 28",
    category: "Industrial",
    location: "Nigeria",
    year: "2023",
    image: "/images/projects/project-28.jpg",
    size: "short",
  },
  {
    id: 29,
    title: "Project 29",
    category: "Construction",
    location: "Nigeria",
    year: "2023",
    image: "/images/projects/project-29.jpg",
    size: "medium",
  },
  {
    id: 30,
    title: "Project 30",
    category: "Environmental",
    location: "Nigeria",
    year: "2023",
    image: "/images/projects/project-30.jpg",
    size: "short",
  },
  {
    id: 31,
    title: "Project 31",
    category: "Industrial",
    location: "Nigeria",
    year: "2023",
    image: "/images/projects/project-31.jpg",
    size: "short",
  },
  {
    id: 32,
    title: "Project 32",
    category: "Technical",
    location: "Nigeria",
    year: "2023",
    image: "/images/projects/project-32.jpg",
    size: "medium",
  },
  {
    id: 33,
    title: "Project 33",
    category: "Construction",
    location: "Nigeria",
    year: "2023",
    image: "/images/projects/project-33.jpg",
    size: "short",
  },
  {
    id: 34,
    title: "Project 34",
    category: "Environmental",
    location: "Nigeria",
    year: "2023",
    image: "/images/projects/project-34.jpg",
    size: "short",
  },
  {
    id: 35,
    title: "Project 35",
    category: "Industrial",
    location: "Nigeria",
    year: "2023",
    image: "/images/projects/project-35.jpg",
    size: "medium",
  },
  {
    id: 36,
    title: "Project 36",
    category: "Construction",
    location: "Nigeria",
    year: "2023",
    image: "/images/projects/project-36.jpg",
    size: "short",
  },
];

const filters = [
  "All",
  "Environmental",
  "Industrial",
  "Construction",
  "Technical",
];

function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const sectionRef = useRef(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeFilter
    );
  }, [activeFilter]);

  /*
   * Distribute the projects into THREE independent columns.
   *
   * 01 02 03
   * 04 05 06
   * 07 08 09
   * ...
   */
 const columns = useMemo(() => {
  const result = [[], [], []];

  filteredProjects.forEach((project, index) => {
    const columnIndex = index % 3;

    result[columnIndex].push(project);
  });

  return result;
}, [filteredProjects]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const elements = section.querySelectorAll(
      ".projects-page-reveal"
    );

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
  }, [activeFilter]);

  return (

    <main
      className="projects-page"
      ref={sectionRef}
    >
      {/* =========================================
          HERO
      ========================================= */}

      <section className="projects-page-hero">

        <div className="projects-page-hero-dots">
          {Array.from({ length: 48 }).map((_, index) => (
            <span key={index}></span>
          ))}
        </div>

        <div className="projects-page-hero-content projects-page-reveal">

          <div className="projects-page-label">
            <span></span>
            03 / OUR PROJECTS
          </div>

          <h1>
            Work that
            <br />
            <span>speaks for itself.</span>
          </h1>

          <p>
            Explore TMCH Group's environmental, industrial,
            construction and technical projects.
          </p>

        </div>

        <div className="projects-page-hero-index">
          <span>PROJECTS</span>
          <strong>36 PROJECTS</strong>
        </div>

      </section>


      {/* =========================================
          INTRO
      ========================================= */}

      <section className="projects-page-intro">

        <div className="projects-page-intro-inner projects-page-reveal">

          <div className="projects-page-intro-number">
            01
          </div>

          <div className="projects-page-intro-text">

            <h2>
              Built around
              <span> real challenges.</span>
            </h2>

            <p>
              Every project demands a different approach.
              TMCH Group brings together environmental,
              industrial, construction and technical expertise
              to deliver practical solutions.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================
          PROJECT WORK
      ========================================= */}

      <section className="projects-page-work">

        <div className="projects-page-work-header projects-page-reveal">

          <div className="projects-page-work-title">

            <span>SELECTED WORK</span>

            <h2>
              Our projects
            </h2>

          </div>


          {/* FILTERS */}

          <div className="projects-page-filters">

            {filters.map((filter) => (
              <button
                key={filter}
                className={
                  activeFilter === filter
                    ? "active"
                    : ""
                }
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}

          </div>

        </div>


        {/* =========================================
            THREE MASONRY COLUMNS
        ========================================= */}

        <div className="projects-page-masonry">

          {columns.map((column, columnIndex) => (

            <div
              className="projects-page-column"
              key={columnIndex}
            >

              {column.map((project, index) => (

                <article
                  key={project.id}
                  className={`projects-page-card ${project.size} projects-page-reveal`}
                  style={{
                    transitionDelay: `${index * 0.06}s`,
                  }}
                >

                  {/* IMAGE */}

                  <a
                    href={`/projects/${project.id}`}
                    className="projects-page-card-image"
                  >

                   <img
  src={project.image}
  alt={project.title}
  onError={(event) => {
    event.currentTarget.style.display = "none";
    event.currentTarget.parentElement.classList.add(
      "project-image-missing"
    );
  }}
/>

                    <div className="projects-page-card-overlay"></div>

                    <span className="projects-page-card-number">
                      {String(project.id).padStart(2, "0")}
                    </span>

                    <span className="projects-page-card-arrow">
                      <ArrowUpRight
                        size={20}
                        strokeWidth={1.7}
                      />
                    </span>

                  </a>


                  {/* CONTENT */}

                  <div className="projects-page-card-content">

                    <div className="projects-page-card-meta">

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

                    <a
                      href={`/projects/${project.id}`}
                      className="projects-page-card-link"
                    >
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

          ))}

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================= */}

      <section className="projects-page-cta">

        <div className="projects-page-cta-dots">
          {Array.from({ length: 32 }).map((_, index) => (
            <span key={index}></span>
          ))}
        </div>

        <div className="projects-page-cta-inner projects-page-reveal">

          <span className="projects-page-cta-label">
            HAVE A PROJECT IN MIND?
          </span>

          <h2>
            Let's build
            <br />
            <span>something meaningful.</span>
          </h2>

          <a href="/contact">
            Start a Conversation
            <ArrowUpRight size={18} />
          </a>

        </div>

      </section>

    </main>
  );
}

export default Projects;