import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../api';

const AdminDashboard = () => {
  const [talents, setTalents] = useState([]);

  useEffect(() => {
    // Fetch talents from the backend
    const fetchTalents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/talent`);
        const data = await response.json();
        setTalents(data);
      } catch (error) {
        console.error('Error fetching talents:', error);
      }
    };

    fetchTalents();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/talent/approve/${id}`, { method: 'PUT' });
      if (response.ok) {
        alert('Talent approved successfully!');
        setTalents(talents.filter((talent) => talent._id !== id));
      }
    } catch (error) {
      console.error('Error approving talent:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/talent/reject/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Talent rejected successfully!');
        setTalents(talents.filter((talent) => talent._id !== id));
      }
    } catch (error) {
      console.error('Error rejecting talent:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {talents.map((talent) => (
          <li key={talent._id}>
            <img src={`http://localhost:5000/uploads/${talent.profilePhoto}`} alt={talent.name} width="100" />
            <p>Name: {talent.name}</p>
            <p>Email: {talent.email}</p>
            <p>Phone: {talent.phone}</p>
            <p>Skills: {talent.skills}</p>
            <p>Description: {talent.description}</p>
            <button onClick={() => handleApprove(talent._id)}>Approve</button>
            <button onClick={() => handleReject(talent._id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
