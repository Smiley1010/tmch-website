import { ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import "./Projects.css";

const projects = [
  { id: 1, title: 'Sea Water Sampling', category: 'Environmental', location: 'Bonny Island, Rivers State', year: '2026', image: '/images/project1.jpeg' },
  { id: 2, title: 'Sludge Evacuation at TotalEnergies Quayside', category: 'Environmental', location: 'Onne, Nigeria', year: '2026', image: '/images/project2.png' },
  { id: 3, title: 'Post-Clean-up Inspection at SPDC Site', category: 'Environmental', location: 'Assa-Rumuekpe Pipeline, Elele Alimini', year: '2026', image: '/images/project3.png' },
  { id: 4, title: 'Post-Clean-up Inspection at SPDC Site', category: 'Environmental', location: 'Ajatiton Well 1L Flowline, Azagbene', year: '2026', image: '/images/project4.png' },
  { id: 5, title: 'Ecological Fund Road Construction', category: 'Construction', location: 'Rivers State, Nigeria', year: '2026', image: '/images/project5.png' },
  { id: 6, title: 'Asphalt Compaction for Ecological Fund Road', category: 'Construction', location: 'Rivers State, Nigeria', year: '2026', image: '/images/project6.png' },
  { id: 7, title: 'Installation of Fire-Water Hydrants', category: 'Technical', location: 'NNS Pathfinder Delta, Warri', year: '2025', image: '/images/project7.png' },
  { id: 8, title: 'Water Hydrant Installation', category: 'Technical', location: 'NNS Pathfinder, Port Harcourt', year: '2025', image: '/images/project8.png' },
  { id: 9, title: 'Gully Erosion Control Works', category: 'Construction', location: 'Ikot, Cross River State', year: '2025', image: '/images/project9.png' },
  { id: 10, title: 'Gully Erosion Control — Pre-Works Assessment', category: 'Construction', location: 'Cross River State, Nigeria', year: '2025', image: '/images/project10.png' },
  { id: 11, title: 'FAAN Aviation Clinic Project', category: 'Construction', location: 'Port Harcourt Airport', year: '2025', image: '/images/project11.png' },
  { id: 12, title: 'Ground Water Sampling', category: 'Environmental', location: 'Bonny Island, Rivers State', year: '2025', image: '/images/project12.png' },
  { id: 13, title: 'ECM Reporting', category: 'Environmental', location: 'Ohaji, Imo State', year: '2025', image: '/images/project13.jpeg' },
  { id: 13, title: 'ECM Reporting', category: 'Environmental', location: 'Ohaji, Imo State', year: '2025', image: '/images/project13.jpeg' },
  { id: 14, title: 'Air Quality Monitoring', category: 'Environmental', location: 'Ohaji, Imo State', year: '2025', image: '/images/project14.jpg' },
  { id: 15, title: 'Toolbox Meeting', category: 'Industrial', location: 'Bonny, Rivers State', year: '2025', image: '/images/project15.jpg' },
  { id: 16, title: 'Noise Monitoring', category: 'Environmental', location: 'Bonny, Rivers State', year: '2025', image: '/images/project16.jpg' },
  { id: 17, title: 'Toolbox Talk for ECM Activities', category: 'Industrial', location: 'Bonny, Rivers State', year: '2025', image: '/images/project17.jpg' },
  { id: 18, title: 'Instrument Water Analysis and Recording', category: 'Environmental', location: 'Bonny, Rivers State', year: '2025', image: '/images/project18.jpeg' },
  { id: 19, title: 'Sea Water Analysis (EQM)', category: 'Environmental', location: 'Bonny, Rivers State', year: '2024', image: '/images/project19.jpeg' },
  { id: 20, title: 'Instrument Water Analysis', category: 'Environmental', location: 'Bonny, Rivers State', year: '2024', image: '/images/project20.jpeg' },
  { id: 21, title: 'Noise Monitoring', category: 'Environmental', location: 'Bonny, Rivers State', year: '2024', image: '/images/project21.jpeg' },
  { id: 22, title: 'Crane Operations', category: 'Industrial', location: 'Port Harcourt, Rivers State', year: '2024', image: '/images/project22.jpeg' },
  { id: 23, title: 'Turbine Installation at Agip Plant', category: 'Technical', location: 'Omoku, Rivers State', year: '2024', image: '/images/project23.jpeg' },
  { id: 24, title: 'Heavy-Duty Vehicle Operations', category: 'Industrial', location: 'Port Harcourt, Nigeria', year: '2024', image: '/images/project24.jpeg' },
  { id: 25, title: 'ATACM Pump', category: 'Technical', location: 'Port Harcourt, Rivers State', year: '2024', image: '/images/project25.jpg' },
  { id: 26, title: 'Automated Tank-Cleaning Machine Installation', category: 'Industrial', location: 'Bonny, Nigeria', year: '2024', image: '/images/project26.jpg' },
  { id: 27, title: 'GamaJet Nozzle', category: 'Industrial', location: 'Port Harcourt, Nigeria', year: '2024', image: '/images/project27.jpg' },
  { id: 28, title: 'Ground Water Sampling', category: 'Environmental', location: 'Bonny Island, Rivers State', year: '2024', image: '/images/project28.jpg' },
  { id: 29, title: 'Flushing of Grid AK28', category: 'Remediation', location: 'Nigeria', year: '2024', image: '/images/project29.jpeg' },
  { id: 30, title: 'Shoreline Remediation at Goi, Ogoni — SLC 034', category: 'Remediation', location: 'Ogoni, Rivers State', year: '2024', image: '/images/project30.jpg' },
  { id: 31, title: 'Tilling of Grid AK28', category: 'Remediation', location: 'Nigeria', year: '2023', image: '/images/project31.jpeg' },
  { id: 32, title: 'Confined-Space Entry for Tank Cleaning', category: 'Industrial', location: 'Nigeria', year: '2023', image: '/images/project32.jpeg' },
  { id: 33, title: 'Ongoing FAAN Clinic Construction', category: 'Construction', location: 'Port Harcourt Airport', year: '2023', image: '/images/project33.jpeg' },
  { id: 34, title: 'Construction of the Aviation Clinic', category: 'Construction', location: 'Port Harcourt Airport', year: '2023', image: '/images/projects/project-34.jpg' },
  { id: 35, title: 'Construction of a Laboratory at the Ibigwe Field', category: 'Construction', location: 'Ibigwe, Imo State', year: '2023', image: '/images/projects/project-35.jpg' },
  { id: 36, title: 'Ongoing Laboratory Construction at Ibigwe Field', category: 'Construction', location: 'Ibigwe, Imo State', year: '2023', image: '/images/projects/project-36.jpg' }
];

const filters = ["All", "Environmental", "Industrial", "Construction", "Technical", "Remediation"];

function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const sectionRef = useRef(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const elements = section.querySelectorAll(".projects-page-reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeFilter]);

  return (
    <main className="projects-page" ref={sectionRef}>
      <section className="projects-page-hero">
        <div className="projects-page-hero-dots" aria-hidden="true">
          {Array.from({ length: 48 }, (_, index) => <span key={index} />)}
        </div>
        <div className="projects-page-hero-content projects-page-reveal">
          <div className="projects-page-label"><span />03 / OUR PROJECTS</div>
          <h1>Work that<br /><span>speaks for itself.</span></h1>
          <p>Explore TMCH Group’s environmental, industrial, construction, remediation and technical projects.</p>
        </div>
        <div className="projects-page-hero-index"><span>PORTFOLIO</span><strong>{projects.length} PROJECTS</strong></div>
      </section>

      <section className="projects-page-intro">
        <div className="projects-page-intro-inner projects-page-reveal">
          <div className="projects-page-intro-number">TMCH</div>
          <div className="projects-page-intro-text">
            <h2>Built around <span>real challenges.</span></h2>
            <p>From environmental monitoring and remediation to industrial operations and construction, TMCH Group brings together practical expertise to deliver reliable solutions across complex project environments.</p>
          </div>
        </div>
      </section>

      <section className="projects-page-work">
        <div className="projects-page-work-header projects-page-reveal">
          <div className="projects-page-work-title"><span>SELECTED WORK</span><h2>Our projects</h2></div>
          <div className="projects-page-filters" aria-label="Filter projects">
            {filters.map((filter) => (
              <button key={filter} type="button" className={activeFilter === filter ? "active" : ""} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>
            ))}
          </div>
        </div>

        <div className="projects-page-grid">
          {filteredProjects.map((project, index) => (
            <article key={project.id} className="projects-page-card projects-page-reveal" style={{ transitionDelay: `${(index % 9) * 0.045}s` }}>
              <a href={`/projects/${project.id}`} className="projects-page-card-image" aria-label={`View ${project.title}`}>
                <img src={project.image} alt={project.title} loading="lazy" onError={(event) => {
                  event.currentTarget.style.display = "none";
                  event.currentTarget.parentElement.classList.add("project-image-missing");
                }} />
                <span className="projects-page-card-overlay" />
                <span className="projects-page-card-arrow"><ArrowUpRight size={21} strokeWidth={1.8} /></span>
              </a>
              <div className="projects-page-card-content">
                <div className="projects-page-card-meta"><span>{project.location}</span><span>{project.year}</span></div>
                <h3>{project.title}</h3>
                <a href={`/projects/${project.id}`} className="projects-page-card-link">View project <ArrowUpRight size={16} strokeWidth={1.8} /></a>
              </div>
            </article>
          ))}
        </div>
        {filteredProjects.length === 0 && <p className="projects-page-empty">No projects found in this category.</p>}
      </section>

      <section className="projects-page-cta">
        <div className="projects-page-cta-inner projects-page-reveal">
          <span>HAVE A PROJECT IN MIND?</span>
          <h2>Let’s build something<br /><em>that matters.</em></h2>
          <p>Talk to our team about your project requirements and how TMCH Group can help.</p>
          <a href="/contact" className="projects-page-cta-button">Contact our team <ArrowUpRight size={18} /></a>
        </div>
      </section>
    </main>
  );
}

export default Projects;
