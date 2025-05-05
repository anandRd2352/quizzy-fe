import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import "../css/AdminLayout.css";



function AdminPanel(){
    const location = useLocation();
    const [active, setActive] =useState(location.pathname);

    const handleSelect = (path) => {
        setActive(path);
      };
    
    return(
        <div className='container-main'>
            <h2>ADMIN</h2>
            <div className='dashboard-main'>
            <Nav>
                <Link to="/" 
                  className={`nav-link ${active === '/' ? 'active-link' : ''}`}
                  onClick={() => handleSelect('/')}
                >DashBoard</Link>
                <Link to="exams"
                 className={`nav-link ${active === '/exams' ? 'active-link' : ''}`}
                 onClick={() => handleSelect('/exams')}
                >Manage Exams</Link>
                <Link to="/questions"
                 className={`nav-link ${active === '/questions' ? 'active-link' : ''}`}
                 onClick={() => handleSelect('/questions')}
                >Manage Questions</Link>
            </Nav>
            </div>
        </div>
    );
}
export default AdminPanel