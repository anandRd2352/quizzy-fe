import React, { useState, useEffect } from 'react';

const CountdownTimerUI = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="timer-container">
      <h2>Time Left</h2>
      <div className="timer">
        <span>{timeLeft} seconds</span>
      </div>
      {timeLeft === 0 && <div className="auto-submit-message">Time's up! Your exam is being submitted...</div>}
    </div>
  );
};

export default CountdownTimerUI;
