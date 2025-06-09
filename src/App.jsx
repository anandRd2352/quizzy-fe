import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./assets/Register";
import Login from "./assets/Login";
import AdminDashboard from "./assets/AdminDashboard";
import StudentDashboard from "./assets/StudentDashboard";
import AddExam from "./assets/AddExam";
import EditExam from "./assets/EditExam";
import ViewExam from "./assets/ViewExam";
import DeleteExam from "./assets/DeleteExam";
import AddQuestion from "./assets/AddQuestion";
import QuestionList from "./assets/QuestionList";
import EditQuestion from "./assets/EditQuestion";
import ViewQuestion from "./assets/ViewQuestion";
import DeleteQuestion from "./assets/DeleteQuestion";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-dashboard/add" element={<AddExam />} />
          <Route path="/admin-dashboard/edit" element={<EditExam/>}/>
           <Route path="/admin-dashboard/view" element={<ViewExam/>}/>
           <Route path="/admin-dashboard/delete" element={<DeleteExam/>}/>
           <Route path="/admin-dashboard/add-question" element={<AddQuestion />} />
           <Route path="/admin-dashboard/questions" element={<QuestionList />} />
           <Route path="/admin-dashboard/questions/edit" element={<EditQuestion />} />
            <Route path="/admin-dashboard/questions/view" element={<ViewQuestion />} />
            <Route path="/admin-dashboard/questions/delete" element={<DeleteQuestion />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
