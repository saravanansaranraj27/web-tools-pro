import { useState, useEffect } from "react";
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
        <div
          style={{
            height: "48px",
            width: "80%",
            maxWidth: "600px",
            margin: "0 auto 20px",
            borderRadius: "8px",
            background:
              "linear-gradient(90deg, var(--bg-subtle) 25%, var(--border-soft) 50%, var(--bg-subtle) 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        ></div>
        <div
          style={{
            height: "20px",
            width: "60%",
            maxWidth: "500px",
            margin: "0 auto 36px",
            borderRadius: "6px",
            background:
              "linear-gradient(90deg, var(--bg-subtle) 25%, var(--border-soft) 50%, var(--bg-subtle) 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "32px",
          }}
        >
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              style={{
                height: "48px",
                width: "180px",
                borderRadius: "10px",
                background:
                  "linear-gradient(90deg, var(--bg-subtle) 25%, var(--border-soft) 50%, var(--bg-subtle) 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite",
              }}
            ></div>
          ))}
        </div>
      </div>
    </header>
    <section className="features-section">
      <div className="container">
        <div
          style={{
            height: "32px",
            width: "200px",
            margin: "0 auto 32px",
            borderRadius: "6px",
            background:
              "linear-gradient(90deg, var(--bg-subtle) 25%, var(--border-soft) 50%, var(--bg-subtle) 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        ></div>
        <div className="features-grid">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-subtle)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "24px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(90deg, var(--bg-subtle) 25%, var(--border-soft) 50%, var(--bg-subtle) 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                  marginBottom: "16px",
                }}
              ></div>
              <div
                style={{
                  height: "22px",
                  width: "70%",
                  borderRadius: "6px",
                  background:
                    "linear-gradient(90deg, var(--bg-subtle) 25%, var(--border-soft) 50%, var(--bg-subtle) 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                  marginBottom: "8px",
                }}
              ></div>
              <div
                style={{
                  height: "16px",
                  width: "90%",
                  borderRadius: "4px",
                  background:
                    "linear-gradient(90deg, var(--bg-subtle) 25%, var(--border-soft) 50%, var(--bg-subtle) 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

const Intro = ({ setActivePage }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

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
