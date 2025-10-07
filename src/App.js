import React, { useState, useEffect } from 'react';
import UserList from './compnents/userList/userlist';
import './App.css';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode class on root div
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="App">
      <header className="app-header">
        <h1>InstaBoard Users</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      <main>
        <UserList />
      </main>
    </div>
  );
}
