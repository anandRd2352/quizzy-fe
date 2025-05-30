import React, { useState } from 'react';
import ExamModal from '../Admin/CreateExamPage';
import QuestionModal from './QuestionModal';

function ExamModalPage() {
  const [showExam, setShowExam] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  return (
    <div className="p-4">
      <h2>Exam Management</h2>

      <button onClick={() => setShowExam(true)}>Add/Edit Exam</button>
      <button className="ms-3" onClick={() => setShowQuestion(true)}>Add/Edit Question</button>

      {/* Show modals only when state is true */}
      <ExamModal show={showExam} handleClose={() => setShowExam(false)} />
      <QuestionModal show={showQuestion} handleClose={() => setShowQuestion(false)} />
    </div>
  );
}

export default ExamModalPage;