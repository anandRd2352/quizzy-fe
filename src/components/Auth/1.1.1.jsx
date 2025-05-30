import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/1.1.1.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidated(true);
    setMessage('');
    setError('');

    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.trim() !== '';

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    // Dummy users
    const users = [
      { email: 'admin@example.com', password: 'admin123', role: 'admin' },
      { email: 'student@example.com', password: 'password123', role: 'student' }
    ];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      setMessage('Login successful!');
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/exams');
      }
    } else {
      setError('Incorrect email or password.');
    }
  };

  return (
    <div className="outer-class">
      <div className="login-container">
        <div className="login-card">
          <h3>Login</h3>

          {message && <div className="alert success">{message}</div>}
          {error && <div className="alert error">{error}</div>}

          <form noValidate onSubmit={handleSubmit}>
            <div className={`form-group ${validated && (!email || !validateEmail(email)) ? 'is-invalid' : ''}`}>
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
              {validated && (!email || !validateEmail(email)) && (
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

            <p style={{ marginTop: '1rem' }}>
              Don&apos;t have an account? <Link to="/register">Register here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
