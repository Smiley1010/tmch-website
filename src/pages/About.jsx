import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import "./About.css";

function About() {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const elements = page.querySelectorAll(".about-page-reveal");

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

      <main className="about-page" ref={pageRef}>

        {/* =========================================
            HERO
        ========================================= */}

        <section className="about-page-hero">

          <div className="about-page-hero-dots">
            {Array.from({ length: 56 }).map((_, index) => (
              <span key={index}></span>
            ))}
          </div>

          <div className="about-page-hero-content about-page-reveal">

            <div className="about-page-label">
              <span></span>
              ABOUT TMCH
            </div>

            <h1>
              Championing
              <br />
              <span>sustainability</span>
              <br />
              since 2007.
            </h1>

            <p>
              Leading environmental solutions for the oil and gas
              industry, with a commitment to quality, sustainability
              and responsible operations.
            </p>

          </div>

          <div className="about-page-hero-image about-page-reveal">

            <img
              src="/images/about/tmch-about-hero.jpg"
              alt="TMCH Group environmental operations"
            />

            <div className="about-page-hero-image-overlay"></div>

            <div className="about-page-hero-image-label">
              <span>TMCH GROUP LIMITED</span>
              <span>EST. 2007</span>
            </div>

          </div>

        </section>


        {/* =========================================
            WHO WE ARE
        ========================================= */}

        <section className="about-page-who">

          <div className="about-page-who-inner">

            <div className="about-page-section-number about-page-reveal">
              01
            </div>

            <div className="about-page-who-content">

              <div className="about-page-small-label about-page-reveal">
                WHO WE ARE
              </div>

              <h2 className="about-page-reveal">
                Leading environmental
                <br />
                solutions for the
                <br />
                <span>oil & gas industry.</span>
              </h2>

              <p className="about-page-reveal">
                TMCH Group Limited is committed to providing
                comprehensive solutions across environmental,
                industrial and related services, with sustainability
                and innovation at the heart of its operations.
              </p>

              <p className="about-page-reveal">
                With a legacy spanning over 15 years, TMCH has
                developed expertise in environmental management,
                waste management and other specialized services
                supporting the oil and gas industry.
              </p>

            </div>

            <div className="about-page-who-image about-page-reveal">

              <img
                src="/images/about/tmch-about-field.jpg"
                alt="TMCH environmental field operations"
              />

              <div className="about-page-image-caption">
                <span>ENVIRONMENTAL OPERATIONS</span>
                <span>TMCH / 01</span>
              </div>

            </div>

          </div>

        </section>


        {/* =========================================
            EXPERTISE
        ========================================= */}

        <section className="about-page-expertise">

          <div className="about-page-expertise-header about-page-reveal">

            <div className="about-page-small-label">
              OUR EXPERTISE
            </div>

            <h2>
              Solutions built around
              <br />
              <span>real environmental challenges.</span>
            </h2>

            <p>
              Our range of services addresses critical environmental
              and operational requirements across the industries we
              serve.
            </p>

          </div>


          <div className="about-page-expertise-grid">

            <article className="about-expertise-card about-page-reveal">
              <span>01</span>
              <h3>Waste Management</h3>
              <p>
                Specialized waste management solutions designed
                to support responsible handling and disposal.
              </p>
              <ArrowUpRight size={20} />
            </article>

            <article className="about-expertise-card about-page-reveal">
              <span>02</span>
              <h3>Vessel Tank Cleaning</h3>
              <p>
                Specialized services supporting safe and effective
                vessel and tank cleaning operations.
              </p>
              <ArrowUpRight size={20} />
            </article>

            <article className="about-expertise-card about-page-reveal">
              <span>03</span>
              <h3>Hazardous Waste Handling</h3>
              <p>
                Responsible handling of hazardous materials with
                environmental protection and compliance in mind.
              </p>
              <ArrowUpRight size={20} />
            </article>

            <article className="about-expertise-card about-page-reveal">
              <span>04</span>
              <h3>Remediation</h3>
              <p>
                Environmental remediation solutions focused on
                restoring affected environments.
              </p>
              <ArrowUpRight size={20} />
            </article>

            <article className="about-expertise-card about-page-reveal">
              <span>05</span>
              <h3>Oil Spill Clean-Up</h3>
              <p>
                Response and recovery solutions supporting effective
                oil spill management.
              </p>
              <ArrowUpRight size={20} />
            </article>

            <article className="about-expertise-card about-page-reveal">
              <span>06</span>
              <h3>Environmental Compliance</h3>
              <p>
                Supporting clients in navigating environmental
                requirements and regulatory expectations.
              </p>
              <ArrowUpRight size={20} />
            </article>

          </div>

        </section>


        {/* =========================================
            SUSTAINABILITY
        ========================================= */}

        <section className="about-page-sustainability">

          <div className="about-page-sustainability-image about-page-reveal">

            <img
              src="/images/about/tmch-about-vessel.jpg"
              alt="TMCH marine environmental operations"
            />

          </div>

          <div className="about-page-sustainability-content">

            <div className="about-page-small-label about-page-reveal">
              OUR COMMITMENT
            </div>

            <h2 className="about-page-reveal">
              Environmental
              <br />
              responsibility meets
              <br />
              <span>operational efficiency.</span>
            </h2>

            <p className="about-page-reveal">
              TMCH is focused on delivering solutions that support
              environmental stewardship while helping clients
              maintain efficient and responsible operations.
            </p>

            <p className="about-page-reveal">
              From waste reduction and oil spill recovery to
              eco-conscious disposal methods, our approach is
              centred on creating practical solutions for a cleaner,
              greener future.
            </p>

            <a
              href="/contact"
              className="about-page-outline-link about-page-reveal"
            >
              Work With TMCH
              <ArrowUpRight size={18} />
            </a>

          </div>

        </section>


        {/* =========================================
            MISSION / VISION
        ========================================= */}

        <section className="about-page-mission">

          <div className="about-page-mission-header about-page-reveal">

            <div className="about-page-small-label">
              WHAT DRIVES US
            </div>

            <h2>
              Purpose behind
              <br />
              <span>the work.</span>
            </h2>

          </div>


          <div className="about-page-mission-grid">

            <article className="about-mission-card about-page-reveal">

              <div className="about-mission-card-top">
                <span>01</span>
                <span>MISSION</span>
              </div>

              <h3>
                Committed to becoming a solution provider of choice
                in our range of services.
              </h3>

            </article>


            <article className="about-mission-card about-page-reveal">

              <div className="about-mission-card-top">
                <span>02</span>
                <span>VISION</span>
              </div>

              <h3>
                To be an indigenous company most admired for her
                Quality of Service.
              </h3>

            </article>

          </div>

        </section>


        {/* =========================================
            STATS
        ========================================= */}

        <section className="about-page-stats">

          <div className="about-page-stats-dots">
            {Array.from({ length: 48 }).map((_, index) => (
              <span key={index}></span>
            ))}
          </div>

          <div className="about-page-stats-header about-page-reveal">

            <div className="about-page-small-label">
              TMCH BY THE NUMBERS
            </div>

            <h2>
              Experience you
              <br />
              can <span>measure.</span>
            </h2>

          </div>


          <div className="about-page-stats-grid">

            <div className="about-page-stat about-page-reveal">
              <strong>13</strong>
              <span>Expert Staff</span>
            </div>

            <div className="about-page-stat about-page-reveal">
              <strong>27</strong>
              <span>Projects Completed</span>
            </div>

            <div className="about-page-stat about-page-reveal">
              <strong>6</strong>
              <span>Clients Served</span>
            </div>

          </div>

        </section>


        {/* =========================================
            FINAL CTA
        ========================================= */}

        <section className="about-page-cta">

          <div className="about-page-cta-dots">
            {Array.from({ length: 32 }).map((_, index) => (
              <span key={index}></span>
            ))}
          </div>

          <div className="about-page-cta-inner about-page-reveal">

            <div className="about-page-small-label">
              LET'S WORK TOGETHER
            </div>

            <h2>
              Building a cleaner,
              <br />
              more sustainable
              <br />
              <span>future.</span>
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

export default About;