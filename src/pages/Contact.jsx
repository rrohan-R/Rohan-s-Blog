import { useState } from "react";
import { useDocumentHead } from "../hooks/useDocumentHead";
import { profile } from "../data/profile";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../components/Icons";
import "./Contact.css";

const INTERESTS = [
  "Professional opportunities",
  "Software engineering discussions",
  "Technical collaboration",
  "Open-source collaboration",
  "Interesting projects",
  "Networking",
];

export default function Contact() {
  useDocumentHead({
    title: "Contact",
    description: `Get in touch with ${profile.name}.`,
  });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Enter your name.";
    if (!form.email.trim()) {
      next.email = "Enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) {
      next.message = "Write a short message.";
    } else if (form.message.trim().length < 10) {
      next.message = "Message should be at least 10 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

const buildGmailComposeUrl = () => {
  const subject = `${form.name} wants to connect with you`;
  const body = [
    `Hi Rohan,`,
    ``,
    form.message.trim(),
    ``,
    `— ${form.name} (${form.email})`,
  ].join("\n");

  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: profile.email,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (!validate()) return;
  setStatus("loading");
  window.open(buildGmailComposeUrl(), "_blank", "noopener,noreferrer");
  setTimeout(() => {
    setStatus("success");
  }, 600);
};

  if (status === "success") {
    return (
      <div className="container page contact">
        <div className="card contact__success">
          <div className="contact__success-icon">✓</div>
          <h2>Gmail should have opened in a new tab</h2>
        <p>
          I pre-filled a message to {profile.email} — your own address is included in the message body so I
          can reply directly. If you weren't already signed in to Gmail, it'll ask you to sign in first and
          then bring you back to the compose window. Just hit send from there.
        </p>
          <button className="btn btn-outline" onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}>
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container page contact">
      <div className="eyebrow">Contact.sh</div>
      <h1 className="page__title">Let's connect</h1>
      <p className="page__lede">
        I'm open to professional opportunities, technical collaboration, open-source work, and just talking
        through interesting engineering problems.
      </p>

      <div className="contact__grid">
        <div>
          <div className="contact__interests">
            {INTERESTS.map((i) => (
              <span className="tag contact__interest" key={i}>{i}</span>
            ))}
          </div>

          <div className="contact__links">
            <a href={`mailto:${profile.email}`} className="card contact__linkcard">
              <MailIcon /> <div><strong>Email</strong><span>{profile.email}</span></div>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="card contact__linkcard">
              <LinkedInIcon /> <div><strong>LinkedIn</strong><span>linkedin.com/in/rohan-r007</span></div>
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="card contact__linkcard">
              <GitHubIcon /> <div><strong>GitHub</strong><span>github.com/{profile.githubHandle}</span></div>
            </a>
          </div>
        </div>

        <form className="card contact__form" onSubmit={handleSubmit} noValidate>
          <label className="contact__field">
            <span>Name</span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
            />
            {errors.name && <span className="contact__error">{errors.name}</span>}
          </label>

          <label className="contact__field">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
            {errors.email && <span className="contact__error">{errors.email}</span>}
          </label>

          <label className="contact__field">
            <span>Message</span>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="What would you like to talk about?"
            />
            {errors.message && <span className="contact__error">{errors.message}</span>}
          </label>

          <button type="submit" className="btn btn-primary contact__submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </div>
  );
}
