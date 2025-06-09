import React, { useState, useEffect } from "react";
import axios from "axios";

function ViewQuestion() {
  const [exams, setExams] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8081/api/exams")
      .then(res => setExams(res.data))
      .catch(() => alert("Failed to fetch exams"));
  }, []);

  useEffect(() => {
    if (selectedExamId) {
      axios.get(`http://localhost:8081/api/questions/exam/${selectedExamId}`)
        .then(res => setQuestions(res.data))
        .catch(() => alert("Failed to fetch questions"));
    } else {
      setQuestions([]);
    }
  }, [selectedExamId]);

  return (
    <div className="container mt-4">
      <h2>View Questions</h2>

      <div className="mb-3">
        <label>Select Exam:</label>
        <select
          value={selectedExamId}
          onChange={e => setSelectedExamId(e.target.value)}
          className="form-select"
        >
          <option value="">-- Select Exam --</option>
          {exams.map(exam => (
            <option key={exam.id} value={exam.id}>{exam.title}</option>
          ))}
        </select>
      </div>

      {questions.length > 0 ? (
        <div className="mt-3">
          {questions.map((question) => (
            <div key={question.id} className="card p-3 mb-3 shadow-sm">
              <p><strong>Question:</strong> {question.questionText}</p>
              <p><strong>Option A:</strong> {question.optionA}</p>
              <p><strong>Option B:</strong> {question.optionB}</p>
              <p><strong>Option C:</strong> {question.optionC}</p>
              <p><strong>Option D:</strong> {question.optionD}</p>
              <p><strong>Correct Answer:</strong> {question.correctAnswer}</p>
            </div>
          ))}
        </div>
      ) : selectedExamId ? (
        <p>No questions found for this exam.</p>
      ) : null}
    </div>
  );
}

export default ViewQuestion;
