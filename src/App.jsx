import { Navigate, Route, Routes } from "react-router-dom";
import { useTheme } from "./hooks/useSystemTheme";
import { useNavigation } from "./hooks/useNavigation";
import { useScrollToTop } from "./hooks/useScrollToTop";
import Navbar from "./components/layout/Navbar";
import Intro from "./components/sections/Intro";
import PasswordTool from "./components/tools/PasswordTool";
import StatusTool from "./components/tools/StatusTool";
import WordCounter from "./components/tools/WordCounter";
import MdReader from "./components/tools/MdReader";
import Footer from "./components/layout/Footer";
import {
  SkeletonPassword,
  SkeletonStatus,
  SkeletonWordCounter,
  SkeletonMdReader,
} from "./components/common/Skeletons";
import "./styles/globals.css";

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
  if (page === "password") {
    return <SkeletonPassword />;
  }

  if (page === "status") {
    return <SkeletonStatus />;
  }

  if (page === "wordcounter") {
    return <SkeletonWordCounter />;
  }

  if (page === "mdreader") {
    return <SkeletonMdReader />;
  }

  return <IntroSkeleton />;
};

const AppRoutes = ({ navigate }) => (
  <Routes>
    <Route
      path="/"
      element={<Intro setActivePage={navigate} isLoading={false} />}
    />

    <Route path="/password" element={<PasswordTool />} />

    <Route path="/status" element={<StatusTool />} />

    <Route path="/wordcounter" element={<WordCounter />} />

    <Route path="/mdreader" element={<MdReader />} />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

function App() {
  const { darkMode, setDarkMode } = useTheme();
  const { showBackToTop, scrollToTop } = useScrollToTop();

  const {
    activePage,
    loadingPage,
    isLoading,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    navigate,
  } = useNavigation();

  const handleNavClick = (page) => {
    navigate(page, scrollToTop);
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
          <AppRoutes navigate={handleNavClick} />
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
