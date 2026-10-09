import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import "./Services.css";

const services = [
  {
    number: "01",
    title: "Vessel Tank Cleaning Services",
    category: "ENVIRONMENTAL",
    description:
      "Comprehensive vessel and tank cleaning services for oil tankers, shipping vessels and other waterborne vessels, with confined-space safety as a core priority.",
    image: "/images/vessel-tank-cleaning.png",
  },
  {
    number: "02",
    title: "Waste Transportation Services",
    category: "WASTE MANAGEMENT",
    description:
      "Safe collection, containment, transportation and disposal of waste materials including solids, liquids, sludges and hazardous waste.",
    image: "/images/waste-transport-services.png",
  },
  {
    number: "03",
    title: "Laboratory Services",
    category: "ENVIRONMENTAL",
    description:
      "Environmental testing and product quality control supported by professional laboratory services and analytical capabilities.",
    image: "/images/lab-services.jpg",
  },
  {
    number: "04",
    title: "Environmental Compliance Monitoring",
    category: "COMPLIANCE",
    description:
      "Environmental monitoring, air quality assessment, soil and water sampling, laboratory analysis and environmental studies.",
    image: "/images/env-compliance-monitoring.jpg",
  },
  {
    number: "05",
    title: "Soil Remediation & Oil Spill Clean-Up",
    category: "REMEDIATION",
    description:
      "Remediation and oil spill response solutions designed to protect ecosystems, restore affected environments and support regulatory compliance.",
    image: "/images/services/remediation.jpg",
  },
  {
    number: "06",
    title: "Civil Construction Services",
    category: "CONSTRUCTION",
    description:
      "Civil engineering and construction solutions focused on sustainability, efficiency, quality and timely project delivery.",
    image: "/images/services/civil-construction.jpg",
  },
  {
    number: "07",
    title: "Heavy Duty Equipment Leasing",
    category: "EQUIPMENT",
    description:
      "Heavy equipment rental solutions supporting construction, industrial and infrastructure projects.",
    image: "/images/services/heavy-equipment.jpg",
  },
  {
    number: "08",
    title: "Solar Street Light",
    category: "ENERGY",
    description:
      "Solar street lighting solutions designed to meet community and infrastructure lighting needs using sustainable energy.",
    image: "/images/services/solar-street-light.jpg",
  },
  {
    number: "09",
    title: "Procurement & Logistics Services",
    category: "PROCUREMENT",
    description:
      "Procurement and logistics support helping clients navigate sourcing, supply chain and delivery requirements.",
    image: "/images/services/procurement.jpg",
  },
  {
    number: "10",
    title: "Sewage Treatment Services",
    category: "ENVIRONMENTAL",
    description:
      "Wastewater collection and treatment solutions focused on environmental stewardship and responsible resource management.",
    image: "/images/services/sewage-treatment.jpg",
  },
];

function Services() {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const elements = page.querySelectorAll(".services-page-reveal");

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
    <main className="services-page" ref={pageRef}>

      {/* =========================================
          HERO
      ========================================= */}

      <section className="services-page-hero">

        <div className="services-page-hero-image">
          <img
            src="/images/services/services-hero.jpg"
            alt="TMCH industrial operations"
          />

          <div className="services-page-hero-overlay"></div>
        </div>

        <div className="services-page-hero-dots">
          {Array.from({ length: 56 }).map((_, index) => (
            <span key={index}></span>
          ))}
        </div>

        <div className="services-page-hero-content services-page-reveal">

          <div className="services-page-label">
            <span></span>
            OUR SERVICES
          </div>

          <h1>
            Solutions for
            <br />
            <span>complex environments.</span>
          </h1>

          <p>
            Integrated environmental, industrial and construction
            services designed around the demands of our clients
            and the environments in which they operate.
          </p>

        </div>

      </section>


      {/* =========================================
          INTRO
      ========================================= */}

      <section className="services-page-intro">

        <div className="services-page-intro-inner">

          <div className="services-page-number services-page-reveal">
            01
          </div>

          <div className="services-page-intro-content">

            <div className="services-page-small-label services-page-reveal">
              WHAT WE DO
            </div>

            <h2 className="services-page-reveal">
              Expertise that
              <br />
              works where
              <br />
              <span>it matters most.</span>
            </h2>

            <p className="services-page-reveal">
              TMCH Group provides comprehensive solutions across
              environmental services, waste management, industrial
              support, procurement and construction. Our services
              are designed to help clients operate safely,
              efficiently and responsibly.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================
          SERVICES
      ========================================= */}

      <section className="services-page-list">

        <div className="services-page-list-header services-page-reveal">

          <div>
            <div className="services-page-small-label">
              OUR CAPABILITIES
            </div>

            <h2>
              Explore our
              <br />
              <span>services.</span>
            </h2>
          </div>

          <span className="services-page-count">
            10 SERVICES
          </span>

        </div>


        <div className="services-page-grid">

          {services.map((service, index) => (
            <article
              className="services-page-card services-page-reveal"
              key={service.number}
              style={{
                transitionDelay: `${index * 0.05}s`,
              }}
            >

              <div className="services-page-card-image">

                <img
                  src={service.image}
                  alt={service.title}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    event.currentTarget.parentElement.classList.add(
                      "service-image-missing"
                    );
                  }}
                />

                <div className="services-page-card-overlay"></div>

                <span className="services-page-card-number">
                  {service.number}
                </span>

                <span className="services-page-card-arrow">
                  <ArrowUpRight size={19} />
                </span>

              </div>

              <div className="services-page-card-content">

                <div className="services-page-card-category">
                  {service.category}
                </div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <a href="/contact">
                  Discuss this service
                  <ArrowUpRight size={16} />
                </a>

              </div>

            </article>
          ))}

        </div>

      </section>


      {/* =========================================
          FEATURED REMEDIATION
      ========================================= */}

      <section className="services-page-featured">

        <div className="services-page-featured-image services-page-reveal">

          <img
            src="/images/services/shoreline-remediation.jpg"
            alt="TMCH shoreline and swamp remediation"
          />

        </div>

        <div className="services-page-featured-content">

          <div className="services-page-small-label services-page-reveal">
            FEATURED CAPABILITY
          </div>

          <h2 className="services-page-reveal">
            Restoring
            <br />
            affected
            <br />
            <span>environments.</span>
          </h2>

          <p className="services-page-reveal">
            TMCH specializes in restoring polluted shorelines and
            swamps impacted by oil spills and other contaminants.
            Our remediation approach is focused on restoring
            sensitive ecosystems while supporting environmental
            protection and responsible operations.
          </p>

          <a
            href="/contact"
            className="services-page-featured-link services-page-reveal"
          >
            Discuss a Project
            <ArrowUpRight size={18} />
          </a>

        </div>

      </section>


      {/* =========================================
          WHY TMCH
      ========================================= */}

      <section className="services-page-why">

        <div className="services-page-why-header services-page-reveal">

          <div className="services-page-small-label">
            WHY TMCH
          </div>

          <h2>
            Built around
            <br />
            <span>responsible delivery.</span>
          </h2>

        </div>


        <div className="services-page-why-grid">

          <div className="services-page-why-card services-page-reveal">
            <span>01</span>
            <h3>Safety First</h3>
            <p>
              Safety is central to the way our teams approach
              environmental, industrial and operational activities.
            </p>
          </div>

          <div className="services-page-why-card services-page-reveal">
            <span>02</span>
            <h3>Environmental Responsibility</h3>
            <p>
              We develop solutions that support environmental
              protection, sustainability and responsible waste
              management.
            </p>
          </div>

          <div className="services-page-why-card services-page-reveal">
            <span>03</span>
            <h3>Technical Expertise</h3>
            <p>
              Our services are supported by specialized personnel,
              equipment and technical knowledge.
            </p>
          </div>

          <div className="services-page-why-card services-page-reveal">
            <span>04</span>
            <h3>Compliance</h3>
            <p>
              We help clients navigate environmental requirements
              and operate within applicable regulatory expectations.
            </p>
          </div>

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================= */}

      <section className="services-page-cta">

        <div className="services-page-cta-dots">
          {Array.from({ length: 40 }).map((_, index) => (
            <span key={index}></span>
          ))}
        </div>

        <div className="services-page-cta-inner services-page-reveal">

          <div className="services-page-small-label">
            HAVE A PROJECT IN MIND?
          </div>

          <h2>
            Let's solve the
            <br />
            challenge
            <br />
            <span>together.</span>
          </h2>

          <a href="/contact">
            Get A Quote
            <ArrowUpRight size={19} />
          </a>

        </div>

      </section>

    </main>
  );
}

export default Services;