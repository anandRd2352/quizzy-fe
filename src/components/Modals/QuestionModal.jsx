import React from 'react';
import "../css/QuestionModal.css";


const QuestionModal = ({ show, handleClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Add/Edit Question</h2>
        <form>
          <label>Question</label>
          <textarea placeholder="Enter the question"></textarea>

          <label>Option A</label>
          <input type="text" placeholder="Option A" />
          <label>Option B</label>
          <input type="text" placeholder="Option B" />
          <label>Option C</label>
          <input type="text" placeholder="Option C" />
          <label>Option D</label>
          <input type="text" placeholder="Option D" />

          <label>Correct Answer</label>
          <select>
            <option value="">Select</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
          </select>

          <div className="modal-buttons">
            <button type="button" onClick={handleClose}>Close</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionModal;