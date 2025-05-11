import React, { useEffect, useState } from 'react';
import QuestionCard from './QuestionCard';
import questionsData from './Questions.json';
import "../css/ExamInterface.css";

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function ExamInterface() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    setQuestions(shuffle(questionsData));
  }, []);

  const handleAnswer = (selectedOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [current]: selectedOption,
    }));
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setShowScore(true);
  };

  if (questions.length === 0) return <p>Loading...</p>;

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', padding: '30px' }}>
      {showScore ? (
        <h2>Your Score: {score} / {questions.length}</h2>
      ) : (
        <>
          {/* Left Side: Question and Navigation */}
          <div className="question-container">
            <QuestionCard
              questionData={questions[current]}
              selectedOption={selectedAnswers[current] || null}
              onAnswer={handleAnswer}
            />
            <div className="controls">
              <button onClick={handlePrevious} disabled={current === 0}>Previous</button>
              <button onClick={handleNext} disabled={current === questions.length - 1}>Next</button>
              {current === questions.length - 1 && (
                <button onClick={handleSubmit}>Submit</button>
              )}
            </div>
          </div>
          <div className="nav-buttons-container">
          <div className="nav-buttons">
            {questions.map((_, idx) => {
              const isCurrent = current === idx;
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isVisited = idx < current && !isAnswered;

              let bgColor = '#e0e0e0'; 

              if (isCurrent) {
                bgColor = '#007bff'; 
              } else if (isAnswered) {
                bgColor = '#28a745'; 
              } else if (isVisited) {
                bgColor = '#dc3545'; 
              }

              return (
                <button
                  key={idx}
                  className="nav-button"
                  onClick={() => setCurrent(idx)}
                  style={{
                    backgroundColor: bgColor,
                    color: bgColor === '#e0e0e0' ? '#000' : '#fff'
                  }}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ExamInterface;
