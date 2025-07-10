import React, { useState, useRef, useEffect } from "react";
import { checkSpam } from './api';
import './App.css';

function App() {
  const [account, setAccount] = useState({
    username: '',
    bio: '',
    followers: 0,
    following: 0,
    posts: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccount(prev => ({
      ...prev,
      [name]: name === 'username' || name === 'bio' ? value : Number(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await checkSpam(account);
      setResult(data);
    } catch (err) {
      setError('Failed to check account. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Spam Account Detector</h1>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={account.username}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={account.bio}
              onChange={handleInputChange}
              rows="3"
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Followers</label>
              <input
                type="number"
                name="followers"
                value={account.followers}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Following</label>
              <input
                type="number"
                name="following"
                value={account.following}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Posts</label>
              <input
                type="number"
                name="posts"
                value={account.posts}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
          </div>
          
          <button type="submit" disabled={isLoading} className="submit-btn">
            {isLoading ? 'Checking...' : 'Check Account'}
          </button>
        </form>
        
        {error && <div className="error">{error}</div>}
        
        {result !== null && (
          <div className={`result ${result.isSpam ? 'spam' : 'not-spam'}`}>
            <h3>Result:</h3>
            <p>
              This account is {result.isSpam ? 'likely a SPAM account' : 'NOT a spam account'}.
            </p>
            <p>Confidence: {result.confidence}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;