import { useState } from "react";

function SarcasmPanel() {
  // 1) STATE: what our UI needs to remember
  const [inputText, setInputText] = useState("");      // what the user typed
  const [sarcasmScore, setSarcasmScore] = useState(null); // 0–100, or null if nothing yet
  const [sarcasmLabel, setSarcasmLabel] = useState("");   // text like "Likely sarcastic"

  // 2) Handle typing in the textarea
  function handleChange(event) {
    setInputText(event.target.value);
  }

  // 3) Handle clicking the "Analyze" button (mock logic for now)
  function handleAnalyze() {
    const trimmed = inputText.trim();
    if (!trimmed) {
      setSarcasmScore(null);
      setSarcasmLabel("Please enter a message to analyze.");
      return;
    }

    // ---- MOCK LOGIC (placeholder, to be replaced with real API later) ----
    // Simple fake rule: longer / more intense messages → higher sarcasm %
    const base = Math.min(trimmed.length, 100); // cap at 100
    const randomNoise = Math.floor(Math.random() * 15); // make it feel less "robotic"
    const fakeScore = Math.min(base + randomNoise, 100);

    let label;
    if (fakeScore > 70) {
      label = "Very likely sarcastic";
    } else if (fakeScore > 40) {
      label = "Possibly sarcastic";
    } else {
      label = "Unlikely sarcastic";
    }

    setSarcasmScore(fakeScore);
    setSarcasmLabel(label);
  }

  return (
    <div className="sarcasm-panel">
      {/* Title */}
      <h2 className="panel-title">Sarcasm Analyzer</h2>

      {/* Input Group */}
      <div className="input-section">
        <label htmlFor="sarcasmInput">Enter a message:</label>
        <textarea
          id="sarcasmInput"
          placeholder="Type something here..."
          className="sarcasm-textarea"
          value={inputText}           // controlled by React state
          onChange={handleChange}     // updates state as you type
        />
      </div>

      {/* Button */}
      <button className="analyze-btn" onClick={handleAnalyze}>
        Analyze
      </button>

      {/* Results Section */}
      <div className="results-section">
        <p className="result-label">Sarcasm Likelihood:</p>
        <p className="result-value">
          {sarcasmScore !== null ? `${sarcasmScore}%` : "--%"}
        </p>
        {sarcasmLabel && (
          <p className="result-description">{sarcasmLabel}</p>
        )}
      </div>
    </div>
  );
}

export default SarcasmPanel;
