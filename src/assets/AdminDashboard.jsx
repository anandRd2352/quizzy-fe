import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="outer-admin-container">
      <div className="admin-container">
        <h2>Admin Dashboard</h2>

        {/* Exams Section */}
        <div className="admin-section">
          <h3>📝 Exam Management</h3>
          <ul className="admin-menu">
            <li><button onClick={() => navigate("/admin-dashboard/add")}>➕ Add Exam</button></li>
            <li><button onClick={() => navigate("/admin-dashboard/view")}>📋 View Exams</button></li>
            <li><button onClick={() => navigate("/admin-dashboard/edit")}>✏️ Edit Exam</button></li>
            <li><button onClick={() => navigate("/admin-dashboard/delete")}>🗑️ Delete Exam</button></li>
          </ul>
        </div>

        {/* Questions Section */}
        <div className="admin-section">
          <h3>❓ Question Management</h3>
          <ul className="admin-menu">
            <li><button onClick={() => navigate("/admin-dashboard/add-question")}>➕ Add Question</button></li>
            <li><button onClick={() => navigate("/admin-dashboard/questions/view")}>📋 View Questions</button></li>
            <li><button onClick={() => navigate("/admin-dashboard/questions/edit")}>✏️ Edit Question</button></li>
            <li><button onClick={() => navigate("/admin-dashboard/questions/delete")}>🗑️ Delete Question</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
