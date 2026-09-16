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

const NavbarSkeleton = () => (
  <nav>
    <div className="navbar-inner">
      <div className="logo">
        <div className="skeleton skeleton-nav-icon"></div>
        <div className="skeleton skeleton-logo-text"></div>
      </div>

      <div className="nav-actions">
        <div className="desktop-nav">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="skeleton skeleton-nav-item"></div>
          ))}
        </div>

        <div className="skeleton skeleton-theme-button"></div>
      </div>
    </div>
  </nav>
);

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

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      {isLoading ? (
        <NavbarSkeleton />
      ) : (
        <Navbar
          activePage={activePage}
          setActivePage={handleNavClick}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      )}

      <main className={`main-content ${isLoading ? "" : "fade-in"}`}>
        {activePage === "intro" && (
          <Intro isLoading={isLoading} setActivePage={handleNavClick} />
        )}

        {activePage === "password" && <PasswordTool />}
        {activePage === "status" && <StatusTool />}
        {activePage === "wordcounter" && <WordCounter />}
        {activePage === "mdreader" && <MdReader />}
      </main>

      {isLoading ? (
        <footer>
          <div className="skeleton skeleton-footer"></div>
        </footer>
      ) : (
        <Footer />
      )}

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
