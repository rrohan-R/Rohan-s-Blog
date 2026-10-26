# Rohan Ramesh — Developer Portfolio & Technical Blog

A React portfolio and technical blog for a Full Stack Developer working across
Java/Spring Boot, React, and — more recently — agentic AI apps built with
LangChain/LangGraph. Core experience/skills content is sourced from the
resume; the AI-related content and the FindYourMovie project were added per
direct instruction, with GitHub used to verify links where possible.

## Stack

- React 19 + Vite
- React Router (client-side routing)
- Plain CSS with design tokens (no CSS framework), dark/light theme via
  `data-theme` + `localStorage`
- No external UI libraries — icons are hand-written inline SVGs

## Getting started

    npm install
    npm run dev       # start local dev server
    npm run build     # production build -> dist/
    npm run preview   # preview the production build locally

## Project structure

    src/
      components/   Navbar, Footer, ProjectCard, BlogCard, Markdown renderer, icons
      context/      ThemeContext (dark/light mode)
      data/         profile.js, experience.js, skills.js, projects.js, blog.js, achievements.js
      hooks/        useDocumentHead (basic per-page SEO: title + meta description)
      pages/        one file per route
      styles/       shared page layout styles
      App.jsx       route definitions
      main.jsx      app entry point

## Editing content

Everything editable lives in `src/data/`. To add a new project, add an entry to
`src/data/projects.js` — a project detail page is generated automatically at
`/projects/<slug>`. Same pattern for blog posts in `src/data/blog.js` (write
the body using the small Markdown subset supported by
`src/components/Markdown.jsx`: `##` headings, fenced code blocks, `- ` lists,
numbered lists, `**bold**`, `` `inline code` ``, and `[text](url)` links).

## Resume

`public/Rohan-R_Resume.pdf` is served statically and linked from the footer's
"Resume" link.

## Deploying

The build output in `dist/` after `npm run build` is a static site — it can be
deployed as-is to Vercel, Netlify, GitHub Pages, or any static host. If
deploying to a host that doesn't rewrite unknown paths to `index.html`,
configure a fallback/rewrite rule so client-side routes (e.g.
`/projects/job-application-platform`) resolve correctly on a hard refresh.

## Notes on content accuracy

All experience, skills, education, and project descriptions come from the
resume provided. GitHub (github.com/rrohan-R) was checked only to confirm
repository URLs and the live demo link for the Job Application Platform
(https://job-application-frontend-delta.vercel.app/). No technologies,
companies, achievements, or deployment links were invented.
