import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

import EmailOTPVerification from './assets/FE-1.1.3/EmailOTPVerification.jsx';
import ExamModalPage from "./assets/FE-2.1.2/ExamModalPage.jsx";

function App() {
  return (
    <div className="App">
      {/* <nav className="p-3 bg-light border-bottom mb-4">
        <Link to="/EmailOTPVerification" className="me-3">OTP Verification</Link>
        <Link to="/Exam">Exam Modal</Link>
      </nav> */}

      <Routes>
        <Route path="/EmailOTPVerification" element={<EmailOTPVerification />} />
        <Route path="/Exam" element={<ExamModalPage />} />
      </Routes>
    </div>
  );
}

export default App;
