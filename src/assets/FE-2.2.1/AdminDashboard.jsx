import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminPanel from './AdminPanel';
import "../css/AdminDashboard.css";
function DashBoard(){
    const navigate= useNavigate();

    const handleCreateExam =() =>{
        console.log("create exam clicked")
        navigate('/exams');
    };
    const handleAddQuestion = () => {
        console.log("Add Question clicked");
        navigate('/questions');
      };
      const handleViewReport = () => {
        console.log("View Report clicked");
        alert("Reports functionality coming soon!");
      };
    return(
        <div className="admin-layout">
             
             <div className="admin-content">
            <h2 className='mb-1'> DashBoard</h2>
            <div className="mb-4">
                <Button  className="me-2" onClick={handleCreateExam}>Create Exam</Button>
                <Button  className="me-2" onClick={handleAddQuestion}>Add Question</Button>
                <Button className="me-2" onClick={handleViewReport}>View Report</Button>
            </div>
            <div>
                <p>Welcome to the Admin Dashboard pannel.Use the sidebar to navigate between features</p>
            </div>
            </div>
        </div>
    );
}
export default DashBoard;