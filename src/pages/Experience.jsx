import { useDocumentHead } from "../hooks/useDocumentHead";
import { experience } from "../data/experience";
import "./Experience.css";

export default function Experience() {
  useDocumentHead({
    title: "Experience",
    description: "Professional experience — Metquay Inc. and Quest Global.",
  });

  return (
    <div className="container page">
      <div className="eyebrow">Experience.log</div>
      <h1 className="page__title">Where I've worked</h1>
      <p className="page__lede">
        A log of the roles I've held so far, and what I actually worked on in each — backend, frontend,
        deployment, and testing.
      </p>

      <div className="timeline">
        {experience.map((job) => (
          <div className="timeline__item" key={job.company}>
            <div className="timeline__rail">
              <span className={`timeline__dot ${job.current ? "timeline__dot--current" : ""}`} />
              <span className="timeline__line" />
            </div>
            <div className="card timeline__card">
              <div className="timeline__head">
                <div>
                  <h3 className="timeline__role">{job.role}</h3>
                  <div className="timeline__company">
                    {job.company}
                    {job.location && <span className="timeline__location"> · {job.location}</span>}
                  </div>
                </div>
                <div className="timeline__duration">
                  {job.current && <span className="badge-live">Current</span>}
                  <span>{job.duration}</span>
                </div>
              </div>

              <ul className="timeline__points">
                {job.points.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>

              <div className="timeline__tags">
                {job.tech.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
