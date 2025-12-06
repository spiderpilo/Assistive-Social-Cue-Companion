function SarcasmPanel(){
    return (
        <div className="sarcasm-panel">
            {/*title*/}
            <h2 className="panel-title">Sarcasm Analizer</h2>

            {/*input section*/}
            <div className="input-section">
                <label htmlFor="sarcasm-input">Enter a message: </label>
                <textarea
                id="sarcasmInput"
                placeholder="Type something here..."
                className="sarcasm-textarea"
                />
            </div>

             {/* 3. Button */}
            <button className="analyze-btn">Analyze</button>

            {/* 4. Results Section */}
            <div className="results-section">
                <p className="results-label">Sarcasm likelihood score:</p>
                <p className="results-value">--%</p>
            </div>

        </div>

)}
export default SarcasmPanel;