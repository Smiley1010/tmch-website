import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
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
      "The team showed a clear understanding of our requirements and approached the project with a focus on safety, efficiency and reliable service delivery.",
    name: "Client Representative",
    role: "Industrial Services",
  },
  {
    quote:
      "Working with a team that values professionalism, communication and quality makes a real difference. TMCH understands the importance of delivering dependable solutions.",
    name: "Client Representative",
    role: "Project Services",
  },
];

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("slide-left");

  const changeSlide = (newIndex, slideDirection) => {
    setDirection(slideDirection);
    setActiveIndex(newIndex);
  };

  const previousSlide = () => {
    changeSlide(
      activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1,
      "slide-left"
    );
  };

  const nextSlide = () => {
    changeSlide(
      activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1,
      "slide-right"
    );
  };

  const active = testimonials[activeIndex];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-heading">
          <div className="testimonials-label">
            <span />
            CLIENT TESTIMONIALS
          </div>

          <h2>
            Built on <span>trust.</span>
          </h2>

          <p>Strong partnerships. Meaningful results.</p>
        </div>

        <div className="testimonial-stage">
          <button
            type="button"
            className="testimonial-arrow testimonial-arrow-left"
            onClick={previousSlide}
            aria-label="Previous testimonial"
          >
            <ArrowLeft size={21} />
          </button>

          <div className="testimonial-card">
            <div
              className={`testimonial-content ${direction}`}
              key={activeIndex}
            >
              <Quote
                className="testimonial-quote-icon"
                size={36}
                strokeWidth={1.5}
              />

              <p className="testimonial-quote">
                “{active.quote}”
              </p>

              <div className="testimonial-divider" />

              <h3 className="testimonial-name">{active.name}</h3>
              <p className="testimonial-role">{active.role}</p>
            </div>

            <div className="testimonial-footer">
              <span className="testimonial-count">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(testimonials.length).padStart(2, "0")}
              </span>

              <div className="testimonial-dots">
                {testimonials.map((item, index) => (
                  <button
                    key={item.role}
                    type="button"
                    className={`testimonial-dot ${
                      activeIndex === index ? "active" : ""
                    }`}
                    onClick={() =>
                      changeSlide(
                        index,
                        index < activeIndex
                          ? "slide-left"
                          : "slide-right"
                      )
                    }
                    aria-label={`Go to testimonial ${index + 1}`}
                    aria-current={
                      activeIndex === index ? "true" : undefined
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="testimonial-arrow testimonial-arrow-right"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <ArrowRight size={21} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
