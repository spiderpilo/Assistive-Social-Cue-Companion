function EmotionPanel() {
  return (
    <section className="panel emotion-panel">
      <h2 className="panel-title">Real-Time Emotion Detection</h2>
      <p className="panel-subtitle">
        Use your webcam to practice recognizing facial expressions in real time.
      </p>

      {/* Webcam area */}
      <div className="webcam-box">
        <span className="placeholder-text">
          Webcam feed will appear here.
        </span>
      </div>

      {/* Emotion + confidence */}
      <div className="emotion-info">
        <div className="emotion-row">
          <span>Detected emotion:</span>
          <strong>—</strong>
        </div>

        <div className="confidence-row">
          <span>Confidence:</span>
          <div className="confidence-bar">
            <div className="confidence-fill" style={{ width: "0%" }} />
          </div>
          <span className="confidence-percent">0%</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="emotion-buttons">
        <button className="button button-primary">Start Camera</button>
        <button className="button button-secondary">Re-analyze</button>
      </div>
    </section>
  );
}

export default EmotionPanel;
