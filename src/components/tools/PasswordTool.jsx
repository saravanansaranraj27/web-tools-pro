import { useState } from "react";
import { CheckIcon, AlertIcon, LockIcon, ShieldIcon } from "../../Icons";

const PasswordTool = () => {
  const [passInput, setPassInput] = useState("");
  const [passResult, setPassResult] = useState(null);

  const analyzePassword = () => {
    let score = 0;
    const feedback = [];

    if (passInput.length >= 8) score++;
    else feedback.push("At least 8 characters");

    if (/[A-Z]/.test(passInput)) score++;
    else feedback.push("One uppercase letter");

    if (/[a-z]/.test(passInput)) score++;
    else feedback.push("One lowercase letter");

    if (/[0-9]/.test(passInput)) score++;
    else feedback.push("One number");

    if (/[^A-Za-z0-9]/.test(passInput)) score++;
    else feedback.push("One special character");

    let msg = "Weak";

    if (score >= 4) msg = "Strong";
    if (score === 5) msg = "Excellent";

    setPassResult({
      score,
      msg,
      feedback,
    });
  };

  return (
    <>
      <div className="tool-container">
        <h2>
          <LockIcon /> Password Strength Analyzer
        </h2>

        <p className="tool-desc">
          Evaluate password strength with detailed scoring and actionable
          improvement tips.
        </p>

        <div className="input-group">
          <input
            type="password"
            placeholder="Type a password..."
            value={passInput}
            onChange={(e) => setPassInput(e.target.value)}
          />

          <button onClick={analyzePassword}>Analyze</button>
        </div>

        {passResult && (
          <div className="result-card">
            <div className="score-circle">{passResult.score}/5</div>

            <h3>{passResult.msg}</h3>

            <ul>
              {passResult.feedback.map((item, i) => (
                <li key={i} className="feedback-item">
                  <AlertIcon /> {item}
                </li>
              ))}

              {passResult.feedback.length === 0 && (
                <li className="feedback-item success">
                  <CheckIcon /> All criteria met!
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="page-note">
        <ShieldIcon /> Privacy First: Your password is analyzed locally in your
        browser. It is never sent to any server or stored anywhere.
      </div>
    </>
  );
};

export default PasswordTool;
