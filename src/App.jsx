import { useEffect, useRef, useState } from "react";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import PasswordTool from "./components/PasswordTool";
import StatusTool from "./components/StatusTool";
import WordCounter from "./components/WordCounter";
import MdReader from "./components/MdReader";
import Footer from "./components/Footer";
import {
  SkeletonPassword,
  SkeletonStatus,
  SkeletonWordCounter,
  SkeletonMdReader,
} from "./components/Skeletons";
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

const IntroSkeleton = () => (
  <>
    <header className="hero-section">
      <div className="hero-content">
        <div className="skeleton skeleton-hero-title"></div>
        <div className="skeleton skeleton-hero-description"></div>

        <div className="skeleton-actions">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="skeleton skeleton-hero-button"></div>
          ))}
        </div>
      </div>
    </header>

    <section className="features-section">
      <div className="container">
        <div className="skeleton skeleton-section-title"></div>

        <div className="features-grid">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="skeleton-feature-card">
              <div className="skeleton skeleton-feature-icon"></div>
              <div className="skeleton skeleton-feature-title"></div>
              <div className="skeleton skeleton-feature-text"></div>
              <div className="skeleton skeleton-feature-text skeleton-feature-text-short"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

const PageSkeleton = ({ page }) => {
  if (page === "password") return <SkeletonPassword />;
  if (page === "status") return <SkeletonStatus />;
  if (page === "wordcounter") return <SkeletonWordCounter />;
  if (page === "mdreader") return <SkeletonMdReader />;

  return <IntroSkeleton />;
};

function App() {
  const { darkMode, setDarkMode } = useTheme();

  const [activePage, setActivePage] = useState("intro");
  const [loadingPage, setLoadingPage] = useState("intro");
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const loadingTimer = useRef(null);

  useEffect(() => {
    loadingTimer.current = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(loadingTimer.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavClick = (page) => {
    if (page === activePage && !isLoading) {
      setIsMobileMenuOpen(false);
      return;
    }

    clearTimeout(loadingTimer.current);

    setLoadingPage(page);
    setIsLoading(true);
    setIsMobileMenuOpen(false);
    scrollToTop();

    loadingTimer.current = setTimeout(() => {
      setActivePage(page);
      setIsLoading(false);
    }, 800);
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
        {isLoading ? (
          <PageSkeleton page={loadingPage} />
        ) : (
          <>
            {activePage === "intro" && (
              <Intro setActivePage={handleNavClick} isLoading={false} />
            )}

            {activePage === "password" && <PasswordTool />}
            {activePage === "status" && <StatusTool />}
            {activePage === "wordcounter" && <WordCounter />}
            {activePage === "mdreader" && <MdReader />}
          </>
        )}
      </main>

      {isLoading ? (
        <footer>
          <div className="skeleton skeleton-footer"></div>
        </footer>
      ) : (
        <Footer />
      )}

      {showBackToTop && !isLoading && (
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
