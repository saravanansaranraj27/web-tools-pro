import { useState } from "react";
import { TypeIcon, InfoIcon } from "../assets/Icons";

const WordCounter = () => {
  const [text, setText] = useState("");
  const [stats, setStats] = useState(null);

  const analyze = () => {
    const trimmed = text.trim();

    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;

    const paragraphs = trimmed
      ? trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length
      : 0;

    const sentences = trimmed
      ? trimmed.split(/[.!?]+/).filter((s) => s.trim()).length
      : 0;

    const readTime = Math.max(1, Math.ceil(words / 200));

    setStats({
      words,
      chars,
      charsNoSpace,
      paragraphs,
      sentences,
      readTime,
    });
  };

  return (
    <>
      <div className="tool-container">
        <h2>
          <TypeIcon /> Word & Character Counter
        </h2>

        <p className="tool-desc">
          Count words, characters, paragraphs, sentences, and estimate reading
          time.
        </p>

        <textarea
          rows={6}
          placeholder="Paste or type your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="input-group">
          <button onClick={analyze}>Analyze Text</button>
        </div>

        {stats && (
          <div className="result-card">
            <div className="stats-grid">
              <div>
                <strong>{stats.words}</strong>
                <span>Words</span>
              </div>

              <div>
                <strong>{stats.chars}</strong>
                <span>Characters</span>
              </div>

              <div>
                <strong>{stats.charsNoSpace}</strong>
                <span>No Spaces</span>
              </div>

              <div>
                <strong>{stats.paragraphs}</strong>
                <span>Paragraphs</span>
              </div>

              <div>
                <strong>{stats.sentences}</strong>
                <span>Sentences</span>
              </div>

              <div>
                <strong>~{stats.readTime}m</strong>
                <span>Read Time</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="page-note">
        <InfoIcon /> Counting uses whitespace splitting. CJK characters are
        counted individually. Reading time assumes ~200 WPM.
      </div>
    </>
  );
};

export default WordCounter;
