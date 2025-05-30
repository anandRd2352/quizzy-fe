import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import "../css/AdminLayout.css";

function AdminPanel() {
  const location = useLocation();

  return (
    <div className='container-main'>
      <h2>ADMIN</h2>
      <div className='dashboard-main'>
        <Nav>
          <Link
            to="/admin"
            className={`nav-link ${location.pathname === '/admin' ? 'active-link' : ''}`}
          >
            DashBoard
          </Link>
          <Link
            to="/admin/exam-table"
            className={`nav-link ${location.pathname === '/admin/exam-table' ? 'active-link' : ''}`}
          >
            Manage Exams
          </Link>
          <Link
            to="/admin/questions"
            className={`nav-link ${location.pathname === '/admin/questions' ? 'active-link' : ''}`}
          >
            Manage Questions
          </Link>
        </Nav>
      </div>
    </div>
  );
}

export default AdminPanel;
