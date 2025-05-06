import React from 'react';
import CountdownTimerUI from './CountdownTimerUI';

const ExamPage = () => {
  return (
    <div className="exam-container">
      <h1>Online Examination</h1>
      <CountdownTimerUI initialTime={300} /> {/* 300 seconds = 5 minutes */}
      {/* Add other UI elements like exam questions here */}
    </div>
  );
};

export default ExamPage;
