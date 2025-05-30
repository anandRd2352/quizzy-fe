import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import "../css/RegistrationForm.css";
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [profileFile, setProfileFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      valid = false;
    } else {
      setErrorMessage('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      if (profileFile) {
        formData.append('profilePic', profileFile);
      }

      // ✅ Simulate success
     

      // ✅ Redirect to OTP verification after short delay
      setTimeout(() => {
        navigate('/verify-email');
      }, 2000);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, file: null }));
    } else {
      setProfileFile(null);
      setPreviewUrl(null);
      setErrors((prev) => ({ ...prev, file: 'File is required.' }));
    }
  };

  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <div className="container-heading" style={{ display: "flex", justifyContent: "center" }}>
          <h1>Registration Form</h1>
        </div>

        {successMessage && (
          <div className="alert alert-success text-center" role="alert">
            {successMessage}
          </div>
        )}

        <div className="containerMain">
          <div className="inputBox">
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label>Email</label>
            <div className="error-text">{errorMessage}</div>
          </div>

          <div className="inputBox" style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <label>Password</label>
            <i
              className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={togglePasswordVisibility}
              style={{
                cursor: 'pointer',
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#28a745',
              }}
            />
            <div className="error-text">{passwordError}</div>
          </div>

          <div className="file-upload-row">
            <Form.Group className="file-upload">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                id="profilepic"
                accept="image/*"
                onChange={handleFileChange}
                isInvalid={!!errors.file}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.file}
              </Form.Control.Feedback>
              {previewUrl && (
                <div className="image-preview" style={{ marginTop: '10px' }}>
                  <img src={previewUrl} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                  <p>{profileFile?.name}</p>
                </div>
              )}
            </Form.Group>
          </div>

          <div className="submit-button" style={{ marginTop: '20px' }}>
            <Button type="submit" variant="success">Register</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
