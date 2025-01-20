import React, { useState } from "react";
import "./TalentRegistrationForm.css"; // Keep your existing styles

const TalentRegistrationForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    skillName: "",
    description: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataWithFile = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataWithFile.append(key, formData[key]);
    });
    formDataWithFile.append("profilePhoto", profilePhoto);

    try {
      const response = await fetch("http://localhost:5000/api/talent/register", {
        method: "POST",
        body: formDataWithFile,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Submission failed!");
      } else {
        const result = await response.json();
        alert(result.message || "Talent registered successfully!");
        closeModal && closeModal(); // Close modal if provided
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Talent Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="skillName">Skill & Expertise</label>
          <input
            type="text"
            id="skillName"
            name="skillName"
            placeholder="e.g., HTML, CSS, JavaScript"
            value={formData.skillName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Personal Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Tell us about yourself and your experience"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="profilePhoto">Upload Profile Photo</label>
          <input
            type="file"
            id="profilePhoto"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        {loading ? (
          <button className="submit-button" disabled>
            Submitting...
          </button>
        ) : (
          <button type="submit" className="submit-button">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default TalentRegistrationForm;
  
