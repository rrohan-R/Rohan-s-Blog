import { useDocumentHead } from "../hooks/useDocumentHead";
import { profile } from "../data/profile";
import { education } from "../data/experience";
import "./About.css";

export default function About() {
  useDocumentHead({
    title: "About",
    description: profile.summary,
  });

  return (
    <div className="container page">
      <div className="eyebrow">About.md</div>
      <h1 className="page__title">About me</h1>

      <div className="about__grid">
        <div className="about__prose">
          <p>{profile.summary}</p>
          <p>
            Most of what I do lives at the intersection of the backend and the data it depends on: designing
            REST APIs in Spring Boot, shaping PostgreSQL schemas, and making sure the queries behind them stay
            fast as data grows. I pair that with React (and, at work, Vaadin) for the interfaces that sit on top. 
            I also use various AI tools and frameworks to automate most of my works.
          </p>
          <p>
            Outside of feature work, I spend time on vibe coding by experimenting with generative AI frameworks and workflows, handling it's deployment and reliability, containerizing services with
            Docker, running them on Vercel, Render etc..., — and on testing, since a feature
            isn't really done until it's verified.
          </p>
          <p>
            More recently I've been building with LangChain and creating RAG workflows and I'm now exploring LangGraph to
            take that from a single model call toward something closer to an agent. I use tools like Claude
            Code as part of that workflow.
          </p>

          <h3 className="about__subhead">Currently focused on</h3>
          <ul className="about__list">
            {profile.currentFocus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <aside className="about__card card">
          <h3 className="about__card-title">Education</h3>
          {education.map((e) => (
            <div className="about__edu" key={e.school + e.degree}>
              <div className="about__edu-top">
                <span className="about__edu-degree">{e.degree}</span>
                <span className="about__edu-duration">{e.duration}</span>
              </div>
              <div className="about__edu-school">{e.school}</div>
              <div className="about__edu-detail">{e.detail}</div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
