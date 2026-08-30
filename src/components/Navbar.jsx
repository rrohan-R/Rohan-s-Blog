import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { profile } from "../data/profile";
import { GitHubIcon, LinkedInIcon, SunIcon, MoonIcon, MenuIcon, CloseIcon } from "./Icons";
import "./Navbar.css";

const NAV_ITEMS = [
  { to: "/", label: "Home", file: "Home.jsx" },
  { to: "/about", label: "About", file: "About.md" },
  { to: "/experience", label: "Experience", file: "Experience.log" },
  { to: "/skills", label: "Skills", file: "Skills.json" },
  { to: "/projects", label: "Projects", file: "Projects/" },
  { to: "/blog", label: "Blog", file: "Blog/" },
  { to: "/achievements", label: "Achievements", file: "Achievements.md" },
  { to: "/contact", label: "Contact", file: "Contact.sh" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [typeof window !== "undefined" ? window.location.pathname : ""]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__brand">
          <span className="nav__prompt">~/</span>rohan-ramesh
        </Link>

        <nav className="nav__tabs" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => `nav__tab ${isActive ? "nav__tab--active" : ""}`}
            >
              <span className="nav__tab-label">{item.label}</span>
              <span className="nav__tab-file">{item.file}</span>
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <a href={profile.github} target="_blank" rel="noreferrer" className="nav__icon-btn" aria-label="GitHub profile">
            <GitHubIcon />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="nav__icon-btn" aria-label="LinkedIn profile">
            <LinkedInIcon />
          </a>
          <button className="nav__icon-btn" onClick={toggleTheme} aria-label="Toggle color theme">
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <Link to="/contact" className="btn btn-primary nav__cta">
            Let's Connect
          </Link>
          <button className="nav__icon-btn nav__menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div className="nav__mobile">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => `nav__mobile-link ${isActive ? "nav__mobile-link--active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
              <span className="nav__tab-file">{item.file}</span>
            </NavLink>
          ))}
          <div className="nav__mobile-socials">
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-outline">
              <GitHubIcon /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline">
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
