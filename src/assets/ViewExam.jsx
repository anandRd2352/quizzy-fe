import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/ViewExam.css";

function ViewExam() {
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

  return (
    <div className="view-container">
      <h2>All Exams</h2>
      {message && <p className="error-message">{message}</p>}
      {exams.length === 0 ? (
        <p>No exams found.</p>
      ) : (
        exams.map((exam) => (
          <div key={exam.id} className="view-exam-card">
            <h4>{exam.title}</h4>
            <p>{exam.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ViewExam;
