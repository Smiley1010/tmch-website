import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import "./Contact.css";

const offices = [
  {
    number: "01",
    name: "Headquarters",
    city: "Port Harcourt, Nigeria",
    address:
      "#8 Chief Dick Wami Avenue, Off Nsirim Crescent, GRA Phase III, Port Harcourt, Rivers State.",
    phones: ["+234 (0)84-462-421", "+234 (0)803-555-1495", "+234 (0)803-336-4701"],
    map: "https://www.google.com/maps/search/?api=1&query=8+Chief+Dick+Wami+Avenue+Port+Harcourt+Nigeria",
  },
  {
    number: "02",
    name: "Lagos Office",
    city: "Ikoyi, Lagos",
    address: "#3 Norman Williams, Ikoyi, Lagos, Nigeria.",
    phones: ["+234 (0)80-33-022-761", "+234 (0)803-555-1495", "+234 (0)803-336-4701"],
    map: "https://www.google.com/maps/search/?api=1&query=3+Norman+Williams+Ikoyi+Lagos+Nigeria",
  },
  {
    number: "03",
    name: "USA Office",
    city: "Houston, Texas",
    address: "2425 West Loop South #200, Houston, TX 77027, USA.",
    phones: ["+1 713-297-8853", "+1 832-212-9406", "+1 832-212-9979"],
    map: "https://www.google.com/maps/search/?api=1&query=2425+West+Loop+South+%23200+Houston+TX+77027",
  },
];

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [notice, setNotice] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setNotice("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setNotice(
      "Your details are ready, but this form is not connected to a message delivery service yet. Please contact TMCH by phone while the form is being connected."
    );
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-image" />

        <div className="contact-hero-content">
          <span className="contact-eyebrow">
            <span />
            CONTACT TMCH / LET'S TALK
          </span>

          <h1>
            Let's talk about
            <br />
            <span>what comes next.</span>
          </h1>

          <div className="contact-hero-bottom">
            <p>
              Have a project, a technical challenge or a service
              requirement? Tell us what you need. Let's explore
              how TMCH can help.
            </p>

            <a href="#contact-form" className="contact-hero-link">
              Start a conversation
              <ArrowDownRight size={19} />
            </a>
          </div>
        </div>

        <div className="contact-hero-index">01 — GET IN TOUCH</div>
      </section>

      <section className="contact-main-section" id="contact-form">
        <div className="contact-main-container">
          <div className="contact-form-intro">
            <span className="contact-section-label">
              YOUR NEXT PROJECT
            </span>

            <h2>
              Tell us what
              <br />
              <span>you have in mind.</span>
            </h2>

            <p>
              Share a few details about your enquiry. Whether it
              involves environmental services, industrial operations
              or construction, we'd like to understand your needs.
            </p>

            <div className="contact-direct-block">
              <div className="contact-direct-icon">
                <Phone size={20} />
              </div>

              <div>
                <span>Prefer to speak directly?</span>
                <a href="tel:+2348033364701">
                  +234 803 336 4701
                </a>
              </div>

              <ArrowUpRight size={19} />
            </div>

            <div className="contact-direct-block">
              <div className="contact-direct-icon">
                <Clock3 size={20} />
              </div>

              <div>
                <span>Enquiries</span>
                <p>Contact the office relevant to your location.</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-heading">
              <span>PROJECT ENQUIRY</span>
              <span className="contact-required">* Required fields</span>
            </div>

            <div className="contact-field">
              <label htmlFor="contact-name">Your name *</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-fields-row">
              <div className="contact-field">
                <label htmlFor="contact-email">Email address *</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-phone">Phone number *</label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  placeholder="+234 ..."
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="contact-service">Service of interest</label>
              <select
                id="contact-service"
                name="service"
                value={form.service}
                onChange={handleChange}
              >
                <option value="">Select a service</option>
                <option value="Waste Management">Waste Management</option>
                <option value="Vessel Tank Cleaning">Vessel Tank Cleaning</option>
                <option value="Environmental Monitoring">
                  Environmental Monitoring
                </option>
                <option value="Remediation and Oil Spill Clean-up">
                  Remediation & Oil Spill Clean-up
                </option>
                <option value="Laboratory Services">Laboratory Services</option>
                <option value="Civil Construction">Civil Construction</option>
                <option value="Heavy Equipment Leasing">
                  Heavy Equipment Leasing
                </option>
                <option value="Procurement and Logistics">
                  Procurement & Logistics
                </option>
                <option value="Other">Other Enquiry</option>
              </select>
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">Tell us about your project *</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                maxLength="1000"
                placeholder="Describe your requirements, project location or questions..."
                value={form.message}
                onChange={handleChange}
                required
              />
              <span className="contact-character-count">
                {form.message.length}/1000
              </span>
            </div>

            <button type="submit" className="contact-submit">
              Prepare enquiry
              <ArrowUpRight size={19} />
            </button>

            {notice && (
              <p className="contact-form-notice" role="status">
                {notice}
              </p>
            )}

            <p className="contact-form-privacy">
              Please don't include confidential or sensitive information
              in this form.
            </p>
          </form>
        </div>
      </section>

      <section className="contact-offices-section">
        <div className="contact-offices-container">
          <div className="contact-offices-heading">
            <div>
              <span className="contact-section-label">
                OUR LOCATIONS / 02
              </span>

              <h2>
                Closer to the
                <br />
                <span>work that matters.</span>
              </h2>
            </div>

            <p>
              Connect with TMCH through one of our offices in Nigeria
              or the United States.
            </p>
          </div>

          <div className="contact-offices-grid">
            {offices.map((office) => (
              <article className="contact-office-card" key={office.number}>
                <div className="contact-office-top">
                  <span>{office.number}</span>
                  <MapPin size={20} />
                </div>

                <h3>{office.name}</h3>
                <p className="contact-office-city">{office.city}</p>
                <p className="contact-office-address">{office.address}</p>

                <div className="contact-office-phones">
                  {office.phones.map((phone) => (
                    <a
                      href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                      key={phone}
                    >
                      <Phone size={14} />
                      {phone}
                    </a>
                  ))}
                </div>

                <a
                  href={office.map}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-office-map"
                >
                  View on map
                  <ArrowUpRight size={17} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <div className="contact-cta-inner">
          <span className="contact-section-label">
            READY WHEN YOU ARE
          </span>

          <h2>
            Good work starts
            <br />
            with a <span>conversation.</span>
          </h2>

          <p>
            Talk to TMCH about your next environmental, industrial
            or construction project.
          </p>

          <a href="#contact-form">
            Discuss your project
            <ArrowUpRight size={19} />
          </a>
        </div>
      </section>
    </main>
  );
}

export default Contact;