import {
  LockIcon,
  GlobeIcon,
  TypeIcon,
  FileTextIcon,
  SunIcon,
  MoonIcon,
  ToolsIcon,
} from "../assets/Icons";

const Navbar = ({ activePage, setActivePage, darkMode, setDarkMode }) => {
  return (
    <nav>
      <div className="logo" onClick={() => setActivePage("intro")}>
        <ToolsIcon size={32} />
        <span className="logo-text">
          WebTools<span className="dot">.</span>
        </span>
      </div>

      <div className="nav-links">
        <button
          onClick={() => setActivePage("password")}
          className={activePage === "password" ? "active" : ""}
        >
          <LockIcon /> Password
        </button>
        <button
          onClick={() => setActivePage("status")}
          className={activePage === "status" ? "active" : ""}
        >
          <GlobeIcon /> Status
        </button>
        <button
          onClick={() => setActivePage("wordcounter")}
          className={activePage === "wordcounter" ? "active" : ""}
        >
          <TypeIcon /> Counter
        </button>
        <button
          onClick={() => setActivePage("mdreader")}
          className={activePage === "mdreader" ? "active" : ""}
        >
          <FileTextIcon /> Markdown
        </button>

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle theme"
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
