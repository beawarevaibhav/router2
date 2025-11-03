import { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");

  // Load saved value on page load
  useEffect(() => {
    const saved = localStorage.getItem("myInput");
    if (saved) {
      setText(saved);
    }
  }, []);

  // Save value when Submit button clicked
  const handleSubmit = () => {
    localStorage.setItem("myInput", text);
    alert("✅ Saved in Local Storage!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Simple Input → LocalStorage</h2>

      <input
        type="text"
        value={text}
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleSubmit} style={{ marginLeft: 10 }}>
        Submit
      </button>

      <p style={{ marginTop: 20 }}>
        <b>Saved Value:</b> {text}
      </p>
    </div>
  );
}

export default App;
