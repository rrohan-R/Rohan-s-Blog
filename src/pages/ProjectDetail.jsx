import { useParams, Link, Navigate } from "react-router-dom";
import { useDocumentHead } from "../hooks/useDocumentHead";
import { projects } from "../data/projects";
import { GitHubIcon, ExternalLinkIcon } from "../components/Icons";
import "./ProjectDetail.css";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  useDocumentHead({
    title: project?.name ?? "Project",
    description: project?.short,
  });

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <div className="container page">
      <Link to="/projects" className="btn btn-ghost pdetail__back">← Back to projects</Link>

      <div className="pdetail__head">
        <div>
          {project.status === "live" ? (
            <span className="badge-live">Live / Deployed</span>
          ) : (
            <span className="badge-source">Source available</span>
          )}
          <h1 className="page__title" style={{ marginTop: 14 }}>{project.name}</h1>
          <p className="page__lede" style={{ marginBottom: 0 }}>{project.short}</p>
        </div>
        <div className="pdetail__actions">
          <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline">
            <GitHubIcon width="16" height="16" /> GitHub
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-primary">
              <ExternalLinkIcon /> Live Demo
            </a>
          )}
        </div>
      </div>

      <div className="pdetail__tags">
        {project.tech.map((t) => (
          <span className="tag" key={t}>{t}</span>
        ))}
      </div>

      <div className="pdetail__grid">
        <div className="pdetail__main">
          <section className="pdetail__block">
            <h3>Problem</h3>
            <p>{project.problem}</p>
          </section>
          <section className="pdetail__block">
            <h3>Solution</h3>
            <p>{project.solution}</p>
          </section>
          <section className="pdetail__block">
            <h3>Key features</h3>
            <ul>
              {project.features.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </section>
          {project.liveNote && (
            <div className="pdetail__note">
              <strong>Note:</strong> {project.liveNote}
            </div>
          )}
        </div>

        <aside className="card pdetail__side">
          <h4>Tech stack</h4>
          <div className="pdetail__side-tags">
            {project.tech.map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
          <hr className="pdetail__hr" />
          <a href={project.github} target="_blank" rel="noreferrer" className="pdetail__side-link">
            <GitHubIcon width="16" height="16" /> View source on GitHub
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="pdetail__side-link">
              <ExternalLinkIcon /> Open live demo
            </a>
          )}
        </aside>
      </div>
    </div>
  );
}
