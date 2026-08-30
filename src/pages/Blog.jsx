import { useState } from "react";
import { useDocumentHead } from "../hooks/useDocumentHead";
import { posts, categories } from "../data/blog";
import BlogCard from "../components/BlogCard";
import "./Blog.css";

export default function Blog() {
  useDocumentHead({
    title: "Blog",
    description: "Technical writing on Spring, PostgreSQL, deployment, and generative & agentic AI with LangChain.",
  });

  const [active, setActive] = useState("All");
  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <div className="container page">
      <div className="eyebrow">Blog/</div>
      <h1 className="page__title">Technical blog</h1>
      <p className="page__lede">
        Write-ups from things I've actually built — Spring and PostgreSQL on the backend, the deployment
        pipeline that ships a service to production, and lately, generative and agentic AI apps built with
        LangChain and LangGraph.
      </p>

      <div className="blog__filters">
        <button
          className={`blog__filter ${active === "All" ? "blog__filter--active" : ""}`}
          onClick={() => setActive("All")}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            className={`blog__filter ${active === c ? "blog__filter--active" : ""}`}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid-3">
        {filtered.map((post) => (
          <BlogCard post={post} key={post.slug} />
        ))}
      </div>
    </div>
  );
}
