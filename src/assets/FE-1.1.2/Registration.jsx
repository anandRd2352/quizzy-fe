import React, { useState } from 'react';
import { Button} from 'react-bootstrap';
import "../css/RegistrationForm.css";

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [profileName, setProfileName] = useState('');
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
};
const validatePassword= (password)=>{
    return password.length>=6;
};
const handleSubmit=(e)=>{
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
       if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters.');
      valid = false;
    } else {
      setPasswordError('');
    }
    if (valid) {
        alert(`Form submitted!\nEmail: ${email}\nPassword: ${password}\nProfile Picture: ${profileName}`);
      }
}



  return (
    <form onSubmit={handleSubmit}>
      <div className="container-heading" style={{ display: "flex", justifyContent: "center" }}>
      <h1>Registration Form</h1>
      </div>
      <div className="containerMain">
      <div className="inputBox">
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}/>
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
             color: '#28a745'
          }}
        />
        <div className="error-text">{passwordError}</div>
      </div>
   
      <div className="file-upload">

        <label>Choose Profile Picture</label>
        <input type="file" name="profilepic" id="profilepic"  accept="image/*"
        onChange={(e)=>{
            const file = e.target.files[0];
            if (file){
                setProfileName(file.name);
            }else{
                setProfileName('');
            }
        }} />
         {profileName && <div className="file-name">Selected: {profileName}</div>}
       
      </div>
      <div className="submit-button" style={{ marginTop: '20px' }}>
          <Button type="submit" variant="success">Register</Button>
        </div>
      </div>
    </form>
  );
}

export default RegistrationForm;
