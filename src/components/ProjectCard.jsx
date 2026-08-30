import { Link } from "react-router-dom";
import { GitHubIcon, ExternalLinkIcon } from "./Icons";
import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  return (
    <article className="card pcard">
      <div className="pcard__top">
        {project.status === "live" ? (
          <span className="badge-live">Live / Deployed</span>
        ) : (
          <span className="badge-source">Source available</span>
        )}
      </div>

      <h3 className="pcard__title">
        <Link to={`/projects/${project.slug}`}>{project.name}</Link>
      </h3>
      <p className="pcard__desc">{project.short}</p>

      <div className="pcard__tags">
        {project.tech.slice(0, 5).map((t) => (
          <span className="tag" key={t}>{t}</span>
        ))}
      </div>

      <div className="pcard__actions">
        <Link to={`/projects/${project.slug}`} className="btn btn-outline pcard__btn">
          View Project
        </Link>
        <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-ghost pcard__btn">
          <GitHubIcon width="16" height="16" /> GitHub
        </a>
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-ghost pcard__btn">
            <ExternalLinkIcon /> Live Demo
          </a>
        )}
      </div>
    </article>
  );
}
