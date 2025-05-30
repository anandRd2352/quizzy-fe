import React from "react";
import "../css/ExamModal.css";

const CreateExamPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Exam created!");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Create Exam</h2>
        <form onSubmit={handleSubmit}>
          <label>Exam Title</label>
          <input type="text" placeholder="Enter exam title" required />

          <label>Exam Date</label>
          <input type="date" required />

          <label>Duration (minutes)</label>
          <input type="number" placeholder="Enter duration" required />

          <div className="modal-buttons">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExamPage;
