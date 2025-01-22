import React from 'react';
import './clients.css';  // Importing the CSS file

const Clients = () => {
  const talentProfiles = [
    { id: 1, name: "Ravi Kumar", skills: "Full Stack Developer", experience: "5 years" },
    { id: 2, name: "Priya Sharma", skills: "UI/UX Designer", experience: "4 years" },
    { id: 3, name: "Amit Patel", skills: "Data Scientist", experience: "3 years" },
    { id: 4, name: "Ananya Singh", skills: "Mobile App Developer", experience: "6 years" },
    { id: 5, name: "Vikram Reddy", skills: "Graphic Designer", experience: "7 years" },
    { id: 6, name: "Neha Gupta", skills: "SEO Expert", experience: "5 years" },
    { id: 7, name: "Arjun Verma", skills: "Backend Developer", experience: "6 years" },
    { id: 8, name: "Maya Rao", skills: "Digital Marketing Specialist", experience: "4 years" },
    { id: 9, name: "Karan Mehta", skills: "Content Writer", experience: "3 years" },
    { id: 10, name: "Swati Deshmukh", skills: "Product Manager", experience: "5 years" }
  ];

  return (
    <div className="client-page">
      <h2>Browse Talents</h2>
      <div className="talent-list">
        {talentProfiles.map(talent => (
          <div className="talent-profile" key={talent.id}>
            <h3>{talent.name}</h3>
            <p><strong>Skills:</strong> {talent.skills}</p>
            <p><strong>Experience:</strong> {talent.experience}</p>
            <button className="hire-button">Hire</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Clients;
