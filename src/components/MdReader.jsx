import { useState, useEffect, useMemo } from "react";
import { FileTextIcon, InfoIcon } from "../assets/Icons";

const parseMd = (md) => {
  if (!md || !md.trim()) return "";
  let html = md;

  const codeBlocks = [];
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push(
      `<pre><code class="lang-${lang}">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`,
    );
    return `%%CODEBLOCK_${idx}%%`;
  });

  const inlineCodes = [];
  html = html.replace(/`([^`\n]+)`/g, (_, code) => {
    const idx = inlineCodes.length;
    inlineCodes.push(
      `<code>${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>`,
    );
    return `%%INLINE_${idx}%%`;
  });

  html = html.replace(/^---+$/gm, "<hr />");

  html = html.replace(
    /^(\|.+\|)\n(\|[\s\-:|]+\|)\n((?:\|.+\|\n?)*)/gm,
    (_, headerRow, _sep, bodyRows) => {
      const headers = headerRow
        .split("|")
        .filter((c) => c.trim())
        .map((c) => `<th>${c.trim()}</th>`)
        .join("");
      const rows = bodyRows
        .trim()
        .split("\n")
        .map((row) => {
          const cells = row
            .split("|")
            .filter((c) => c.trim())
            .map((c) => `<td>${c.trim()}</td>`)
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");
      return `<div class="md-table-wrap"><table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
    },
  );

  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="md-img" />',
  );

  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );

  html = html.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  html = html.replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>");

  html = html.replace(/(^[-*] .+(\n|$))+/gm, (block) => {
    const items = block
      .trim()
      .split("\n")
      .map((line) => {
        const content = line.replace(/^[-*]\s+/, "");
        return `<li>${content}</li>`;
      })
      .join("");
    return `<ul>${items}</ul>`;
  });

  html = html.replace(/(^\d+\. .+(\n|$))+/gm, (block) => {
    const items = block
      .trim()
      .split("\n")
      .map((line) => {
        const content = line.replace(/^\d+\.\s+/, "");
        return `<li>${content}</li>`;
      })
      .join("");
    return `<ol>${items}</ol>`;
  });

  const isBlockLine = (t) =>
    /^<(h[1-4]|ul|ol|li|blockquote|pre|hr|div|table|img)/.test(t) ||
    /^%%/.test(t);

  const lines = html.split("\n");
  const outLines = [];
  let paraBuffer = [];
  const flushPara = () => {
    if (paraBuffer.length) {
      outLines.push(`<p>${paraBuffer.join(" ")}</p>`);
      paraBuffer = [];
    }
  };
  for (const rawLine of lines) {
    const t = rawLine.trim();
    if (!t) {
      flushPara();
      continue;
    }
    if (isBlockLine(t)) {
      flushPara();
      outLines.push(t);
      continue;
    }
    paraBuffer.push(t);
  }
  flushPara();
  html = outLines.join("\n");

  html = html.replace(/<\/blockquote>\n<blockquote>/g, "<br/>");

  html = html.replace(
    /%%CODEBLOCK_(\d+)%%/g,
    (_, i) => codeBlocks[parseInt(i)],
  );
  html = html.replace(/%%INLINE_(\d+)%%/g, (_, i) => inlineCodes[parseInt(i)]);

  return html;
};

const MdReader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState("");
  const output = useMemo(() => parseMd(input), [input]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="skeleton-container">
        <div className="skeleton-header">
          <div className="skeleton-icon"></div>
          <div className="skeleton-title"></div>
        </div>
        <div className="skeleton-desc"></div>
        <div className="skeleton-textarea"></div>
      </div>
    );
  }

  return (
    <>
      <div className="tool-container">
        <h2>
          <FileTextIcon /> Markdown Reader
        </h2>
        <p className="tool-desc">
          Write markdown and instantly preview rendered HTML with styled output.
          Supports tables, images, badges, code blocks, and more.
        </p>

        <textarea
          rows={10}
          placeholder={
            "# Heading\n**Bold** and *italic*\n- List item\n> Blockquote\n`inline code`\n\n| Col A | Col B |\n|-------|-------|\n| Value | Value |"
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
        />

        {output && (
          <div
            className="md-output"
            dangerouslySetInnerHTML={{ __html: output }}
          />
        )}
      </div>

      <div className="page-note">
        <InfoIcon /> Markdown is parsed client-side in real-time as you type.
        Supports headings, bold, italic, code blocks, tables, images, badges,
        links, lists, blockquotes, and horizontal rules. No external libraries
        used.
      </div>
    </>
  );
};

export default MdReader;
