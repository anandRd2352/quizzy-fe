import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentDashboard() {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null); // Timer state

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/exams")
      .then((res) => setExams(res.data))
      .catch(() => alert("Failed to load exams"));
  }, []);

  const startExam = (exam) => {
    setSelectedExam(exam);
    setTimeLeft(exam.durationInMinutes * 60); // start timer

    axios
      .get(`http://localhost:8081/api/questions/exam/${exam.id}`)
      .then((res) => {
        setQuestions(res.data);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setShowScore(false);
        setScore(null);
      })
      .catch(() => alert("Failed to load questions"));
  };

  // Auto-submit when time runs out
  useEffect(() => {
    if (!timeLeft || showScore) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          calculateScore(); // auto submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showScore]);

  const handleOptionSelect = (questionId, selectedValue) => {
    setAnswers({ ...answers, [questionId]: selectedValue });
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let count = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        count++;
      }
    });

    setScore(count);
    setShowScore(true);

    const userEmail = localStorage.getItem("userEmail");

    if (userEmail && selectedExam) {
      axios
        .post("http://localhost:8081/api/results", {
          email: userEmail,
          examId: selectedExam.id,
          examTitle: selectedExam.title,
          score: count,
        })
        .then(() => {
          console.log("✅ Result saved & email sent");
        })
        .catch((err) => {
          console.error("❌ Failed to save result", err);
          alert("Failed to save result");
        });
    } else {
      alert("User not logged in or exam not selected.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Student Dashboard</h2>

      {!selectedExam && (
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
                  onClick={() => startExam(exam)}
                >
                  Attend Exam
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedExam && questions.length > 0 && !showScore && (
        <div className="mt-4">
          <div className="alert alert-warning">
            ⏱️ Time Left: {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </div>

            {/* ⚠️ Less than 1 minute warning */}
            
             {timeLeft <= 60 && (
             <div className="alert alert-danger mt-2">
               ⚠️ Less than 1 minute remaining. Hurry up!
                    </div>
             )}

          <h4>
            Question {currentQuestionIndex + 1} of {questions.length}
          </h4>
          <p>{questions[currentQuestionIndex].questionText}</p>
          {["A", "B", "C", "D"].map((key) => {
            const value =
              questions[currentQuestionIndex][`option${key}`];
            return (
              <div key={key} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={value}
                  checked={
                    answers[questions[currentQuestionIndex].id] === value
                  }
                  onChange={() =>
                    handleOptionSelect(questions[currentQuestionIndex].id, value)
                  }
                />
                <label className="form-check-label">{value}</label>
              </div>
            );
          })}
          <div className="mt-3 d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button className="btn btn-success" onClick={handleNext}>
              {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      )}

      {showScore && (
        <div className="mt-4">
          <h4>Exam Completed!</h4>
          <p>
            Your score: {score} / {questions.length}
          </p>
          <button className="btn btn-secondary" onClick={() => setSelectedExam(null)}>
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
