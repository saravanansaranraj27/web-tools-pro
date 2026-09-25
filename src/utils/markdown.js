export const parseMarkdown = (md) => {
  if (!md || !md.trim()) return "";

  let html = md;
  const codeBlocks = [];

  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const idx = codeBlocks.length;

    codeBlocks.push(
      `<pre><code class="lang-${lang}">${code
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")}</code></pre>`,
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
    (_, headerRow, _separatorRow, bodyRows) => {
      const headers = headerRow
        .split("|")
        .filter((cell) => cell.trim())
        .map((cell) => `<th>${cell.trim()}</th>`)
        .join("");

      const rows = bodyRows
        .trim()
        .split("\n")
        .map((row) => {
          const cells = row
            .split("|")
            .filter((cell) => cell.trim())
            .map((cell) => `<td>${cell.trim()}</td>`)
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
      .map((line) => `<li>${line.replace(/^[-*]\s+/, "")}</li>`)
      .join("");

    return `<ul>${items}</ul>`;
  });

  html = html.replace(/(^\d+\. .+(\n|$))+/gm, (block) => {
    const items = block
      .trim()
      .split("\n")
      .map((line) => `<li>${line.replace(/^\d+\.\s+/, "")}</li>`)
      .join("");

    return `<ol>${items}</ol>`;
  });

  const isBlockLine = (text) =>
    /^<(h[1-4]|ul|ol|li|blockquote|pre|hr|div|table|img)/.test(text) ||
    /^%%/.test(text);

  const outputLines = [];
  let paragraph = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      outputLines.push(`<p>${paragraph.join(" ")}</p>`);
      paragraph = [];
    }
  };

  for (const rawLine of html.split("\n")) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      continue;
    }

    if (isBlockLine(line)) {
      flushParagraph();
      outputLines.push(line);
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();

  html = outputLines.join("\n");
  html = html.replace(/<\/blockquote>\n<blockquote>/g, "<br/>");
  html = html.replace(
    /%%CODEBLOCK_(\d+)%%/g,
    (_, index) => codeBlocks[parseInt(index, 10)],
  );
  html = html.replace(
    /%%INLINE_(\d+)%%/g,
    (_, index) => inlineCodes[parseInt(index, 10)],
  );

  return html;
};
