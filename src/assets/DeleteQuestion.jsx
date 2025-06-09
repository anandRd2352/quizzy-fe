import React, { useState, useEffect } from "react";
import axios from "axios";

function DeleteQuestion() {
  const [exams, setExams] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/exams")
      .then((res) => setExams(res.data))
      .catch(() => alert("Failed to fetch exams"));
  }, []);

  useEffect(() => {
    if (selectedExamId) {
      fetchQuestions(selectedExamId);
    } else {
      setQuestions([]);
    }
  }, [selectedExamId]);

  const fetchQuestions = (examId) => {
    axios
      .get(`http://localhost:8081/api/questions/exam/${examId}`)
      .then((res) => setQuestions(res.data))
      .catch(() => alert("Failed to fetch questions"));
  };

  const handleDelete = (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      axios
        .delete(`http://localhost:8081/api/questions/delete/${questionId}`)
        .then(() => {
          alert("Question deleted successfully!");
          fetchQuestions(selectedExamId); // refresh the list
        })
        .catch(() => alert("Failed to delete question"));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Delete Questions</h2>

      <div className="mb-3">
        <label>Select Exam:</label>
        <select
          value={selectedExamId}
          onChange={(e) => setSelectedExamId(e.target.value)}
          className="form-select"
        >
          <option value="">-- Select Exam --</option>
          {exams.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.title}
            </option>
          ))}
        </select>
      </div>

      {questions.length > 0 ? (
        <div className="mt-3">
          {questions.map((q) => (
            <div key={q.id} className="card p-3 mb-3 shadow-sm">
              <p><strong>Question:</strong> {q.questionText}</p>
              <p><strong>A:</strong> {q.optionA}</p>
              <p><strong>B:</strong> {q.optionB}</p>
              <p><strong>C:</strong> {q.optionC}</p>
              <p><strong>D:</strong> {q.optionD}</p>
              <p><strong>Answer:</strong> {q.correctAnswer}</p>
              <button
                onClick={() => handleDelete(q.id)}
                className="btn btn-danger mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : selectedExamId ? (
        <p>No questions found for this exam.</p>
      ) : null}
    </div>
  );
}

export default DeleteQuestion;
