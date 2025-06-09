import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/DeleteExam.css";

function DeleteExam() {
  const [exams, setExams] = useState([]);
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;

    try {
      await axios.delete(`http://localhost:8081/api/exams/delete/${id}`);
      setMessage("Exam deleted successfully.");
      fetchExams(); // Refresh list
    } catch (error) {
      setMessage("Failed to delete exam.");
    }
  };

  return (
    <div className="container">
      <h2>Delete Exams</h2>
      {message && <p className="message">{message}</p>}
      {exams.length === 0 ? (
        <p>No exams found.</p>
      ) : (
        exams.map((exam) => (
          <div key={exam.id} className="exam-item">
            <p><strong>Title:</strong> {exam.title}</p>
            <p><strong>Description:</strong> {exam.description}</p>
            <button className="btn-delete" onClick={() => handleDelete(exam.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default DeleteExam;
