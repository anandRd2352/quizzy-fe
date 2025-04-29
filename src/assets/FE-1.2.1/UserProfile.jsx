import React, { useState } from "react";
import "../css/UserProfile.css";

function UserProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    status: false,
    profilePicture: "",
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setUser((prev) => ({ ...prev, profilePicture: imageUrl }));
    }
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);
  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile saved!");
    setEditMode(false);
  };

  return (
    <div className="profile-container">
      <form className="profile-card" onSubmit={handleSave}>
        <h2>User Profile</h2>

        <div className="profile-image">
          <img
            src={user.profilePicture || "https://via.placeholder.com/80"}
            alt="Profile"
          />
        </div>

        {editMode && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="upload-input"
          />
        )}

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Enter your name"
          disabled={!editMode}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Enter your email"
          disabled={!editMode}
        />

        <label>Status:</label>
        <label className="toggle-switch">
          <input
            type="checkbox"
            name="status"
            checked={user.status}
            onChange={handleChange}
            disabled={!editMode}
          />
          <span className="slider"></span>
        </label>

        {!editMode ? (
          <button
            type="button"
            className="edit-btn"
            onClick={handleEdit}
          >
            Edit Profile
          </button>
        ) : (
          <div className="action-buttons">
            <button type="submit" className="save-btn">Save</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default UserProfile;
