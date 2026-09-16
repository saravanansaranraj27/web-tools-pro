import {
  LockIcon,
  TypeIcon,
  GlobeIcon,
  FileTextIcon,
  ShieldIcon,
  InfoIcon,
} from "../assets/Icons";

const FeatureCard = ({ icon, title, desc }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{desc}</p>
  </div>
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

const Intro = ({ setActivePage, isLoading }) => {
  if (isLoading) {
    return <IntroSkeleton />;
  }

  return (
    <>
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
              className="btn-primary"
              onClick={() => setActivePage("wordcounter")}
            >
              <TypeIcon /> Try Word Counter
            </button>
            <button
              className="btn-primary"
              onClick={() => setActivePage("status")}
            >
              <GlobeIcon /> Check a Site
            </button>
            <button
              className="btn-primary"
              onClick={() => setActivePage("mdreader")}
            >
              <FileTextIcon /> Open Markdown
            </button>
          </div>
        </div>
      </header>
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <div className="features-grid">
            <FeatureCard
              icon={<ShieldIcon />}
              title="Polished Loading State"
              desc="Experience a smooth entry with a custom spinner that ensures resources are ready before the interface appears."
            />
            <FeatureCard
              icon={<InfoIcon />}
              title="Responsive Mobile Nav"
              desc="A dedicated hamburger menu for smaller screens ensures all tools remain accessible without cluttering the view."
            />
            <FeatureCard
              icon={<GlobeIcon />}
              title="Smooth Scroll Offset"
              desc="Navigation links align content perfectly below the fixed navbar, preventing headers from being hidden."
            />
            <FeatureCard
              icon={<LockIcon />}
              title="Quick Back-to-Top"
              desc="Scroll down? A floating button appears to instantly and smoothly return you to the top of the page."
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Intro;
