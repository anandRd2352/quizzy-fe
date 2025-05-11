
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistraionForm from "./assets/FE-1.1.2/Registration"
import React  from 'react';
import AdminPanel from './assets/FE-2.2.1/AdminPanel';
import DashBoard from './assets/FE-2.2.1/AdminDashboard';
import Exams from './assets/FE-2.2.1/Exams'; 
import Questions from './assets/FE-2.2.1/Question';
import ExamInterface from './assets/FE-3.1.2/ExamInterface';

function App() {
  

return (
  <div className="App">
      <h1>React MCQ Exam</h1>
      <ExamInterface />
    </div>
    
    //<div>
     // <BrowserRouter>
     // <div className="d-flex"><AdminPanel/>
    //  <div className="p-4 w-100 main-content ">
     //   <Routes>
     //     <Route path="/" element={<DashBoard />} />
     //     <Route path="/exams" element={<Exams />} />
     //     <Route path="/questions" element={<Questions />} />
     //   </Routes>
     //   </div>
     //   </div>
     // </BrowserRouter>
  //  </div>
    
  );
}//<Route path="/" element={<RegistraionForm/>}/>

export default App
