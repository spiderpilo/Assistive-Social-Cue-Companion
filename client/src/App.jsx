import EmotionPanel from "./components/EmotionPanel.jsx";
import SarcasmPanel from "./components/SarcasmPanel.jsx";
import "./styles.css";

function App() {
  return (
    <div className="app-container">
      <EmotionPanel />
      <SarcasmPanel />
    </div>
  );
}

export default App;
