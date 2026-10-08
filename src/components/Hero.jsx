import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import "./Hero.css";

const heroSlides = [
  {
    image: "/images/heroimage1.png",
    label: "",
  },
  {
    image: "/images/heroimage2.png",
    label: "",
  },
  {
    image: "/images/heroimage3.png",
    label: "",
  },
  {
    image: "/images/heroimage4.png",
    label: "",
  },
];

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) =>
        current === heroSlides.length - 1 ? 0 : current + 1
      );
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">

      {/* =========================================
          BACKGROUND SLIDESHOW
      ========================================= */}

      <div className="hero-background">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.image}
            className={`hero-slide ${
              index === activeSlide ? "active" : ""
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          />
        ))}
      </div>

      {/* =========================================
          DARK OVERLAY
      ========================================= */}

      <div className="hero-overlay"></div>

      {/* =========================================
          SUBTLE BLUE ATMOSPHERE
      ========================================= */}

      <div className="hero-blue-glow"></div>

      {/* =========================================
          HERO CONTENT
      ========================================= */}

      <div className="hero-content">

    

        <h1>
          Environmental.
          <br />
          Industrial.
          <br />
          <span>Construction.</span>
        </h1>

        <p className="hero-description">
          Integrated solutions for a cleaner environment,
          stronger infrastructure and safer industrial operations.
        </p>

        <div className="hero-buttons">

          <a
            href="/services"
            className="hero-button hero-button-primary"
          >
            Explore Our Capabilities
            <ArrowUpRight size={18} />
          </a>

          <a
            href="/projects"
            className="hero-button hero-button-secondary"
          >
            View Our Projects
          </a>

        </div>

      </div>

      {/* =========================================
          SLIDESHOW INFORMATION
      ========================================= */}

      <div className="hero-slide-info">

        <span className="hero-slide-category">
          {heroSlides[activeSlide].label}
        </span>

        <span className="hero-slide-counter">
          {String(activeSlide + 1).padStart(2, "0")} /
          {String(heroSlides.length).padStart(2, "0")}
        </span>

      </div>

      {/* =========================================
          SLIDE INDICATORS
      ========================================= */}

      <div className="hero-slide-indicators">

        {heroSlides.map((slide, index) => (
          <button
            key={slide.image}
            className={`hero-indicator ${
              index === activeSlide ? "active" : ""
            }`}
            onClick={() => setActiveSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span></span>
          </button>
        ))}

      </div>

    </section>
  );
}

export default Hero;