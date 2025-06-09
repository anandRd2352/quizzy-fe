import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/AddExam.css"; 

function AddExam() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/api/exams/add", form);
      setMessage(" Exam added successfully!");
      setForm({ title: "", description: "" });

      // Optional: redirect back to dashboard after 2s
      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 2000);
    } catch (error) {
      setMessage(" Failed to add exam. Please try again.");
    }
  };

  return (
    <div className="add-exam-container">
      <h2>Add New Exam</h2>
      {message && <p className="status-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Add Exam</button>
      </form>
    </div>
  );
}

export default AddExam;
