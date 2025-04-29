// App.jsx
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import EmailOTPVerification from './assets/FE-1.1.3/EmailOTPVerification.jsx';





function App() {
  return (
    <div className="App">
      <EmailOTPVerification />
    </div>
  );
}

export default App;
