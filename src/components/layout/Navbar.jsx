import {
  LockIcon,
  GlobeIcon,
  TypeIcon,
  FileTextIcon,
  SunIcon,
  MoonIcon,
  ToolsIcon,
} from "../../Icons";

const Navbar = ({
  activePage,
  setActivePage,
  darkMode,
  setDarkMode,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const navItems = [
    { id: "password", label: "Password", icon: <LockIcon /> },
    { id: "status", label: "Status", icon: <GlobeIcon /> },
    { id: "wordcounter", label: "Counter", icon: <TypeIcon /> },
    { id: "mdreader", label: "Markdown", icon: <FileTextIcon /> },
  ];

  return (
    <nav>
      <div className="navbar-inner">
        <div className="logo" onClick={() => setActivePage("intro")}>
          <ToolsIcon size={32} />

          <span className="logo-text">
            WebTools<span className="dot">.</span>
          </span>
        </div>

        <div className="nav-actions">
          <div className="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={activePage === item.id ? "active" : ""}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>

          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={`mobile-drawer ${isMobileMenuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActivePage(item.id);
              setIsMobileMenuOpen(false);
            }}
            className={activePage === item.id ? "active" : ""}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
