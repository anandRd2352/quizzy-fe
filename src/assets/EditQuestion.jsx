import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/EditQuestion.css"

function EditQuestion() {
  const [exams, setExams] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [selectedExamId, setSelectedExamId] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState("");

  const [formData, setFormData] = useState({
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });

  // Fetch all exams on load
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/exams")
      .then((res) => setExams(res.data))
      .catch(() => alert("Failed to fetch exams"));
  }, []);

  // Fetch questions when exam changes
  useEffect(() => {
    if (selectedExamId) {
      axios
        .get(`http://localhost:8081/api/questions/exam/${selectedExamId}`)
        .then((res) => setQuestions(res.data))
        .catch(() => alert("Failed to fetch questions"));
      setSelectedQuestionId("");
      setFormData({
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
      });
    } else {
      setQuestions([]);
      setSelectedQuestionId("");
      setFormData({
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
      });
    }
  }, [selectedExamId]);

  // Fetch question details when question changes
  useEffect(() => {
    if (selectedQuestionId) {
      axios
        .get(`http://localhost:8081/api/questions/${selectedQuestionId}`)
        .then((res) => setFormData(res.data))
        .catch(() => alert("Failed to fetch question data"));
    }
  }, [selectedQuestionId]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8081/api/questions/update/${selectedQuestionId}`, formData)
      .then(() => alert("Question updated successfully!"))
      .catch(() => alert("Update failed"));
  };

  return (
    <div className="container mt-4">
      <h2>Edit Question</h2>

      <div className="mb-3">
        <label>Select Exam:</label>
        <select
          value={selectedExamId}
          onChange={(e) => setSelectedExamId(e.target.value)}
          className="form-select"
        >
          <option value="">-- Select Exam --</option>
          {exams.map((exam) => (
            <option key={exam.id} value={exam.id}>{exam.title}</option>
          ))}
        </select>
      </div>

      {selectedExamId && (
        <div className="mb-3">
          <label>Select Question:</label>
          <select
            value={selectedQuestionId}
            onChange={(e) => setSelectedQuestionId(e.target.value)}
            className="form-select"
          >
            <option value="">-- Select Question --</option>
            {questions.map((q) => (
              <option key={q.id} value={q.id}>{q.questionText.substring(0, 50)}...</option>
            ))}
          </select>
        </div>
      )}

      {selectedQuestionId && (
        <form onSubmit={handleSubmit}>
          <label>Question Text:</label>
          <textarea
            name="questionText"
            value={formData.questionText}
            onChange={handleChange}
            required
            rows="3"
            className="form-control"
          />

          <label>Option A:</label>
          <input
            type="text"
            name="optionA"
            value={formData.optionA}
            onChange={handleChange}
            required
            className="form-control"
          />

          <label>Option B:</label>
          <input
            type="text"
            name="optionB"
            value={formData.optionB}
            onChange={handleChange}
            required
            className="form-control"
          />

          <label>Option C:</label>
          <input
            type="text"
            name="optionC"
            value={formData.optionC}
            onChange={handleChange}
            required
            className="form-control"
          />

          <label>Option D:</label>
          <input
            type="text"
            name="optionD"
            value={formData.optionD}
            onChange={handleChange}
            required
            className="form-control"
          />

          <label>Correct Answer:</label>
          <input
            type="text"
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={handleChange}
            required
            className="form-control"
          />

          <button className="btn btn-primary mt-3" type="submit">
            Update Question
          </button>
        </form>
      )}
    </div>
  );
}

export default EditQuestion;
