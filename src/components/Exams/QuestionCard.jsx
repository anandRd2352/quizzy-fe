import React from 'react';
import { useState } from 'react';
import "../css/QuestionInterface.css";

function QuestionCard({ questionData, onAnswer }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [submittedOption, setSubmittedOption] = useState(null);
    const handleSubmit = () => {
      if (selectedOption !== null) {
        onAnswer(selectedOption);
        setSubmittedOption(selectedOption);
        setSelectedOption(null); 
      }
    };
  
  return (
    <div className='container'>
      <h6 className='question'>{questionData.question}</h6>
      <form>
      {questionData.options.map((opt, index) => (
        <div key={index} className={`options ${submittedOption === opt ? 'submitted' : ''}`} >
          <label>
              <input
                type="radio"
                name="option"
                value={opt}
                checked={selectedOption === opt}
                onChange={() => setSelectedOption(opt)}
              />
              {opt}
            </label>
        </div>
      ))}
       <button className= "mv-3" type="button" onClick={handleSubmit} disabled={selectedOption === null}>
          Confirm Answer
        </button>
    </form>
    </div>
  );
};

export default QuestionCard;
