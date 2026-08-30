import { useDocumentHead } from "../hooks/useDocumentHead";
import { certifications, achievements } from "../data/achievements";
import "./Achievements.css";

export default function Achievements() {
  useDocumentHead({
    title: "Achievements",
    description: "Certifications and achievements.",
  });

  return (
    <div className="container page">
      <div className="eyebrow">Achievements.md</div>
      <h1 className="page__title">Achievements & certifications</h1>
      <p className="page__lede">A short, honest list — no inflated numbers, just what I've actually earned.</p>

      <div className="ach__grid">
        <section>
          <h3 className="ach__heading">Certifications</h3>
          <div className="ach__list">
            {certifications.map((c) => (
              <div className="card ach__item" key={c.name}>
                <div className="ach__icon">🎓</div>
                <div>
                  <div className="ach__title">{c.name}</div>
                  <div className="ach__sub">{c.issuer}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="ach__heading">Workshops & competitions</h3>
          <div className="ach__list">
            {achievements.map((a) => (
              <div className="card ach__item" key={a.title}>
                <div className="ach__icon">🏅</div>
                <div>
                  <div className="ach__title">{a.title}</div>
                  <div className="ach__sub">{a.type}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
