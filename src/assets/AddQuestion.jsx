import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/AddQuestion.css";

function AddQuestion() {
  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState("");
  const [formData, setFormData] = useState({
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/exams");
      setExams(response.data);
    } catch (error) {
      setMessage("Failed to load exams.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedExamId) {
      setMessage("Please select an exam");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8081/api/questions/add/${selectedExamId}`,
        formData
      );
      setMessage("Question added successfully!");
      setFormData({
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
      });
    } catch (error) {
      setMessage("Failed to add question.");
    }
  };

  return (
    <div className="add-question-container">
      <div className="add-question-card">
        <h2 className="add-question-title">Add Question</h2>

        {message && (
          <div
            className={`add-question-message ${
              message.includes("successfully") ? "success" : "error"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="add-question-form">
          <div className="form-group">
            <label>Select Exam:</label>
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              required
              className="form-control"
            >
              <option value="">--Select Exam--</option>
              {exams.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Question Text:</label>
            <textarea
              name="questionText"
              value={formData.questionText}
              onChange={handleChange}
              required
              rows="3"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Option A:</label>
            <input
              type="text"
              name="optionA"
              value={formData.optionA}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Option B:</label>
            <input
              type="text"
              name="optionB"
              value={formData.optionB}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Option C:</label>
            <input
              type="text"
              name="optionC"
              value={formData.optionC}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Option D:</label>
            <input
              type="text"
              name="optionD"
              value={formData.optionD}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Correct Answer (A, B, C, or D):</label>
            <input
              type="text"
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
              maxLength="1"
              pattern="[ABCDabcd]"
              title="Correct answer must be one of A, B, C, or D"
              required
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddQuestion;
