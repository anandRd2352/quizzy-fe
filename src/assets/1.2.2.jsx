import React, { useState } from 'react';
import './css/1.2.2.css'; // Ensure the correct path for CSS

const UserProfileUpdate = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    

    // Manual validation of form fields
    if (name.trim() && email.trim() && phone.trim() && address.trim()) {
      setMessage('Profile updated successfully!');
      setFormError('');
    } else {
      setFormError('All fields are required!');
      setMessage('');
    }

    setValidated(true); // Trigger visual validation feedback
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h3>Update Profile</h3>
        {message && <div className="alert success">{message}</div>}
        {formError && <div className="alert error">{formError}</div>}
        <form noValidate onSubmit={handleSubmit}>
          <div className={`form-group ${validated && !name ? 'is-invalid' : ''}`}>
            <label htmlFor="formName">Name</label>
            <input
              required
              type="text"
              placeholder="Enter your name"
              id="formName"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {validated && !name && (
              <div className="invalid-feedback">Please enter your name.</div>
            )}
          </div>

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

          <div className={`form-group ${validated && !phone ? 'is-invalid' : ''}`}>
            <label htmlFor="formPhone">Phone Number</label>
            <input
              required
              type="text"
              placeholder="Enter phone number"
              id="formPhone"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {validated && !phone && (
              <div className="invalid-feedback">Please enter a valid phone number.</div>
            )}
          </div>

          <div className={`form-group ${validated && !address ? 'is-invalid' : ''}`}>
            <label htmlFor="formAddress">Address</label>
            <textarea
              required
              placeholder="Enter address"
              id="formAddress"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {validated && !address && (
              <div className="invalid-feedback">Please enter your address.</div>
            )}
          </div>

          <button type="submit" className="btn-submit">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfileUpdate;
