import React, { useState } from 'react';
import './css/1.1.1.css'; // Ensure path is correct

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (email.trim() && password.trim()) {
      setMessage('Login successful!');
    } else {
      setMessage('');
    }
    
    setValidated(true);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h3>Student Login</h3>
        {message && <div className="alert success">{message}</div>}
        <form noValidate onSubmit={handleSubmit}>
          <div className={`form-group ${validated && !email ? 'is-invalid' : ''}`}>
            <label htmlFor="formEmail">Email address</label>
            <input
              required
              type="email"
              placeholder="Enter email"
              id="formEmail"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {validated && !email && (
              <div className="invalid-feedback">Please enter a valid email.</div>
            )}
          </div>

          <div className={`form-group ${validated && !password ? 'is-invalid' : ''}`}>
            <label htmlFor="formPassword">Password</label>
            <input
              required
              type="password"
              placeholder="Password"
              id="formPassword"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {validated && !password && (
              <div className="invalid-feedback">Please enter your password.</div>
            )}
          </div>

          <button type="submit" className="btn-submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
