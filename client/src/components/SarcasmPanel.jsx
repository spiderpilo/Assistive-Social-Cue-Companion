import { useState } from "react";

function SarcasmPanel() {
  const [inputText, setInputText] = useState("");
  const [sarcasmScore, setSarcasmScore] = useState(null);
  const [sarcasmLabel, setSarcasmLabel] = useState("");

  function handleChange(e) {
    setInputText(e.target.value);
  }

  function handleAnalyze() {
    const trimmed = inputText.trim();
    if (!trimmed) {
      setSarcasmScore(null);
      setSarcasmLabel("Please enter a message to analyze.");
      return;
    }

    const base = Math.min(trimmed.length, 100);
    const randomNoise = Math.floor(Math.random() * 15);
    const fakeScore = Math.min(base + randomNoise, 100);

    let label;
    if (fakeScore > 70) label = "Very likely sarcastic";
    else if (fakeScore > 40) label = "Possibly sarcastic";
    else label = "Unlikely sarcastic";

    setSarcasmScore(fakeScore);
    setSarcasmLabel(label);
  }

  return (
    <section className="panel sarcasm-panel">
      {/* HEADER */}
      <div className="panel-header">
        <h2 className="panel-title">Sarcasm Analyzer</h2>
        <p className="panel-subtitle">
          Type a message and get a quick estimate of how sarcastic it sounds.
        </p>
      </div>

      {/* MAIN */}
      <div className="panel-main">
        <div className="input-section">
          <label htmlFor="sarcasmInput">Enter a message:</label>
          <textarea
            id="sarcasmInput"
            placeholder="Type something here..."
            className="sarcasm-textarea"
            value={inputText}
            onChange={handleChange}
          />
        </div>

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

      {/* FOOTER */}
      <div className="panel-footer">
        <button className="analyze-btn" onClick={handleAnalyze}>
          Analyze
        </button>
      </div>
    </section>
  );
}

export default SarcasmPanel;
