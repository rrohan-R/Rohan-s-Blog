import { useDocumentHead } from "../hooks/useDocumentHead";
import { skillCategories } from "../data/skills";
import "./Skills.css";

export default function Skills() {
  useDocumentHead({
    title: "Skills",
    description: "Languages, frameworks, databases, and tools I work with.",
  });

  return (
    <div className="container page">
      <div className="eyebrow">Skills.json</div>
      <h1 className="page__title">What I work with</h1>
      <p className="page__lede">
        Organized the way I'd organize a project's dependencies — grouped by what each tool is actually for.
        Mostly Spring and PostgreSQL day to day, plus generative AI and LLMs — LangChain, LangGraph, and Google
        Gemini — for the agentic AI work I've been building on the side.
      </p>

      <div className="skills-grid">
        {skillCategories.map((cat) => (
          <div className="card skill-card" key={cat.label}>
            <div className="skill-card__head">
              <span className="skill-card__file">{cat.file}</span>
              <h3 className="skill-card__title">{cat.label}</h3>
            </div>
            <div className="skill-card__items">
              {cat.items.map((item) => (
                <span className="tag skill-card__tag" key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
