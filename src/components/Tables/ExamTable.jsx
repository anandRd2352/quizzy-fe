import React, { useState } from "react";
import "../css/ExamTable.css";
import { useNavigate } from "react-router-dom";

const initialExams = [
  { id: 1, name: "Data Structures & Algorithms", questions: 30 },
  { id: 2, name: "Java Programming", questions: 30 },
  { id: 3, name: "Python Programming", questions: 30 },
  { id: 4, name: "C++ Programming", questions: 30 },
  { id: 5, name: "General Aptitude", questions: 30 },
  { id: 6, name: "Database Management", questions: 25 },
];

export default function ExamTable() {
  const [exams, setExams] = useState(initialExams);
  const navigate = useNavigate();

  const handleEdit = (examId) => {
    alert(`Navigating to edit exam ${examId}`);
    navigate("/admin/create-exam");
  };

  const handleDelete = (examId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this exam?");
    if (confirmDelete) {
      const updatedExams = exams.filter((exam) => exam.id !== examId);
      setExams(updatedExams);
    }
  };

  return (
    <div className="exam-container">
      <h1 className="exam-title">Available Exams</h1>
      <table className="exam-table">
        <thead>
          <tr>
            <th>Exam Name</th>
            <th>Questions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.name}</td>
              <td>{exam.questions}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(exam.id)}>
                  Edit
                </button>
                <button className="delete-button ms-2" onClick={() => handleDelete(exam.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {exams.length === 0 && (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", color: "gray" }}>
                No exams available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

