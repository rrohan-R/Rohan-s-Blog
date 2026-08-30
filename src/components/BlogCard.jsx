import { Link } from "react-router-dom";
import { ArrowRightIcon } from "./Icons";
import "./BlogCard.css";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function BlogCard({ post }) {
  return (
    <article className="card bcard">
      <span className="tag bcard__cat">{post.category}</span>
      <h3 className="bcard__title">
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="bcard__excerpt">{post.excerpt}</p>
      <div className="bcard__meta">
        <span>{formatDate(post.date)}</span>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime}</span>
      </div>
      <Link to={`/blog/${post.slug}`} className="bcard__link">
        Read article <ArrowRightIcon />
      </Link>
    </article>
  );
}
