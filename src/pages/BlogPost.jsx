import { useParams, Link, Navigate } from "react-router-dom";
import { useDocumentHead } from "../hooks/useDocumentHead";
import { posts } from "../data/blog";
import Markdown, { extractHeadings } from "../components/Markdown";
import "./BlogPost.css";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPost() {
  const { slug } = useParams();
  const index = posts.findIndex((p) => p.slug === slug);
  const post = posts[index];

  useDocumentHead({
    title: post?.title,
    description: post?.excerpt,
  });

  if (!post) return <Navigate to="/blog" replace />;

  const headings = extractHeadings(post.content);
  const prev = posts[index - 1];
  const next = posts[index + 1];
  const related = posts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 2);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="container page bpost">
      <Link to="/blog" className="btn btn-ghost pdetail__back">← All articles</Link>

      <article className="bpost__grid">
        <div className="bpost__main">
          <span className="tag bcard__cat">{post.category}</span>
          <h1 className="bpost__title">{post.title}</h1>
          <p className="bpost__subtitle">{post.subtitle}</p>

          <div className="bpost__meta">
            <span>By Rohan Ramesh</span>
            <span aria-hidden="true">·</span>
            <span>{formatDate(post.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>

          <div className="bpost__tags">
            {post.tags.map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>

          <div className="bpost__share">
            <span>Share:</span>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer">X</a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>

          <Markdown content={post.content} />

          <div className="bpost__nav">
            {prev ? (
              <Link to={`/blog/${prev.slug}`} className="bpost__navlink">
                <span className="bpost__navlabel">← Previous</span>
                <span>{prev.title}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link to={`/blog/${next.slug}`} className="bpost__navlink bpost__navlink--right">
                <span className="bpost__navlabel">Next →</span>
                <span>{next.title}</span>
              </Link>
            ) : <span />}
          </div>
        </div>

        <aside className="bpost__side">
          {headings.length > 0 && (
            <div className="card bpost__toc">
              <h4>On this page</h4>
              <nav>
                {headings.map((h) => (
                  <a href={`#${h.id}`} key={h.id}>{h.text}</a>
                ))}
              </nav>
            </div>
          )}

          {related.length > 0 && (
            <div className="card bpost__related">
              <h4>Related articles</h4>
              {related.map((r) => (
                <Link to={`/blog/${r.slug}`} key={r.slug} className="bpost__related-item">
                  {r.title}
                </Link>
              ))}
            </div>
          )}
        </aside>
      </article>
    </div>
  );
}
