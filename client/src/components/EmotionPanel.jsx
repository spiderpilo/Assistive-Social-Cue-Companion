import { useEffect, useRef, useState } from "react";

function EmotionPanel() {
  const videoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isCameraOn) {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
      return;
    }

    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError("Could not access webcam.");
        setIsCameraOn(false);
      }
    }

    start();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, [isCameraOn]);

  function handleToggleCamera() {
    setIsCameraOn((prev) => !prev);
    setError("");
  }

  return (
    <section className="panel emotion-panel">
      <div className="panel-header">
        <h2 className="panel-title">Real-Time Emotion Detection</h2>
        <p className="panel-subtitle">
          Use your webcam to practice recognizing facial expressions in real
          time.
        </p>
      </div>

      <div className="panel-main">
        <div className="webcam-box">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="webcam-video"
            style={{ display: isCameraOn ? "block" : "none" }}
          />

          {!isCameraOn && (
            <span className="placeholder-text">
              Webcam is off. Click "Start Camera" to begin.
            </span>
          )}
        </div>

        {error && <p className="error-text">{error}</p>}

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
      </div>

      <div className="panel-footer">
        <div className="emotion-buttons">
          <button className="button button-primary" onClick={handleToggleCamera}>
            {isCameraOn ? "Stop Camera" : "Start Camera"}
          </button>

          <button className="button button-secondary" disabled>
            Re-analyze (coming soon)
          </button>
        </div>
      </div>
    </section>
  );
}

export default EmotionPanel;
