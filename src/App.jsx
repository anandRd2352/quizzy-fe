import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import UserProfile from './assets/FE-1.2.1/UserProfile';






function App() {
  return (
    <div className="App">
      <UserProfile />
    </div>
  );
}

export default App;