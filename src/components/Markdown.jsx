import "./Markdown.css";

function renderInline(text, keyPrefix) {
  // Split on inline code, bold, and links while preserving order.
  const parts = [];
  const regex = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("`")) {
      parts.push(<code key={`${keyPrefix}-${i++}`}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("**")) {
      parts.push(<strong key={`${keyPrefix}-${i++}`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("[")) {
      const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      parts.push(
        <a key={`${keyPrefix}-${i++}`} href={linkMatch[2]} target="_blank" rel="noreferrer">
          {linkMatch[1]}
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export default function Markdown({ content }) {
  const lines = content.trim().split("\n");
  const blocks = [];
  let i = 0;
  let listBuffer = [];

  const flushList = () => {
    if (listBuffer.length) {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="md-list">
          {listBuffer.map((item, idx) => (
            <li key={idx}>{renderInline(item, `li-${blocks.length}-${idx}`)}</li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      flushList();
      blocks.push(
        <pre className="md-code" key={`code-${blocks.length}`}>
          <div className="md-code__lang">{lang || "text"}</div>
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      continue;
    }

    if (line.startsWith("## ")) {
      flushList();
      const text = line.slice(3);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      blocks.push(
        <h2 className="md-h2" id={id} key={`h2-${blocks.length}`}>
          {renderInline(text, `h2-${blocks.length}`)}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith("- ")) {
      listBuffer.push(line.slice(2));
      i++;
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      flushList();
      const orderedItems = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        orderedItems.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push(
        <ol className="md-list" key={`ol-${blocks.length}`}>
          {orderedItems.map((item, idx) => (
            <li key={idx}>{renderInline(item, `oli-${blocks.length}-${idx}`)}</li>
          ))}
        </ol>
      );
      continue;
    }

    if (line.trim() === "") {
      flushList();
      i++;
      continue;
    }

    flushList();
    blocks.push(
      <p className="md-p" key={`p-${blocks.length}`}>
        {renderInline(line, `p-${blocks.length}`)}
      </p>
    );
    i++;
  }
  flushList();

  return <div className="markdown">{blocks}</div>;
}

export function extractHeadings(content) {
  return content
    .trim()
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => {
      const text = l.slice(3);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return { text, id };
    });
}
