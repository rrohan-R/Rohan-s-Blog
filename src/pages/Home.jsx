import { useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentHead } from "../hooks/useDocumentHead";
import { profile } from "../data/profile";
import { experience } from "../data/experience";
import { projects } from "../data/projects";
import { posts } from "../data/blog";
import { skillCategories } from "../data/skills";
import ProjectCard from "../components/ProjectCard";
import BlogCard from "../components/BlogCard";
import { ArrowRightIcon, GitHubIcon, MailIcon } from "../components/Icons";
import "./Home.css";

const TABS = ["Developer.java", "Skills.json", "Deploy.sh"];

export default function Home() {
  useDocumentHead({
    title: undefined,
    description: profile.tagline,
  });

  const [activeTab, setActiveTab] = useState(TABS[0]);
  const current = experience.find((e) => e.current);
  const featured = projects.slice(0, 3);
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <img src={profile.photo} alt={profile.name} className="hero__avatar" />
            <div className="eyebrow">Available to ship complex tasks</div>
            <h1 className="hero__title">
              {profile.name}
              <span className="hero__title-sub">{profile.title}</span>
            </h1>
            <p className="hero__lede">{profile.tagline}</p>
            <div className="hero__ctas">
              <Link to="/projects" className="btn btn-primary">
                View My Work <ArrowRightIcon />
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Let's Connect
              </Link>
            </div>
            <div className="hero__links">
              <a href={profile.github} target="_blank" rel="noreferrer">
                <GitHubIcon /> github.com/{profile.githubHandle}
              </a>
              <a href={`mailto:${profile.email}`}>
                <MailIcon /> {profile.email}
              </a>
            </div>
          </div>

          <div className="hero__editor">
            <div className="editor__tabbar" role="tablist" aria-label="Developer profile files">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={`editor__tab ${activeTab === tab ? "editor__tab--active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="editor__body">
              {activeTab === "Developer.java" && (
                <pre>
<span className="tok-kw">public class</span> <span className="tok-cls">Developer</span> {"{"}
{"\n"}    <span className="tok-kw">private</span> String name = <span className="tok-str">"{profile.name}"</span>;
{"\n"}    <span className="tok-kw">private</span> String role = <span className="tok-str">"{profile.title}"</span>;
{"\n"}    <span className="tok-kw">private</span> String[] stack = {"{"}
{"\n"}        <span className="tok-str">"Java"</span>, <span className="tok-str">"Spring"</span>, <span className="tok-str">"React"</span>,
{"\n"}        <span className="tok-str">"PostgreSQL"</span>, <span className="tok-str">"AWS"</span>, <span className="tok-str">"Docker"</span>,
{"\n"}        <span className="tok-str">"AI"</span>, <span className="tok-str">"Claude Code"</span>
{"\n"}    {"}"};
{"\n"}
{"\n"}    <span className="tok-kw">public void</span> <span className="tok-fn">ship</span>() {"{"}
{"\n"}        <span className="tok-cmt">// building at {current?.company ?? "Metquay Inc."}</span>
{"\n"}        api.secure(<span className="tok-str">"JWT"</span>).exposeRestEndpoints();
{"\n"}        chain = <span className="tok-cls">LCEL</span>.pipe(prompt, geminiModel);
{"\n"}        deployment.push(<span className="tok-str">"AWS"</span>, <span className="tok-str">"Render"</span>, <span className="tok-str">"Vercel"</span>);
{"\n"}    {"}"}
{"\n"}{"}"}<span className="editor__cursor">▍</span>
                </pre>
              )}

              {activeTab === "Skills.json" && (
                <pre>
                  {"{"}
                  {skillCategories.map((cat, ci) => {
                    const key = cat.label.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
                    return (
                      <span key={cat.label}>
                        {"\n"}  <span className="tok-str">"{key}"</span>: [{"\n"}
                        {cat.items.map((item, ii) => (
                          <span key={item}>
                            {"    "}<span className="tok-str">"{item}"</span>{ii < cat.items.length - 1 ? "," : ""}{"\n"}
                          </span>
                        ))}
                        {"  ]"}{ci < skillCategories.length - 1 ? "," : ""}
                      </span>
                    );
                  })}
                  {"\n"}{"}"}<span className="editor__cursor">▍</span>
                </pre>
              )}

              {activeTab === "Deploy.sh" && (
                <pre>
<span className="tok-cmt">#!/bin/bash</span>
{"\n"}<span className="tok-cmt"># build & containerize the backend</span>
{"\n"}<span className="tok-fn">docker</span> build -t metquay/service:latest .
{"\n"}<span className="tok-fn">docker</span> push metquay/service:latest
{"\n"}
{"\n"}<span className="tok-cmt"># redeploy the running container via Portainer's API</span>
{"\n"}<span className="tok-fn">curl</span> -X POST <span className="tok-str">"$PORTAINER_WEBHOOK"</span>
{"\n"}
{"\n"}<span className="tok-cmt"># ship the frontend + AI side projects</span>
{"\n"}<span className="tok-fn">vercel</span> --prod
{"\n"}<span className="tok-fn">streamlit</span> run main.py <span className="tok-cmt"># findyourmoviez.streamlit.app</span>
{"\n"}
{"\n"}<span className="tok-kw">echo</span> <span className="tok-str">"deployed ✓"</span><span className="editor__cursor">▍</span>
                </pre>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="quicklook">
            {skillCategories.slice(0, 4).map((cat) => (
              <div key={cat.label} className="quicklook__item">
                <span className="quicklook__file">{cat.file}</span>
                <span className="quicklook__label">{cat.label}</span>
                <span className="quicklook__count">{cat.items.length} skills</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--row">
            <div>
              <div className="eyebrow">Projects/</div>
              <h2>Featured work</h2>
              <p>Real projects, built end to end — from designs to real workflows.</p>
            </div>
            <Link to="/projects" className="btn btn-outline">
              View All Projects →
            </Link>
          </div>
          <div className="grid-3">
            {featured.map((p) => (
              <ProjectCard project={p} key={p.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ borderBottom: "none" }}>
        <div className="container">
          <div className="section-head section-head--row">
            <div>
              <div className="eyebrow">Blog/</div>
              <h2>Latest from the blog</h2>
              <p>Notes on Spring, PostgreSQL, agentic AI with LangChain/LangGraph, and deploying full-stack applications.</p>
            </div>
            <Link to="/blog" className="btn btn-outline">
              View All Articles →
            </Link>
          </div>
          <div className="grid-3">
            {latestPosts.map((post) => (
              <BlogCard post={post} key={post.slug} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
