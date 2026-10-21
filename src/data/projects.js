// Tech stacks and feature bullets below are taken verbatim from the resume.
// Repository / live-demo links were verified against the public GitHub
// profile (github.com/rrohan-R) and its README before being added here.

export const projects = [
  {
    slug: "myai",
    name: "MyAI",
    short:
      "A document-chat web app that uses Google Gemini and retrieval-augmented generation to answer questions from your files with cited sources.",
    problem:
      "Finding an answer inside long PDFs and reports means searching manually and reading pages of text. General chatbots don't know what's in your files, and they can make up answers without saying where they came from.",
    solution:
      "Upload one or more documents and MyAI splits each one into overlapping chunks, then turns each chunk into a vector with Gemini's embedding model. When you ask a question, the FastAPI backend embeds it, finds the closest chunks by cosine similarity, and sends only those excerpts to a Gemini model. The model answers from them and cites its sources as [1], [2] and so on. The answer streams token by token into the React interface, and each citation expands to show the exact excerpt and page it came from. If the documents don't contain the answer, the model says so plainly.",
    features: [
      "Upload multiple documents at once by drag and drop or file picker, with a 10 MB per-document limit checked in both the browser and server",
      "Supports PDF, DOCX, TXT, MD, CSV, JSON and LOG files; invalid, empty or oversized files are reported without blocking other uploads",
      "Splits documents into overlapping chunks and preserves PDF page numbers so citations can point to a page",
      "Uses Gemini embeddings for retrieval with separate embedding modes for documents and questions, and Gemini to write the final answer",
      "Streams answers live, with a Stop button to cancel a reply and a New chat button to reset the conversation",
      "Inline citations expand to show source excerpts and match scores",
      "Supports follow-up questions by combining the previous question with the new one during retrieval",
      "Knowledge base controls let you exclude a document from answers, delete one document, or clear everything",
      "Safely renders Markdown formatting in replies, including lists and code blocks",
      "Retries with backoff when Gemini's free quota returns a rate-limit error",
    ],
    tech: [
      "Python",
      "FastAPI",
      "Google Gemini",
      "RAG",
      "React",
      "TypeScript",
      "Vite",
      "NumPy",
    ],
    github: "https://github.com/rrohan-R/MyAI---RAG",
    live: "https://my-ai-rag-chat-bot.vercel.app",
    status: "live",
    platform: [
      { label: "Frontend", value: "React (Vercel)" },
      { label: "Backend", value: "FastAPI (Render)" },
    ],
    liveNote:
      "The free hosting tier has no permanent backend disk, so uploaded documents are cleared whenever the service restarts or redeploys. The backend sleeps after about 15 minutes of inactivity, so the first request afterwards can take around a minute. There is no login, so everyone shares one knowledge base. Scanned or image-only PDFs are not supported because the app has no OCR.",
  },
  {
    slug: "findyourmovie",
    name: "FindYourMovie",
    short:
      "A web app that recommends real, verified movies by language, genre and year, using Google Gemini through a LangChain pipeline, with a React interface.",
    problem:
      "Picking something to watch by browsing endless catalogs is slow, and most recommendation tools need a title you already know to work from rather than just a language, genre, and year you're in the mood for.",
    solution:
      "A LangChain LCEL pipeline sends the selected language, genre, and year to Google’s Gemini model, which returns a list of matching movie titles. A FastAPI backend then checks every title against the OMDb API and keeps only the ones that really exist, with their real IMDb links, posters, ratings and plots. Results stream to a React interface as each movie is verified, so cards appear one by one instead of after a long wait.",
    features: [
      "Interactive pickers: language and genre chips, a year slider (1980–2026), and a “Surprise me” button for a random combination",
      "LangChain’s LCEL pipeline calls Gemini, and its response is parsed with fallback handling for cases where the model wraps the JSON in extra text or markdown",
      "Every suggested title is verified on OMDb in parallel, so IMDb links are real rather than generated from memory, and unverifiable titles are dropped",
      "Live streaming results over newline-delimited JSON, with a progress bar and loading placeholders",
      "Poster cards with ratings, plot preview on hover, and a detail view with director, cast, runtime and an IMDb link",
      "Filter by title, actor or director, sort by rating, A–Z or runtime, and set a minimum rating",
      "Watchlist saved in the browser, plus recent searches and remembered choices",
      "Clean separation between the React UI (frontend/) and the Python API and LLM logic (api/), deployed as a single Vercel project",
    ],
    tech: ["Python", "LangChain", "Google Gemini", "FastAPI", "React", "Vite", "OMDb API", "Vercel"],
    github: "https://github.com/rrohan-R/FindYourMovie",
    live: "https://findyourmovie-theta.vercel.app/",
    status: "live",
    platform: [{ label: "App", value: "React + FastAPI (Vercel)" }],
    liveNote:
      "Update: IMDb links are no longer generated from the model’s memory. Each suggested title is verified against the OMDb API, so every result links to its real IMDb page. Gemini can still miss or invent titles, and those are filtered out, which means a search may return fewer movies than the model suggested.",
  },
  {
    slug: "job-application-platform",
    name: "Job Application Platform",
    short:
      "A full-stack job portal with role-based auth, real-time chat, and an AI-assisted chatbot for applicants.",
    problem:
      "Job seekers and recruiters needed a single platform to post roles, track applications, and communicate — without juggling email threads or spreadsheets.",
    solution:
      "A Spring Boot + React job portal with separate Admin and User experiences, secured with JWT, and a WebSocket-based chat layer for direct communication between applicants and administrators.",
    features: [
      "Role-based authentication and authorization (Admin / User) using Spring Security and JWT",
      "REST APIs for job management, user management, application tracking, and saved jobs",
      "Real-time messaging between users and administrators via WebSockets",
      "AI-powered chatbot for automated applicant assistance",
      "Resume and document upload with file management",
      "Optimized relational schema for data integrity and query performance",
      "Responsive React UI built from reusable components with proper state management",
    ],
    tech: ["Java", "Spring Boot", "Spring Security", "JWT", "WebSocket", "React", "PostgreSQL"],
    github: "https://github.com/rrohan-R/job-application-frontend",
    live: "https://job-application-frontend-delta.vercel.app/",
    liveNote:
      "The backend runs on Render's free tier, so the app can take a minute or two to wake up after inactivity.",
    status: "live",
    platform: [
      { label: "Frontend", value: "React (Vercel)" },
      { label: "Backend", value: "Spring Boot (Render)" },
    ],
  },
  {
    slug: "underwater-image-restoration",
    name: "Underwater Image Restoration & Object Detection",
    short:
      "A machine-learning web app that restores degraded underwater images and detects marine objects in them.",
    problem:
      "Underwater images typically suffer from noise, poor visibility, and color distortion, which makes reliably detecting marine objects difficult.",
    solution:
      "A web application that applies image enhancement and restoration techniques before running object detection models to identify and classify underwater entities.",
    features: [
      "Image enhancement and restoration to reduce noise and correct color distortion",
      "Object detection models to identify and classify underwater entities",
      "Web interface for image upload, processing, and result visualization",
      "Optimized processing workflow to reduce detection latency",
      "Image storage, metadata handling, and database integration for results",
    ],
    tech: ["Python", "Machine Learning", "React", "JavaScript", "MySQL"],
    github: "https://github.com/rrohan-R/Underwater-Image-Restoration-and-Object-Detection-",
    live: null,
    status: "source",
  },
];

// Additional public repositories found on rrohan-R's GitHub profile.
// Listed with only the metadata visible on GitHub (name / primary language) —
// no descriptions were invented for these.
export const otherRepos = [
  {
    name: "Java-Programming-and-Case-Studies",
    language: "Java",
    url: "https://github.com/rrohan-R/Java-Programming-and-Case-Studies",
    note: "Core Java case studies from the Quest Global traineeship",
  },
  {
    name: "App-1",
    language: "Kotlin",
    url: "https://github.com/rrohan-R/App-1",
    note: "Android app built with Kotlin",
  },
  {
    name: "App-2",
    language: "Kotlin",
    url: "https://github.com/rrohan-R/App-2",
    note: "Android app built with Kotlin",
  },
  {
    name: "To-do-APP",
    language: "HTML",
    url: "https://github.com/rrohan-R/To-do-APP",
  },
];
