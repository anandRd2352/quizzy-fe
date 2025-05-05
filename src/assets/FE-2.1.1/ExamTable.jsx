import React from "react";
import "../css/ExamTable.css"; // Import CSS

const exams = [
  { id: 1, name: "Data Structures & Algorithms", questions: 30 },
  { id: 2, name: "Java Programming", questions: 30 },
  { id: 3, name: "Python Programming", questions: 30 },
  { id: 4, name: "C++ Programming", questions: 30 },
  { id: 5, name: "General Aptitude", questions: 30 },
  { id: 6, name: "Database Management", questions: 25 },
];

export default function ExamTable() {
  const handleAttend = (examId) => {
    alert(`Attending exam ${examId}`);
  };

  return (
    <div className="exam-container">
      <h1 className="exam-title">Available Exams</h1>
      <table className="exam-table">
        <thead>
          <tr>
            <th>Exam Name</th>
            <th>Questions</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.name}</td>
              <td>{exam.questions}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleAttend}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
