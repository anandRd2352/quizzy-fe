import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminPanel from './AdminPanel';
import "../css/AdminDashboard.css";

function DashBoard() {
  const navigate = useNavigate();

  const handleCreateExam = () => {
    navigate('/admin/create-exam');
  };



  const handleViewReport = () => {
    alert("Reports functionality coming soon!");
  };

  return (
    <div className="admin-layout" style={{ display: 'flex' }}>
      <AdminPanel />
      <div className="admin-content" style={{ padding: '20px', width: '100%' }}>
        <h2 className='mb-1'>Dashboard</h2>
        <div className="mb-4">
          <Button className="me-2" onClick={handleCreateExam}>Create Exam</Button>
          <Button className="me-2" onClick={handleViewReport}>View Report</Button>
        </div>
        <p>Welcome to the Admin Dashboard panel. Use the sidebar to navigate between features.</p>
      </div>
    </div>
  );
}

export default DashBoard;
