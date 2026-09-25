import { useMemo, useState } from "react";
import { FileTextIcon, InfoIcon } from "../../Icons";
import { parseMarkdown } from "../../utils/markdown";

const MdReader = () => {
  const [input, setInput] = useState("");

  const output = useMemo(() => parseMarkdown(input), [input]);

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
