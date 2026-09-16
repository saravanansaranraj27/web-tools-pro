import { useState, useEffect } from "react";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import PasswordTool from "./components/PasswordTool";
import StatusTool from "./components/StatusTool";
import WordCounter from "./components/WordCounter";
import MdReader from "./components/MdReader";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  const { darkMode, setDarkMode } = useTheme();
  const [activePage, setActivePage] = useState("intro");
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    scrollToTop();
  };

  if (isLoading) {
    return (
      <div className={`app ${darkMode ? "dark" : "light"}`}>
        <nav>
          <div className="navbar-inner">
            <div className="logo">
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "6px",
                  background:
                    "linear-gradient(90deg, var(--bg-subtle) 25%, var(--border-soft) 50%, var(--bg-subtle) 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                }}
              ></div>
              <div
                style={{
                  width: "120px",
                  height: "24px",
                  borderRadius: "6px",
                  background:
                    "linear-gradient(90deg, var(--bg-subtle) 25%, var(--border-soft) 50%, var(--bg-subtle) 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                }}
              ></div>
            </div>
            <div className="nav-actions">
              <div className="desktop-nav">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: "80px",
                      height: "36px",
                      borderRadius: "8px",
                      background:
                        "linear-gradient(90deg, var(--bg-subtle) 25%, var(--border-soft) 50%, var(--bg-subtle) 75%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 1.5s infinite",
                    }}
                  ></div>
                ))}
              </div>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "8px",
                  background:
                    "linear-gradient(90deg, var(--bg-subtle) 25%, var(--border-soft) 50%, var(--bg-subtle) 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                }}
              ></div>
            </div>
          </div>
        </nav>

        <main className="main-content">
          {activePage === "intro" && <Intro setActivePage={handleNavClick} />}
          {activePage === "password" && <PasswordTool />}
          {activePage === "status" && <StatusTool />}
          {activePage === "wordcounter" && <WordCounter />}
          {activePage === "mdreader" && <MdReader />}
        </main>

        <footer>
          <div
            style={{
              width: "280px",
              height: "16px",
              margin: "0 auto",
              borderRadius: "4px",
              background:
                "linear-gradient(90deg, var(--bg-subtle) 25%, var(--border-soft) 50%, var(--bg-subtle) 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
            }}
          ></div>
        </footer>
      </div>
    );
  }

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <Navbar
        activePage={activePage}
        setActivePage={handleNavClick}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="main-content fade-in">
        {activePage === "intro" && <Intro setActivePage={handleNavClick} />}
        {activePage === "password" && <PasswordTool />}
        {activePage === "status" && <StatusTool />}
        {activePage === "wordcounter" && <WordCounter />}
        {activePage === "mdreader" && <MdReader />}
      </main>

      <Footer />

      {showBackToTop && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;
