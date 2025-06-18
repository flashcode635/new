import Sidebar from './Sidebar';
import ChatMain from './ChatMain';
import ChatInput from './ChatInput';
import React, { useState, useRef, useEffect } from "react";
import './App.css'; // Make sure to create this file as shown below

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatScrollableRef = useRef(null);

  useEffect(() => {
    if (chatScrollableRef.current) {
      chatScrollableRef.current.scrollTop = chatScrollableRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages(prev => [...prev, { text: inputValue, sender: 'user' }]);
      setInputValue('');
    }
  };

  const handleOptionClick = (description) => {
    setInputValue(description);
  };

  return (
    <div className="app-container">
      {/* Fixed Sidebar */}
      <aside className="sidebar-fixed">
        <Sidebar />
      </aside>

      {/* Main Chat Area */}
      <main className="chat-main-area">
        <div className="chat-scrollable" ref={chatScrollableRef}>
          <ChatMain messages={messages} onOptionClick={handleOptionClick} />
        </div>
        <div className="chat-input-area">
          <ChatInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSend={handleSendMessage}
          />
          <footer className="privacy-policy">
            Make sure you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;