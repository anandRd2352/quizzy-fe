import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/QuestionList.css";

function QuestionList() {
  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/exams");
      setExams(response.data);
    } catch {
      setMessage("Failed to load exams.");
    }
  };

  const fetchQuestions = async (examId) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/questions/exam/${examId}`);
      setQuestions(response.data);
    } catch {
      setMessage("Failed to load questions.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/questions/delete/${id}`);
      setQuestions(questions.filter(q => q.id !== id));
    } catch {
      alert("Failed to delete question.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-question/${id}`);
  };

  return (
    <div className="question-list-container">
      <h2>View Questions by Exam</h2>
      <div className="form-group">
        <label>Select Exam:</label>
        <select
          className="form-control"
          value={selectedExamId}
          onChange={(e) => {
            setSelectedExamId(e.target.value);
            fetchQuestions(e.target.value);
          }}
        >
          <option value="">--Select Exam--</option>
          {exams.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.title}
            </option>
          ))}
        </select>
      </div>

      {questions.length > 0 && (
        <table className="table table-bordered mt-4">
          <thead className="thead-dark">
            <tr>
              <th>Question</th>
              <th>Options</th>
              <th>Correct Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id}>
                <td>{q.questionText}</td>
                <td>
                  A: {q.optionA} <br />
                  B: {q.optionB} <br />
                  C: {q.optionC} <br />
                  D: {q.optionD}
                </td>
                <td>{q.correctAnswer}</td>
                <td>
                  <button className="btn btn-sm btn-warning mr-2" onClick={() => handleEdit(q.id)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(q.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default QuestionList;
