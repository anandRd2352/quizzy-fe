import React from 'react';
import '../css/ResultSummary.css';

const ResultSummary = ({ totalQuestions, correctAnswers, passingScore }) => {
  const isPassed = correctAnswers >= passingScore;

  return (
    <div className="result-container">
      <h2> Result</h2>
      <p style={{fontSize:"45px"}} className={isPassed ? 'pass' : 'fail'}>
        {isPassed ? 'Pass' : 'Fail'}
      </p>
      <p style={{marginRight:"200px"}}>Total Questions: <strong>{totalQuestions}</strong></p>
      <p style={{marginRight:"200px"}}>Your Score: <strong>{correctAnswers}</strong></p>
      
    </div>
  );
};

export default ResultSummary;
