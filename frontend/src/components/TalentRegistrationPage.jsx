import React, { useState } from 'react';
import axios from 'axios';

const TalentRegistrationPage = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [skills, setSkills] = useState('');
  const [photo, setPhoto] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/talents', {
        name,
        contact,
        skills: skills.split(','),
        photo,
      });
      console.log('Talent Registered:', response.data);
    } catch (error) {
      console.error('Error registering talent:', error);
    }
  };

  return (
    <div>
      <h2>Register as a Talent</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default TalentRegistrationPage;
