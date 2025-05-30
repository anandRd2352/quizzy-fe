import React, { useState } from 'react';
import '../css/EmailOTPVerification.css';
import { useNavigate } from 'react-router-dom';

const EmailOTPVerification = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [verificationMessage, setVerificationMessage] = useState('');
  const [sentMessage, setSentMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const DUMMY_OTP = '123456';

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSendOtp = () => {
    if (!email) {
      setError('Please enter your email before sending OTP.');
      return;
    }
    setError('');
    setSentMessage(`A dummy OTP (${DUMMY_OTP}) has been sent to your email.`);
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setError('Please enter all 6 digits of the OTP.');
      return;
    }

    if (enteredOtp === DUMMY_OTP) {
      setError('');
      setVerificationMessage('OTP verified successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Email Verification</h2>

        <div className="input-group">
          <label htmlFor="email">Enter your Email</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="btn send-btn" onClick={handleSendOtp}>
          Send OTP
        </button>

        {sentMessage && <p className="sent-message">{sentMessage}</p>}
        {error && <p className="error-text">{error}</p>}

        <div className="otp-group">
          <label>Enter OTP</label>
          <div className="otp-inputs">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleOtpChange(e.target, index)}
              />
            ))}
          </div>
        </div>

        <button className="btn verify-btn" onClick={handleVerifyOtp}>
          Verify OTP
        </button>

        {verificationMessage && (
          <p className="verification-message">{verificationMessage}</p>
        )}
      </div>
    </div>
  );
};

export default EmailOTPVerification;
