export const posts = [
  {
    slug: "generative-ai-vs-agentic-ai",
    title: "Generative AI vs Agentic AI: What the Terms Actually Mean",
    subtitle: "Sorting out LLMs, generative AI, and agentic AI before building with any of them",
    category: "AI",
    tags: ["Generative AI", "LLMs", "Agentic AI"],
    date: "2026-08-05",
    readingTime: "5 min read",
    excerpt:
      "Before I built anything with LangChain, I had to get straight on what these overlapping terms actually mean — an LLM is not generative AI is not an agent, even though people use them interchangeably.",
    content: `
## Three terms, three different things

"AI," "generative AI," "LLM," and "agentic AI" get used almost interchangeably in most conversations, but they're not the same layer of the stack. Getting this straight mattered before I started building anything, because each one implies a different set of engineering problems.

- **LLM (Large Language Model)** — the model itself. Something like Gemini or GPT: a system trained to predict the next token given some context. On its own, it's just a function that turns text in into text out.
- **Generative AI** — the broader category of models that generate new content (text, images, audio, code) rather than classify or predict a label. LLMs are one kind of generative AI; image models like Stable Diffusion are another.
- **Agentic AI** — a system built *around* a generative model that can plan, use tools, hold state across steps, and take more than one action toward a goal, instead of producing a single output for a single input.

## Where this showed up in practice

FindYourMovie is a clean example of the first two layers: Google Gemini (the LLM) is a generative AI model that I prompt to generate a structured list of movies. It's a single call — input filters in, JSON out. There's no planning, no tool use, no multi-step reasoning. It's generative AI, but it isn't agentic.

What would make it agentic is exactly the gap I ran into: the model sometimes returns IMDb links from memory that don't actually resolve to the right title. A single generative call has no way to notice or correct that. An agentic version of the same app would need a loop: generate a candidate, call a tool (like the OMDb API) to verify it, and only then show the result — deciding on its own whether a step succeeded before moving to the next one.

## Why the distinction matters for engineering decisions

If a task is genuinely single-step — classify this, summarize that, generate this JSON from this input — reaching for an agent framework is usually overkill. It adds state management, more failure modes, and more latency for no real benefit. The distinction I now use to decide is simple: if the task needs the system to *check its own work* or *decide what to do next* based on an intermediate result, that's when it's worth reaching for something agentic — LangGraph, in my case — instead of a single LangChain chain.

## Where LangChain and LangGraph fit

LangChain is the layer for the generative AI half of this — prompt templates, model calls, output parsing (LCEL is exactly this). LangGraph is the layer for the agentic half — modeling the branches, loops, and state that a single chain can't express. Understanding that division is what's shaped how I've been picking up LangGraph: not as "LangChain but fancier," but as a genuinely different tool for a genuinely different class of problem.
`,
  },
  {
    slug: "findyourmovie-langchain-app",
    title: "Building FindYourMovie: A LangChain-Powered Movie Recommender",
    subtitle: "Turning a plain-language description into real movie recommendations",
    category: "AI",
    tags: ["LangChain", "Gemini", "Streamlit", "Python"],
    date: "2026-08-10",
    readingTime: "6 min read",
    excerpt:
      "How I built FindYourMovie — a Streamlit app that recommends movies by language, genre, and year using Google Gemini through a LangChain LCEL pipeline, plus the JSON-parsing and IMDb-link issues I ran into along the way.",
    content: `
## The itch that started it

Scrolling through a streaming app's catalog to find something to watch takes longer than it should. I wanted something simpler: pick a language, a genre, and a year, and get back a short list of real movies worth considering — no infinite scroll required.

That's FindYourMovie: a small Streamlit app where you set three filters in the sidebar and get 8 matching movie titles back, each linked to IMDb.

## Why LangChain's LCEL for this

The core of the app isn't really "search" — it's a single, well-structured prompt to an LLM asking for a specific, parseable output. LangChain's Expression Language (LCEL) is a good fit here because it lets you compose the prompt template and the model call into a clean pipeline rather than hand-wiring string formatting and a raw API call:

\`\`\`text
sidebar inputs (language, genre, year)
    -> LCEL pipeline
    -> Gemini prompt asking for 8 movies as JSON
    -> parsed response: [{ title, imdb_link }, ...]
    -> rendered as clickable results in Streamlit
\`\`\`

The project is split cleanly along that line: \`main.py\` handles the Streamlit UI and sidebar state, and \`langchain_helper.py\` owns the LangChain pipeline and the Gemini call.

## Getting the model to return usable JSON

Asking an LLM for structured output is easy; getting it to *only* return that structure, every time, is the actual work. Gemini would occasionally wrap the JSON array in a sentence or markdown code fence instead of returning it raw. Rather than fighting the prompt indefinitely, I added fallback parsing on the response so the app can still extract the JSON array even when the model adds extra text around it — a small amount of defensive code that made the difference between "works in testing" and "works reliably."

## A limitation I'm upfront about

The IMDb links in the results are generated by Gemini from its training data, not fetched from a live source. That means a few can be stale or occasionally point to the wrong title — the model is recalling an ID, not looking one up. It's a known limitation, and the real fix is straightforward: run each recommended title through the free OMDb API before displaying it, and use the *real* IMDb link that comes back instead of trusting the model's memory. That's the concrete next step for this project rather than something aspirational — a good reminder that LLM output should usually be treated as a draft to verify, not a source of truth for factual details like IDs and URLs.
`,
  },
  {
    slug: "learning-agentic-ai-langchain-langgraph",
    title: "Learning Agentic AI: LangChain, LangGraph, and Where I'm Headed Next",
    subtitle: "Notes from moving beyond single-prompt LLM calls",
    category: "AI",
    tags: ["Agentic AI", "LangChain", "LangGraph"],
    date: "2026-08-24",
    readingTime: "6 min read",
    excerpt:
      "Why a single prompt-and-response call stops being enough once you want an app that can plan, use tools, and act on multi-step tasks — and what I've been learning to get there.",
    content: `
## Where a single LLM call falls short

Building FindYourMovie with a single LangChain LCEL pipeline was enough to get a working app — set some filters, get a structured response back from Gemini. But it also showed me the ceiling of that approach pretty quickly. A single call can interpret one input and produce one output. It can't verify its own answer (which is exactly why FindYourMovie's IMDb links sometimes point to the wrong title — nothing checks the model's output against reality), decide it needs more information, or call another tool to fix a gap it introduced. That's the space "agentic AI" is meant to close: systems that can plan a sequence of actions, use tools along the way, and adapt based on intermediate results instead of committing to one shot.

## What LangGraph adds on top of LangChain

LangChain gives you the building blocks — prompts, chains, tool wrappers. LangGraph adds the missing piece for agentic behavior: a graph structure for defining how those pieces connect, including branches, loops, and conditional edges. Instead of a straight line from input to output, you can model a workflow like:

\`\`\`text
receive query
    -> is it specific enough?
        -> yes: retrieve and respond
        -> no: ask a clarifying question -> loop back
\`\`\`

That loop-and-branch structure is exactly what a single LangChain chain can't express cleanly on its own.

## What I've actually been doing to learn this

Concretely, my approach has been:

- Prototyping a LangGraph node that verifies FindYourMovie's IMDb links against the OMDb API before displaying them, instead of trusting whatever ID Gemini recalls from memory
- Reading through LangGraph's state-management model closely, since tracking state across steps is the part that's genuinely different from a normal LangChain chain
- Using Claude Code as a pairing tool while experimenting — it's useful for quickly scaffolding a graph structure and then letting me focus on whether the logic is actually right

## Where this is going

The goal isn't to bolt "agentic" onto everything — a lot of problems are genuinely single-step and don't need a graph. But for the class of problems I keep running into (ambiguous input, multi-step reasoning, needing to call more than one tool), LangGraph is the piece I've been missing, and it's the area I'm spending most of my current learning time on.
`,
  },
  {
    slug: "spring-security-jwt-role-based-auth",
    title: "Securing a Spring Boot API with JWT and Role-Based Access",
    subtitle: "How I set up Admin/User authorization for the Job Application Platform",
    category: "Spring",
    tags: ["Java", "Spring Security", "JWT", "REST APIs"],
    date: "2026-06-14",
    readingTime: "7 min read",
    excerpt:
      "A walkthrough of the authentication and authorization setup I built for a full-stack job portal — stateless JWTs, role-based route protection, and the mistakes I made along the way.",
    content: `
## Why stateless auth

When I built the Job Application Platform, I needed two clearly separated experiences: **Admins** who post and manage jobs, and **Users** who apply to them. Session-based auth would have worked, but I wanted the backend to stay stateless so it could scale independently of the React frontend and be easy to deploy behind a load balancer later.

That pointed to JWT: the server issues a signed token at login, the client attaches it to every request, and Spring Security verifies it on the way in — no server-side session store required.

## The building blocks

The setup has three moving parts:

1. A \`JwtService\` that signs and parses tokens
2. A \`JwtAuthFilter\` that runs once per request and populates the security context
3. A \`SecurityFilterChain\` bean that wires role-based rules to specific routes

\`\`\`java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            .requestMatchers("/api/jobs/**").hasAnyRole("ADMIN", "USER")
            .anyRequest().authenticated()
        )
        .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
}
\`\`\`

## Where it got tricky

Two things bit me during development:

- **Filter ordering.** The JWT filter has to run *before* Spring's default username/password filter, or authenticated requests get rejected before your token is even read.
- **Role prefixes.** Spring Security expects roles to be prefixed with \`ROLE_\` internally even though \`hasRole("ADMIN")\` hides that from you. Storing raw \`ADMIN\` / \`USER\` strings in the database and forgetting the prefix when building \`GrantedAuthority\` objects cost me an afternoon of "403 Forbidden" debugging.

## What I'd do differently

Refresh tokens. The current implementation uses a single access token with a moderate expiry, which is fine for a portfolio-scale app but not something I'd ship to production as-is. A refresh-token flow with rotation would be the next step if this were a real product.
`,
  },
  {
    slug: "postgres-query-optimization-lessons",
    title: "PostgreSQL Query Optimization: A Few Lessons from Production",
    subtitle: "Notes from tuning slow queries on a live Spring Boot service",
    category: "Databases",
    tags: ["PostgreSQL", "SQL", "Performance"],
    date: "2026-05-02",
    readingTime: "6 min read",
    excerpt:
      "Managing PostgreSQL schemas and tuning queries is a big part of my day-to-day at Metquay. Here are a few concrete patterns that actually moved the needle.",
    content: `
## Start with EXPLAIN ANALYZE, not guesses

The single habit that's saved me the most time is running \`EXPLAIN ANALYZE\` before touching any query I suspect is slow. It's tempting to assume you know the bottleneck — usually you're wrong about which join or filter is actually expensive.

\`\`\`sql
EXPLAIN ANALYZE
SELECT a.*, u.name
FROM applications a
JOIN users u ON u.id = a.user_id
WHERE a.job_id = 42
ORDER BY a.created_at DESC;
\`\`\`

If you see a **Seq Scan** on a table with more than a few thousand rows where you expected an index scan, that's usually your first lead.

## Index the columns you actually filter and sort on

A composite index on \`(job_id, created_at)\` turned a query that was scanning tens of thousands of rows into an index range scan. The rule I follow now: any column that shows up in a \`WHERE\` clause on a frequently hit endpoint, or that drives an \`ORDER BY\`, is a candidate for indexing — but only after confirming with \`EXPLAIN\` that it's actually needed, since every index adds write overhead.

## Avoid N+1 queries at the JPA layer

This one isn't PostgreSQL-specific, but it shows up constantly when Hibernate is in the mix. Fetching a list of jobs and then lazily loading each job's applications one at a time turns a single logical operation into dozens of round trips. Using \`JOIN FETCH\` in the JPQL query, or a dedicated projection, collapses that back into one query.

## Data management matters as much as query tuning

A meaningful chunk of "performance work" in a real system isn't clever SQL — it's schema hygiene: consistent naming, sensible foreign keys, and not letting nullable columns sprawl. Clean schema design upfront avoids a lot of the query gymnastics you'd otherwise need later.
`,
  },
  {
    slug: "deploying-spring-boot-docker-portainer",
    title: "Deploying a Spring Boot App with Docker and Portainer on AWS",
    subtitle: "The deployment workflow I use for cloud-based environments",
    category: "DevOps",
    tags: ["Docker", "AWS", "Portainer", "Spring Boot"],
    date: "2026-03-20",
    readingTime: "5 min read",
    excerpt:
      "A practical look at containerizing a Spring Boot service and managing it on AWS with Portainer, rather than wrestling with the CLI for every deploy.",
    content: `
## Why containerize at all

Once you've been burned by "it works on my machine," packaging a Spring Boot app into a Docker image stops feeling optional. A container gives you the same JDK version, the same environment variables, and the same startup behavior whether it's running on a laptop or an AWS instance.

A minimal Dockerfile for a Spring Boot service looks roughly like this:

\`\`\`dockerfile
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY target/app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
\`\`\`

## Why Portainer

Managing containers purely through SSH and raw \`docker\` commands works, but it doesn't scale well once you have more than one or two services running, or more than one person who needs visibility into what's deployed. Portainer gives a web UI over the Docker Engine API: you can see running containers, tail logs, restart a stuck service, and inspect resource usage without memorizing a dozen CLI flags.

On AWS, the workflow I use is:

1. Build and tag the image locally or in CI
2. Push it to a registry
3. Pull and redeploy the container through Portainer on the target EC2 instance

## Where this earns its keep

The real payoff shows up during incidents. When a service misbehaves at 11pm, having a UI where you can immediately see container health, restart counts, and recent logs is faster than reconstructing the right \`docker logs\` incantation from memory.

## What's next

The natural next step is wiring this into a proper CI/CD pipeline so image builds and Portainer redeploys happen automatically on merge to main, instead of being triggered by hand.
`,
  },
  {
    slug: "react-spring-boot-job-portal",
    title: "Building a Full-Stack Job Portal with React and Spring Boot",
    subtitle: "Architecture notes from the Job Application Platform project",
    category: "Full Stack",
    tags: ["React", "Spring Boot", "WebSocket", "PostgreSQL"],
    date: "2026-01-18",
    readingTime: "8 min read",
    excerpt:
      "Job posting, applications, saved jobs, real-time chat, and an AI chatbot — how the pieces of a full-stack job portal fit together.",
    content: `
## The shape of the problem

A job portal has a deceptively large surface area once you list out the actual requirements: job posting and browsing, applications, saved jobs, file uploads for resumes, admin moderation, and — because a static form-and-list app gets boring fast — real-time chat between applicants and admins.

I split this into a Spring Boot REST backend and a React frontend talking to it over JWT-authenticated APIs.

## API shape

The backend exposes resource-oriented endpoints grouped by domain:

- \`/api/jobs\` — CRUD for job postings (Admin-only writes, public reads)
- \`/api/applications\` — apply to a job, track application status
- \`/api/saved-jobs\` — bookmark jobs for later
- \`/api/users\` — profile and resume management

Keeping these boundaries clean made it straightforward to reason about which endpoints needed \`ADMIN\` vs \`USER\` roles.

## Real-time chat with WebSockets

REST is a poor fit for chat — polling for new messages is wasteful and laggy. I used Spring's WebSocket support (STOMP over SockJS) so applicants and admins get messages pushed to them the moment they're sent, instead of refreshing a page.

\`\`\`java
@Override
public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/ws").withSockJS();
}
\`\`\`

On the React side, a single WebSocket connection is opened per authenticated session and messages are dispatched into component state as they arrive.

## Where the AI chatbot fits in

The chatbot handles the repetitive first-line questions — application status, how to upload a resume, what a given job requires — so real conversations between applicants and admins stay focused on things that actually need a human.

## The React side

Reusable components did most of the heavy lifting: a single \`JobCard\`, \`ApplicationList\`, and \`ChatWindow\` component get reused across the Admin and User views with different props, rather than maintaining two parallel UIs. State that multiple components needed — the logged-in user, unread chat counts — lives above the route level instead of being threaded through props everywhere.

## What I'd tackle next

Pagination on the jobs list is the most obvious next improvement — right now it assumes a job volume small enough to fetch in one request, which won't hold up indefinitely.
`,
  },
];

// Fixed display order for the blog category filter (not derived/alphabetical).
export const categories = ["AI", "Spring", "Databases", "DevOps", "Full Stack"].filter((c) =>
  posts.some((p) => p.category === c)
);
