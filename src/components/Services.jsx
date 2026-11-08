
import React, { useEffect, useRef } from "react";
import "./Services.css";

const services = [
  {
    title: "Vessel Tank Cleaning Services",
    description:
      "Our expert team specializes in comprehensive vessel tank cleaning services tailored to meet your specific needs.",
    image: "/images/vessel-tank-cleaning-service.jpg",
    imageAlt: "Industrial vessel and storage tank cleaning operations",
    slug: "vessel-storage-tank-cleaning",
  },
  {
    title: "Environmental Compliance Monitoring",
    description:
      "We specialize in comprehensive environmental compliance monitoring services tailored to meet your specific industry requirements.",
    image: "/images/env-compliance-monitoring-service.jpg",
    imageAlt: "Environmental specialist collecting samples at an industrial site",
    slug: "environmental-compliance-monitoring",
  },
  {
    title: "Soil Remediation and Oil Spill Clean-up Services",
    description:
      "With extensive experience in remediation techniques and regulatory compliance, we offer prompt and effective solutions to safeguard ecosystems and public health.",
    image: "/images/soil-clean-up.jpg",
    imageAlt: "Environmental remediation and oil spill clean-up operations",
    slug: "soil-remediation-oil-spill-clean-up",
  },
  {
    title: "Heavy Duty Equipment Leasing",
    description:
      "We specialize in providing top-of-the-line heavy equipment rentals to meet the demands of construction, industrial, and infrastructure projects.",
    image: "/images/heavy-duty-equipment-leasing.jpg",
    imageAlt: "Heavy-duty equipment at an industrial construction site",
    slug: "heavy-duty-equipment-leasing",
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll(".services-reveal");

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });
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
    <section
      className="services-section"
      id="services"
      ref={sectionRef}
    >
      <div className="services-container">
        <div className="services-heading services-reveal">
          <div className="services-heading-copy">
            <span className="services-eyebrow">
              <span className="services-eyebrow-line" />
              WHAT WE DO
            </span>

            <h2>
              Our Range of
              <br />
              <span>Services.</span>
            </h2>
          </div>

          <div className="services-intro">
            <p>
              We provide specialized environmental, industrial, and
              equipment solutions to support demanding operations
              with a focus on safety, quality, and sustainability.
            </p>

            <a href="/services" className="services-all-link">
              <span>Explore all services</span>
              <span className="services-link-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card services-reveal" key={service.slug}>
              <a
                className="service-card-link services-reveal"
                href={`/services/${service.slug}`}
                aria-label={`Learn more about ${service.title}`}
              >
                <div className="service-image-wrap ">
                  <img
                    className="service-image"
                    src={service.image}
                    alt={service.imageAlt}
                    loading="lazy"
                  />
                </div>

                <div className="service-card-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  <span className="service-learn-more">
                    Learn more
                    <span aria-hidden="true"> →</span>
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>

        <div className="services-bottom services-reveal">
          <span className="services-bottom-line" />
          <p>
            Environmental responsibility. Industrial expertise.
            Reliable solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
