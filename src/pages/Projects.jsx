import { useDocumentHead } from "../hooks/useDocumentHead";
import { projects, otherRepos } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import { GitHubIcon } from "../components/Icons";
import "./Projects.css";

export default function Projects() {
  useDocumentHead({
    title: "Projects",
    description: "Featured projects built with Java, Spring Boot, React, and PostgreSQL.",
  });

  const live = projects.filter((p) => p.status === "live");

  return (
    <div className="container page">
      <div className="eyebrow">Projects/</div>
      <h1 className="page__title">Featured projects</h1>
      <p className="page__lede">
        A selection of projects that show real engineering work — from a LangChain-based AI app to secure,
        full-stack applications with real schema design behind them.
      </p>

      <div className="grid-3">
        {projects.map((p) => (
          <ProjectCard project={p} key={p.slug} />
        ))}
      </div>

      {live.length > 0 && (
        <section className="production">
          <h2 className="production__title">Projects in Production</h2>
          <p className="production__lede">Projects that are actually deployed and reachable right now.</p>
          {live.map((p) => (
            <div className="card production__card" key={p.slug}>
              <div className="production__info">
                <span className="badge-live">Live</span>
                <h3>{p.name}</h3>
                <p>{p.short}</p>
                {p.platform && (
                  <div className="production__meta">
                    {p.platform.map((item) => (
                      <span key={item.label}><strong>{item.label}:</strong> {item.value}</span>
                    ))}
                  </div>
                )}
                {p.liveNote && <p className="production__note">{p.liveNote}</p>}
              </div>
              <div className="production__actions">
                <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-primary">
                  View Live Demo
                </a>
                <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-outline">
                  <GitHubIcon width="16" height="16" /> Source
                </a>
              </div>
            </div>
          ))}
        </section>
      )}

      <section className="more-repos">
        <h2 className="production__title">More on GitHub</h2>
        <p className="production__lede">
          A few other repositories from earlier coursework and my internship at Quest Global.
        </p>
        <div className="repo-list">
          {otherRepos.map((r) => (
            <a href={r.url} target="_blank" rel="noreferrer" className="card repo-item" key={r.name}>
              <div>
                <div className="repo-item__name">{r.name}</div>
                {r.note && <div className="repo-item__note">{r.note}</div>}
              </div>
              <span className="tag">{r.language}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
