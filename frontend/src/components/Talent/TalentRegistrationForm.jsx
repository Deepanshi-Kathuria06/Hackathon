import React, { useState } from "react";
import "./TalentRegistrationForm.css"; // Keep your existing styles

const TalentRegistrationForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
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
    formDataWithFile.append("name", formData.name);
    formDataWithFile.append("email", formData.email);
    formDataWithFile.append("contactNumber", formData.contactNumber);
    formDataWithFile.append("skillName", formData.skillName);
    formDataWithFile.append("description", formData.description);
    if (profilePhoto) {
      formDataWithFile.append("profilePhoto", profilePhoto);
    }
  
    try {
      const response = await fetch("http://localhost:5002/api/talent/register", {
        method: "POST",
        body: formDataWithFile,
      });
  
      // Check if the response is okay and has valid JSON
      if (response.ok) {
        const result = await response.json();
        alert(result.message || "Talent registered successfully!");
        closeModal && closeModal(); // Close modal if provided
      } else {
        const errorData = await response.text(); // Fetch error data as text
        alert(`Error: ${errorData || "Submission failed!"}`);
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
      <form onSubmit={handleSubmit} encType="multipart/form-data"> 
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
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
            onChange={handleFileChange} // Ensure to handle file change
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