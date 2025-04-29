import React, { useState } from 'react';
import '../css/EmailOTPVerification.css';



const EmailOTPVerification = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.nextSibling) {
      element.nextSibling.focus();
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

        <button className="btn send-btn">Send OTP</button>

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

        <button className="btn verify-btn">Verify OTP</button>
      </div>
    </div>
  );
};

export default EmailOTPVerification;
