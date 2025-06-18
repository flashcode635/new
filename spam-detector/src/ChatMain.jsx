import './ChatMain.css';
import React from "react";

const defaultOptions = [
  { id: 1, description: "How does AI work?" },
  { id: 2, description: "What makes conversations more engaging with people?" },
  { id: 3, description: "Are black holes real?" },
  { id: 4, description: "How many Rs are in the word 'strawberry'?" }
];

function Default({ onOptionClick }) {
  return (
    <>
      {defaultOptions.map((option) => (
        <li key={option.id}>
          <button
            onClick={() => onOptionClick(option.description)}
            className='default-options'
          >
            {option.description}
          </button>
        </li>
      ))}
    </>
  );
}

export default function ChatMain({ messages, onOptionClick }) {
  return (
    <div className="chat-main">
      <h1>How can I help you?</h1>

      <div className="quick-actions">
        <button>Create</button>
        <button>Explore</button>
        <button>Code</button>
        <button>Learn</button>
      </div>

      <ul className="example-questions" style={{ width: "80%", marginBottom: "30px" }}>
        <Default onOptionClick={onOptionClick} />
      </ul>

      <div className="chat-display" >
        {messages.map((msg, idx) => (
          <div key={idx} className="chat-bubble" >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}
