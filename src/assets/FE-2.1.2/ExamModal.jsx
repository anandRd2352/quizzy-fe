import React from 'react';
import "../css/ExamModal.css";


const ExamModal = ({ show, handleClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Add/Edit Exam</h2>
        <form>
          <label>Exam Title</label>
          <input type="text" placeholder="Enter exam title" />

          <label>Exam Date</label>
          <input type="date" />

          <label>Duration (minutes)</label>
          <input type="number" placeholder="Enter duration" />

          <div className="modal-buttons">
            <button type="button" onClick={handleClose}>Close</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamModal;
