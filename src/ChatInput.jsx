// ChatInput.jsx
import './ChatInput.css';
import React from 'react';

export default function ChatInput({ inputValue, setInputValue, onSend }) {
  const handleSend = () => {
    if (inputValue.trim()) {
      onSend(); // send the message via callback
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-input" style={{ width: "70vw", borderRadius: "10px", padding: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <input
        placeholder="Type your message here..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="send-btn" onClick={handleSend}>↑</button>
      <div className="model-select">Gemini 2.5 Flash ▼</div>
    </div>
  );
}
// ChatInput.jsx