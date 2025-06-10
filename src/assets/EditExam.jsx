import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/EditExam.css";

function EditExam() {
  const [exams, setExams] = useState([]);
  const [editingExamId, setEditingExamId] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "",durationInMinutes:"" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/exams");
      setExams(response.data);
    } catch (error) {
      setMessage("Failed to load exams.");
    }
  };

  const startEdit = (exam) => {
    setEditingExamId(exam.id);
    setFormData({ title: exam.title, description: exam.description ,durationInMinutes: exam.durationInMinutes || ""});
    setMessage("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8081/api/exams/update/${editingExamId}`,
        formData
      );
      setMessage("Exam updated successfully!");
      setEditingExamId(null);
      fetchExams();
    } catch (error) {
      setMessage("Failed to update exam.");
    }
  };

  return (
    <div className="container">
      <h2>Edit Exams</h2>
      {message && (
        <p className={`message ${message.includes("successfully") ? "success" : "error"}`}>
          {message}
        </p>
      )}

      {exams.length === 0 ? (
        <p>No exams found.</p>
      ) : (
        exams.map((exam) => (
          <div key={exam.id} className="exam-item">
            {editingExamId === exam.id ? (
              <form className="edit-form" onSubmit={handleUpdate}>
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                />
                <label>Duration (in minutes):</label>
                <input
                type="number"
                name="durationInMinutes"
                value={formData.durationInMinutes}
                onChange={handleChange}
                required
                min="1"
                />

                <div className="buttons">
                  <button type="submit" className="btn-save">Save</button>
                  <button
                    type="button"
                    onClick={() => setEditingExamId(null)}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <p><strong>Title:</strong> {exam.title}</p>
                <p><strong>Description:</strong> {exam.description}</p>
                <button className="btn-edit" onClick={() => startEdit(exam)}>Edit</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default EditExam;
