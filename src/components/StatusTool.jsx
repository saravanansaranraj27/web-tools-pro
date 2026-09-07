import { useState } from "react";
import { GlobeIcon, InfoIcon } from "../assets/Icons";

const StatusTool = () => {
  const [urlInput, setUrlInput] = useState("");
  const [statusResult, setStatusResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkStatus = async () => {
    setIsLoading(true);
    setStatusResult(null);
    let url = urlInput;
    if (!url.startsWith("http")) url = "https://" + url;
    try {
      const start = Date.now();
      await fetch(url, { mode: "no-cors" });
      const duration = Date.now() - start;
      setStatusResult({ status: "Reachable", time: duration, url });
    } catch {
      setStatusResult({ status: "Unreachable", time: 0, url });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="tool-container">
        <h2>
          <GlobeIcon /> Website Status Checker
        </h2>
        <p className="tool-desc">
          Ping any website and measure real-time response time from your
          browser.
        </p>

        <div className="input-group">
          <input
            type="text"
            placeholder="example.com"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <button onClick={checkStatus} disabled={isLoading}>
            {isLoading ? "Pinging..." : "Check Status"}
          </button>
        </div>

        {statusResult && (
          <div className="result-card">
            <h3
              style={{
                color:
                  statusResult.status === "Reachable"
                    ? "var(--primary)"
                    : "var(--red)",
              }}
            >
              {statusResult.status}
            </h3>
            <p>Target: {statusResult.url}</p>
            <p>Response Time: {statusResult.time}ms</p>
          </div>
        )}
      </div>

      <div className="page-note">
        <InfoIcon /> Status checks are performed client-side. Corporate
        firewalls or CORS policies may block some pings. Results indicate
        reachability, not full HTTP status.
      </div>
    </>
  );
};

export default StatusTool;
