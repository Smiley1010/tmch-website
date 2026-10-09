import { ArrowUpRight, ArrowUp, MapPin } from "lucide-react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              <img
                src="/images/tmch-logo.png"
                alt="TMCH Group Limited"
              />
            </a>

            <p>
              Environmental, industrial and construction solutions
              built around responsibility, technical expertise and
              lasting impact.
            </p>

            <a href="/contact" className="footer-contact-button">
              Let's work together
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <a href="/services">Our Services</a>
            <a href="/projects">Our Projects</a>
            <a href="/team">Our Team</a>
            <a href="/contact">Contact Us</a>
          </div>

          <div className="footer-column">
            <h3>Our Expertise</h3>
            <a href="/services">Waste Management</a>
            <a href="/services">Tank Cleaning</a>
            <a href="/services">Environmental Monitoring</a>
            <a href="/services">Remediation</a>
            <a href="/services">Civil Construction</a>
            <a href="/services">Equipment Leasing</a>
          </div>

          <div className="footer-column footer-location">
            <h3>Find Us</h3>

            <div className="footer-location-icon">
              <MapPin size={19} />
            </div>

            <p>
              #8 Chief Dick Wami Avenue,
              <br />
              Off Nsirim Crescent,
              <br />
              GRA Phase III,
              <br />
              Port Harcourt, Rivers State,
              Nigeria.
            </p>

            <a href="/contact" className="footer-location-link">
              Contact our team
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div className="footer-statement">
          <span>TMCH GROUP LIMITED</span>
          <h2>
            Building progress.
            <br />
            <span>Protecting tomorrow.</span>
          </h2>
          <a href="/contact" aria-label="Get in touch with TMCH">
            <ArrowUpRight size={28} />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} TMCH Group Limited. All rights reserved.</p>

        <div className="footer-bottom-links">
          <a href="/contact">Contact</a>
          <a href="/company-policy">Company Policy</a>
        </div>

        <button
          className="footer-back-top"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          aria-label="Back to top"
        >
          Back to top
          <span>
            <ArrowUp size={15} />
          </span>
        </button>
      </div>
    </footer>
  );
}

export default Footer;