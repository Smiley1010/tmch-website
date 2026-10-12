import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Leaf,
  HardHat,
  Recycle,
  Target,
  Eye,
  CheckCircle2,
} from "lucide-react";

import "./About.css";

const expertise = [
  {
    number: "01",
    icon: ShieldCheck,
    title: "Environmental Management",
    description:
      "Responsible environmental solutions that help organisations manage their impact and maintain operational standards.",
  },
  {
    number: "02",
    icon: HardHat,
    title: "Industrial Services",
    description:
      "Practical industrial support designed around operational demands, safety requirements and reliable delivery.",
  },
  {
    number: "03",
    icon: Recycle,
    title: "Waste Management",
    description:
      "Structured waste handling and management solutions focused on responsible practices and environmental care.",
  },
  {
    number: "04",
    icon: Leaf,
    title: "Environmental Remediation",
    description:
      "Environmental support services that contribute to cleaner sites and more responsible industrial operations.",
  },
  {
    number: "05",
    icon: Target,
    title: "Project Support",
    description:
      "Coordinated project services built around client requirements, planning and dependable execution.",
  },
  {
    number: "06",
    icon: CheckCircle2,
    title: "Quality and HSE",
    description:
      "A commitment to safe working practices, quality delivery and continual improvement across our operations.",
  },
];

const statistics = [
  { value: "2007", label: "Year established" },
  { value: "15+", label: "Years of experience" },
  { value: "06", label: "Core service areas" },
];

function About() {
  return (
    <main className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-image">
          <img
            src="/images/about-hero.jpg"
            alt="Industrial construction and environmental operations"
          />
        </div>

        <div className="about-hero-overlay" />

        <div className="about-hero-content">
          <div className="about-eyebrow">
            <span />
            ABOUT TMCH GROUP
          </div>

          <h1>
            Championing
            <br />
            <span>sustainability</span>
            <br />
            since 2007.
          </h1>

          <p>
            Delivering environmental, industrial and construction solutions
            with a commitment to quality, sustainability and responsible
            operations.
          </p>

          <a href="#about-story" className="about-hero-link">
            Discover TMCH
            <ArrowDownRight size={19} />
          </a>
        </div>

        <div className="about-hero-bottom">
          <span>ENVIRONMENTAL · INDUSTRIAL · CONSTRUCTION</span>
          <span>EST. 2007</span>
        </div>
      </section>

      {/* COMPANY INTRODUCTION */}
      <section className="about-story" id="about-story">
        <div className="about-story-inner">
          <div className="about-section-index">
            <span>01</span>
            <span className="about-index-line" />
            <span>WHO WE ARE</span>
          </div>

          <div className="about-story-copy">
            <p className="about-kicker">OUR COMPANY</p>

            <h2>
              Built around
              <br />
              <span>responsible progress.</span>
            </h2>

            <p className="about-body">
              TMCH Group Limited provides environmental, industrial and
              construction-related services for demanding operating
              environments. Our approach is centred on understanding client
              needs, working responsibly and delivering practical solutions.
            </p>

            <p className="about-body">
              Since our establishment in 2007, we have continued to build
              our identity around professional service, operational
              discipline and a commitment to quality.
            </p>

            <a href="/services" className="about-text-link">
              Explore our services
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="about-story-visual">
            <img
              src="/images/about-story.jpg"
              alt="Industrial field operations"
              loading="lazy"
            />

            <div className="about-image-caption">
              <span>01 / OUR APPROACH</span>
              <span>Built on responsibility</span>
            </div>

            <div className="about-story-accent">
              <span>TMCH</span>
              <span>GROUP LIMITED</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY VALUES STRIP */}
      <section className="about-principles">
        <div className="about-principles-inner">
          <div>
            <span className="about-principle-number">01</span>
            <h3>Integrity</h3>
            <p>Doing the right thing in every engagement.</p>
          </div>

          <div>
            <span className="about-principle-number">02</span>
            <h3>Quality</h3>
            <p>Maintaining high standards in our delivery.</p>
          </div>

          <div>
            <span className="about-principle-number">03</span>
            <h3>Safety</h3>
            <p>Keeping responsible practices at the forefront.</p>
          </div>

          <div>
            <span className="about-principle-number">04</span>
            <h3>Sustainability</h3>
            <p>Considering the long-term impact of our work.</p>
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="about-expertise">
        <div className="about-expertise-heading">
          <div>
            <p className="about-kicker">WHAT WE DO</p>
            <h2>
              Expertise for
              <br />
              <span>complex environments.</span>
            </h2>
          </div>

          <p className="about-expertise-intro">
            Our capabilities bring together practical services and a
            responsible approach to the challenges our clients face.
          </p>
        </div>

        <div className="about-expertise-grid">
          {expertise.map((item) => {
            const Icon = item.icon;

            return (
              <article className="about-expertise-card" key={item.number}>
                <div className="about-expertise-card-top">
                  <span>{item.number}</span>
                  <Icon size={25} strokeWidth={1.5} />
                </div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <span className="about-card-bottom-line" />
              </article>
            );
          })}
        </div>
      </section>

      {/* SUSTAINABILITY FEATURE */}
      <section className="about-sustainability">
        <div className="about-sustainability-image">
          <img
            src="/images/about-sustainability.jpg"
            alt="Environmental care and responsible industrial practices"
            loading="lazy"
          />
        </div>

        <div className="about-sustainability-content">
          <p className="about-kicker">OUR COMMITMENT</p>

          <h2>
            Progress that
            <br />
            respects the
            <br />
            <span>environment.</span>
          </h2>

          <p>
            We recognise the importance of responsible operations in
            industrial and construction environments. Our focus is on
            practical solutions that consider quality, safety and
            environmental responsibility.
          </p>

          <a href="/services" className="about-light-link">
            Learn about our services
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="about-purpose">
        <div className="about-purpose-heading">
          <p className="about-kicker">WHAT GUIDES US</p>
          <h2>
            Our purpose.
            <br />
            <span>Our direction.</span>
          </h2>
        </div>

        <div className="about-purpose-grid">
          <article className="about-purpose-card">
            <div className="about-purpose-top">
              <span>01 / OUR MISSION</span>
              <Target size={26} strokeWidth={1.5} />
            </div>

            <h3>Delivering solutions that make a difference.</h3>

            <p>
              To provide dependable environmental, industrial and
              construction-related services through professional delivery,
              quality practices and a commitment to responsible operations.
            </p>

            <span className="about-purpose-number">M</span>
          </article>

          <article className="about-purpose-card about-purpose-card-dark">
            <div className="about-purpose-top">
              <span>02 / OUR VISION</span>
              <Eye size={26} strokeWidth={1.5} />
            </div>

            <h3>Building trust through responsible progress.</h3>

            <p>
              To strengthen our position as a trusted service provider,
              recognised for professionalism, quality and environmental
              responsibility.
            </p>

            <span className="about-purpose-number">V</span>
          </article>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="about-stats">
        <div className="about-stats-heading">
          <p className="about-kicker">OUR JOURNEY</p>
          <h2>
            Experience with
            <br />
            <span>purpose.</span>
          </h2>
        </div>

        <div className="about-stats-grid">
          {statistics.map((stat) => (
            <div className="about-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <p className="about-stats-note">
          Figures and service descriptions should be confirmed against
          TMCH's official company information before publication.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="about-cta">
        <div className="about-cta-inner">
          <div>
            <p className="about-kicker">LET'S WORK TOGETHER</p>

            <h2>
              Have a project
              <br />
              <span>in mind?</span>
            </h2>

            <p>
              Speak with our team about your operational requirements
              and the services we can provide.
            </p>
          </div>

          <a href="/contact" className="about-cta-button">
            Contact our team
            <ArrowUpRight size={20} />
          </a>
        </div>
      </section>
    </main>
  );
}

export default About;
