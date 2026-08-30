import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col">
          <div className="footer__brand">
            <span className="nav__prompt" style={{ color: "var(--accent)" }}>~/</span>
            {profile.name}
          </div>
          <p className="footer__desc">{profile.title} building full-stack applications with a growing focus on agentic AI.</p>
          <div className="footer__socials">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><MailIcon /></a>
          </div>
        </div>

        <div className="footer__col">
          <span className="footer__heading">Site</span>
          <Link to="/about">About</Link>
          <Link to="/experience">Experience</Link>
          <Link to="/skills">Skills</Link>
          <Link to="/projects">Projects</Link>
        </div>

        <div className="footer__col">
          <span className="footer__heading">More</span>
          <Link to="/blog">Blog</Link>
          <Link to="/achievements">Achievements</Link>
          <Link to="/contact">Contact</Link>
          <a href={profile.resumeFile} target="_blank" rel="noreferrer">Resume</a>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
      </div>
    </footer>
  );
}
