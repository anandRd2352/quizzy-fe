import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Css/EditExam.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Backend login API call
      const res = await axios.post("http://localhost:8081/api/users/login", formData);
      const { email, role } = res.data;

      // ✅ Store login info using consistent keys
      localStorage.setItem("userEmail", email); // <- IMPORTANT: must match key used in StudentDashboard
      localStorage.setItem("userRole", role);

      setMessage("Login successful!");

      // ✅ Redirect user based on role
      setTimeout(() => {
        if (role.toLowerCase() === "admin") {
          navigate("/admin-dashboard");
        } else if (role.toLowerCase() === "student") {
          navigate("/student-dashboard");
        } else {
          navigate("/");
        }
      }, 1000);

    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Login failed. Please try again.";
      setMessage(errMsg);
    }
  };

  return (
    <div className="outer-container">
      <div className="register-box">
        <h2>User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {message && (
          <div
            className={`alert mt-3 ${
              message === "Login successful!" ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}

        <div className="text-center mt-3">
          Don't have an account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/")}
          >
            Register here
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
