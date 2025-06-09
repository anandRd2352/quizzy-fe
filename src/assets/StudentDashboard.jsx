import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentDashboard() {
  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/exams")
      .then((res) => setExams(res.data))
      .catch(() => alert("Failed to load exams"));
  }, []);

  const startExam = (examId) => {
    setSelectedExamId(examId);
    axios
      .get(`http://localhost:8081/api/questions/exam/${examId}`)
      .then((res) => {
        setQuestions(res.data);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setShowScore(false);
        setScore(null);
      })
      .catch(() => alert("Failed to load questions"));
  };

  const handleOptionSelect = (optionKey) => {
    setAnswers({ ...answers, [currentQuestionIndex]: optionKey });
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
  let count = 0;
  questions.forEach((q, idx) => {
    if (answers[idx] && answers[idx] === q.correctAnswer) {
      count++;
    }
  });

  setScore(count);
  setShowScore(true);

  const userEmail = localStorage.getItem("userEmail");
  console.log("User Email from localStorage:", userEmail);

  const selectedExam = exams.find((exam) => exam.id === selectedExamId);
  console.log("Selected Exam:", selectedExam);

  if (userEmail && selectedExam) {
    axios
      .post("http://localhost:8081/api/results", {
        email: userEmail,
        examId: selectedExamId,
        examTitle: selectedExam.title,
        score: count,
      })
      .then(() => {
        console.log("Result saved successfully");
      })
      .catch((err) => {
        console.error("Failed to save result", err);
        alert("Failed to save result");
      });
  } else {
    alert("User not logged in or exam not selected.");
  }
};

  return (
    <div className="container mt-4">
      <h2>Student Dashboard</h2>

      {!selectedExamId && (
        <div>
          <h4>Select an Exam to Start</h4>
          <ul className="list-group">
            {exams.map((exam) => (
              <li
                key={exam.id}
                className="list-group-item d-flex justify-content-between"
              >
                <div>
                  <strong>{exam.title}</strong>
                  <br />
                  <small>{exam.description}</small>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => startExam(exam.id)}
                >
                  Attend Exam
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedExamId && questions.length > 0 && !showScore && (
        <div className="mt-4">
          <h4>
            Question {currentQuestionIndex + 1} of {questions.length}
          </h4>
          <p>{questions[currentQuestionIndex].questionText}</p>
          {["a", "b", "c", "d"].map((optionKey) => {
            const label =
              questions[currentQuestionIndex][`option${optionKey.toUpperCase()}`];
            return (
              <div key={optionKey} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={optionKey}
                  checked={answers[currentQuestionIndex] === optionKey}
                  onChange={() => handleOptionSelect(optionKey)}
                />
                <label className="form-check-label">{label}</label>
              </div>
            );
          })}
          <button className="btn btn-success mt-3" onClick={handleNext}>
            {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      )}

      {showScore && (
        <div className="mt-4">
          <h4>Exam Completed!</h4>
          <p>
            Your score: {score} / {questions.length}
          </p>
          <button className="btn btn-secondary" onClick={() => setSelectedExamId(null)}>
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
