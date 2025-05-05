import React from 'react';
import './css/3.1.1.css'; // Make sure this path is correct

const exams = [
  {
    title: 'Data Structures & Algorithms',
    time: '60 minutes',
    instructions: 'Answer MCQ Questions. 4 marks for each qeustion. 1 negative mark for each wrong questions',
  },
  {
    title: 'Java Programming',
    time: '90 minutes',
    instructions: 'Answer MCQ Questions. 4 marks for each qeustion. 1 negative mark for each wrong questions.',
  },
 
  {
    title:"Python Programming",
    time:"90 minutes",
    instructions: 'Answer MCQ Questions. 4 marks for each qeustion. 1 negative mark for each wrong questions',
  },

  {
    title: 'C++ Programming',
    time: '90 minutes',
    instructions: 'Answer MCQ Questions. 4 marks for each qeustion. 1 negative mark for each wrong questions',
  },

  {
    title: 'General Aptitude',
    time: '30 minutes',
    instructions: 'Answer MCQ Questions. 4 marks for each qeustion. 1 negative mark for each wrong questions',
  },

  {
    title: 'Database Management',
    time: '45 minutes',
    instructions: 'Answer all MCQs. 1 mark per question.',
  },

  
];

const AvailableExams = () => {
  return (
    <div className="exam-container">
      <h2 className="exam-title">Available Exams</h2>
      <div className="exam-list">
        {exams.map((exam, index) => (
          <div className="exam-card" key={index}>
            <h3>{exam.title}</h3>
            <p><strong>Duration:</strong> {exam.time}</p>
            <p><strong>Instructions:</strong> {exam.instructions}</p>
            <button className="start-btn">Start Exam</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableExams;
