import { LockIcon, TypeIcon, GlobeIcon, FileTextIcon } from "../assets/Icons";

const Intro = ({ setActivePage }) => {
  return (
    <header className="hero-section">
      <div className="hero-content">
        <h1>
          Master Your <span className="highlight">Web Utilities</span>
        </h1>
        <p>
          Developer tools running entirely in your browser. No server. No
          tracking. Just utilities.
        </p>
        <div className="hero-buttons">
          <button
            className="btn-primary"
            onClick={() => setActivePage("password")}
          >
            <LockIcon /> Analyze Password
          </button>
          <button
            className="btn-secondary"
            onClick={() => setActivePage("wordcounter")}
          >
            <TypeIcon /> Try Word Counter
          </button>
          <button
            className="btn-secondary"
            onClick={() => setActivePage("status")}
          >
            <GlobeIcon /> Check a Site
          </button>
          <button
            className="btn-secondary"
            onClick={() => setActivePage("mdreader")}
          >
            <FileTextIcon /> Open Markdown
          </button>
        </div>
      </div>
    </header>
  );
};

export default Intro;
