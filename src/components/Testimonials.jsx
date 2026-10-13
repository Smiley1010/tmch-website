import { useState } from "react";
import "./Testimonials.css";

const testimonials = [
  {
    quote:
      "TMCH demonstrated professionalism and a strong commitment to delivering quality service. Their team approached the work with care and maintained a high standard throughout the engagement.",
    name: "Client Representative",
    role: "Environmental Services",
  },
  {
    quote:
      "The team demonstrated a clear understanding of our requirements and maintained a professional approach throughout the project. Communication was consistent, and the work was handled with attention to detail.",
    name: "Client Representative",
    role: "Infrastructure Development",
  },
  {
    quote:
      "TMCH provided dependable support and demonstrated a strong commitment to safety, quality, and timely delivery. We appreciated the team's practical approach and professionalism.",
    name: "Client Representative",
    role: "Technical & Engineering Services",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonial = testimonials[activeIndex];

  const previousTestimonial = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const nextTestimonial = () => {
    setActiveIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-heading">
          <div className="testimonials-eyebrow">
            <span className="testimonials-eyebrow-line" />
            <span>CLIENT TESTIMONIALS</span>
          </div>

          <h2>
            Built on <span>trust.</span>
          </h2>

          <p className="testimonials-subtitle">
            Strong partnerships. Meaningful results.
          </p>
        </div>

        <div className="testimonial-layout">
          <article
            className="testimonial-card"
            key={activeIndex}
          >
            <div className="testimonial-quote-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <path
                  d="M18 25H9V13a4 4 0 0 1 4-4h5v16Zm21 0h-9V13a4 4 0 0 1 4-4h5v16Z"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="translate(0 3)"
                />
                <path
                  d="M9 25c0 6-2 9-5 12M30 25c0 6-2 9-5 12"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  transform="translate(4 -1)"
                />
              </svg>
            </div>

            <p className="testimonial-quote">
              “{testimonial.quote}”
            </p>

            <div className="testimonial-divider" />

            <div className="testimonial-author">
              <h3>{testimonial.name}</h3>
              <p>{testimonial.role}</p>
            </div>

            <div className="testimonial-pagination">
              {testimonials.map((item, index) => (
                <button
                  key={item.role}
                  type="button"
                  className={`testimonial-dot ${
                    index === activeIndex ? "active" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View testimonial ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                />
              ))}
            </div>
          </article>

          <div className="testimonial-navigation">
            <button
              className="testimonial-arrow"
              onClick={previousTestimonial}
              aria-label="Previous testimonial"
              type="button"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M19 12H5m7 7-7-7 7-7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              className="testimonial-arrow"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              type="button"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14m-7-7 7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}