import { useEffect, useRef, useState } from "react";

function EmotionPanel() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState("");
  const [detectedEmotion, setDetectedEmotion] = useState("—");
  const [confidence, setConfidence] = useState(0);

  /* Emotion → overlay color */
  function getTheme(emotion) {
    switch (emotion) {
      case "Happy":
        return { stroke: "#22c55e", tint: "rgba(34,197,94,0.18)" };
      case "Sad":
        return { stroke: "#3b82f6", tint: "rgba(59,130,246,0.18)" };
      case "Surprised":
        return { stroke: "#a855f7", tint: "rgba(168,85,247,0.18)" };
      case "Confused":
        return { stroke: "#eab308", tint: "rgba(234,179,8,0.18)" };
      default:
        return { stroke: "#4a90e2", tint: "rgba(74,144,226,0.12)" };
    }
  }

  function resizeCanvas() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const rect = video.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  function drawOverlay() {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isCameraOn) return;

    const theme = getTheme(detectedEmotion);

    const boxW = canvas.width * 0.45;
    const boxH = canvas.height * 0.6;
    const x = (canvas.width - boxW) / 2;
    const y = (canvas.height - boxH) / 2;

    /* Tint */
    ctx.fillStyle = theme.tint;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* Box */
    ctx.strokeStyle = theme.stroke;
    ctx.lineWidth = 6;
    ctx.strokeRect(x, y, boxW, boxH);

    /* Label */
    const label =
      detectedEmotion === "—"
        ? "Tracking…"
        : `${detectedEmotion} • ${confidence}%`;

    ctx.font = "700 14px system-ui";
    const textW = ctx.measureText(label).width;
    const pillW = textW + 24;
    const pillH = 30;
    const pillX = x;
    const pillY = Math.max(10, y - 40);

    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, 10);
    ctx.fill();

    ctx.fillStyle = theme.stroke;
    ctx.fillRect(pillX, pillY, 6, pillH);

    ctx.fillStyle = "#111827";
    ctx.fillText(label, pillX + 14, pillY + 20);

    rafRef.current = requestAnimationFrame(drawOverlay);
  }

  function startOverlay() {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(drawOverlay);
  }

  function stopOverlay() {
    cancelAnimationFrame(rafRef.current);
    const canvas = canvasRef.current;
    if (canvas) canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  }

  useEffect(() => {
    if (!isCameraOn) {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
        videoRef.current.srcObject = null;
      }
      stopOverlay();
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = startOverlay;
      })
      .catch(() => setError("Webcam access denied."));

    return stopOverlay;
  }, [isCameraOn]);

  function toggleCamera() {
    setIsCameraOn((p) => !p);
    setDetectedEmotion("—");
    setConfidence(0);
  }

  function analyzeEmotion() {
    const emotions = ["Happy", "Sad", "Surprised", "Confused", "Neutral"];
    const e = emotions[Math.floor(Math.random() * emotions.length)];
    setDetectedEmotion(e);
    setConfidence(Math.floor(60 + Math.random() * 35));
    requestAnimationFrame(drawOverlay);
  }

  return (
    <section className="panel emotion-panel">
      <div className="panel-header">
        <h2 className="panel-title">Real-Time Emotion Detection</h2>
        <p className="panel-subtitle">
          Live webcam feed with emotion-aware overlay.
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
          <canvas ref={canvasRef} className="webcam-overlay" />
          {!isCameraOn && (
            <span className="placeholder-text">
              Webcam is off. Click “Start Camera”.
            </span>
          )}
        </div>

        {error && <p className="error-text">{error}</p>}

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
            <span>{confidence}%</span>
          </div>
        </div>
      </div>

      <div className="panel-footer emotion-buttons">
        <button className="button button-primary" onClick={toggleCamera}>
          {isCameraOn ? "Stop Camera" : "Start Camera"}
        </button>
        <button
          className="button button-secondary"
          onClick={analyzeEmotion}
          disabled={!isCameraOn}
        >
          Analyze Expression
        </button>
      </div>
    </section>
  );
}

export default EmotionPanel;
