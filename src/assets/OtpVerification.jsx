import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:8081/api/otp/verify", null, {
        params: { email, otp },
      });

      if (response.data === true) {
        setMessage("OTP verified successfully!");
        alert("OTP verified! You can now login.");
        navigate("/login");
      } else {
        setMessage("Invalid OTP. Try again.");
      }
    } catch (error) {
      setMessage("Verification failed.");
    }
  };

  if (!email) {
    return <p>Email not provided. Please register again.</p>;
  }

  return (
    <div className="container mt-4">
      <h2>OTP Verification</h2>
      <p>OTP sent to: <strong>{email}</strong></p>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button className="btn btn-primary" onClick={verifyOtp}>Verify OTP</button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}

export default OtpVerification;
