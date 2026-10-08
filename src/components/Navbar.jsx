import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <a href="/" className="navbar-logo">
        <img
          src="/images/tmchlogo.png"
          alt="TMCH Group Limited"
        />
      </a>

      <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <a href="/" onClick={() => setMenuOpen(false)}>
          Home
        </a>

        <a href="/about" onClick={() => setMenuOpen(false)}>
          About Us
        </a>

        <a href="/services" onClick={() => setMenuOpen(false)}>
          Services
        </a>

        <a href="/projects" onClick={() => setMenuOpen(false)}>
          Projects
        </a>

        <a href="/blog" onClick={() => setMenuOpen(false)}>
          Blog
        </a>

        <a href="/contact" onClick={() => setMenuOpen(false)}>
          Contact Us
        </a>
      </nav>

      <a href="/contact" className="nav-contact">
        Get A Quote
        <ArrowUpRight size={17} />
      </a>

      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </header>
  );
}

export default Navbar;