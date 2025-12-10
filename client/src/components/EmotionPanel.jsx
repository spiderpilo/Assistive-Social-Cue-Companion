import { useEffect, useRef, useState } from "react";

function EmotionPanel() {
  const videoRef = useRef(null);

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState("");

  // NEW: emotion state
  const [detectedEmotion, setDetectedEmotion] = useState("—");
  const [confidence, setConfidence] = useState(0); // 0–100

  // Handle webcam on/off
  useEffect(() => {
    if (!isCameraOn) {
      // turn OFF camera
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
        videoRef.current.srcObject = null;
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
        console.error("Error accessing webcam:", err);
        setError("Could not access webcam. Check browser permissions.");
        setIsCameraOn(false);
      }
    }

    start();

    // cleanup whenever isCameraOn changes or component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, [isCameraOn]);

  function handleToggleCamera() {
    setError("");
    setIsCameraOn((prev) => {
      const next = !prev;

      // If we are turning the camera OFF, reset emotion state
      if (!next) {
        setDetectedEmotion("—");
        setConfidence(0);
      }

      return next;
    });
  }

  // NEW: mock emotion detection
  function handleAnalyzeEmotion() {
    if (!isCameraOn) {
      setError("Turn on the camera to analyze expressions.");
      return;
    }

    // For now, this is MOCK logic. Later this is where a real model/backend goes.
    const emotions = ["Happy", "Neutral", "Sad", "Confused", "Surprised"];
    const randomEmotion =
      emotions[Math.floor(Math.random() * emotions.length)];

    // Confidence between 60% and 98%
    const randomConfidence = Math.floor(60 + Math.random() * 38);

    setDetectedEmotion(randomEmotion);
    setConfidence(randomConfidence);
    setError("");
  }

  return (
    <section className="panel emotion-panel">
      {/* HEADER */}
      <div className="panel-header">
        <h2 className="panel-title">Real-Time Emotion Detection</h2>
        <p className="panel-subtitle">
          Use your webcam to practice recognizing facial expressions in real
          time.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="panel-main">
        {/* Webcam */}
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
              Webcam is off. Click &quot;Start Camera&quot; to begin.
            </span>
          )}
        </div>

        {error && <p className="error-text">{error}</p>}

        {/* Emotion info */}
        <div className="emotion-info">
          <div className="emotion-row">
            <span>Detected emotion:</span>
            <strong>{detectedEmotion}</strong>
          </div>

          <div className="confidence-row">
            <span>Confidence:</span>
            <div className="confidence-bar">
              <div
                className="confidence-fill"
                style={{ width: `${confidence}%` }}
              />
            </div>
            <span className="confidence-percent">{confidence}%</span>
          </div>
        </div>
      </div>

      {/* FOOTER BUTTONS */}
      <div className="panel-footer">
        <div className="emotion-buttons">
          <button className="button button-primary" onClick={handleToggleCamera}>
            {isCameraOn ? "Stop Camera" : "Start Camera"}
          </button>

          <button
            className="button button-secondary"
            onClick={handleAnalyzeEmotion}
            disabled={!isCameraOn}
          >
            Analyze Expression
          </button>
        </div>
      </div>
    </section>
  );
}

export default EmotionPanel;
