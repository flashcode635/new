import './Sidebar.css'
import React from "react";

export default function Sidebar() {
  return (
    <div > 
    <aside className="sidebar" style={{height:"100vh"}} >
      <div className="brand">Swamp.io</div>
      <button className="new-chat-btn">New Chat</button>
      <input className="search-input" placeholder="Search your threads..." />
      <nav className="nav-links">
        <div className="section-title">Today</div>
        <div className="nav-item">World News Summary</div>
        <div className="section-title">Older</div>
        <div className="nav-item">Welcome to T3 Chat</div>
        <div className="nav-item">FAQ</div>
      </nav>
      <button className="login-btn">Login</button>
    </aside>
    </div>
  );
}

