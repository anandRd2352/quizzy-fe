import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

import EmailOTPVerification from './assets/FE-1.1.3/EmailOTPVerification.jsx';
import ExamModalPage from './assets/FE-2.1.2/ExamModalPage.jsx';
import CountdownTimerUI from './assets/FE-3.1.3/CountdownTimerUI.jsx'; // Create this new file for countdown timer

function App() {
  return (
    <div className="App">
      {/* Navigation (optional, if you want to navigate between pages) */}
      {/* 
      <nav className="p-3 bg-light border-bottom mb-4">
        <Link to="/EmailOTPVerification" className="me-3">OTP Verification</Link>
        <Link to="/Exam" className="me-3">Exam Modal</Link>
        <Link to="/ExamWithTimer" className="me-3">Exam with Timer</Link>
      </nav>
      */}

      <Routes>
        <Route path="/EmailOTPVerification" element={<EmailOTPVerification />} />
        <Route path="/Exam" element={<ExamModalPage />} />
       
        <Route path="/ExamWithTimer" element={<CountdownTimerUI initialTime={300} />} />
      </Routes>
    </div>
  );
}

export default App;
