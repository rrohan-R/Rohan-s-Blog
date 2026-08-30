import { useEffect } from "react";

function setMeta(name, content, attr = "name") {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useDocumentHead({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} · Rohan Ramesh` : "Rohan Ramesh · Full Stack Developer";
    document.title = fullTitle;
    if (description) {
      setMeta("description", description);
      setMeta("og:description", description, "property");
    }
    setMeta("og:title", fullTitle, "property");
  }, [title, description]);
}
