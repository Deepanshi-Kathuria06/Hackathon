import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Admin Dashboard Component
const AdminDashboard = () => {
  const [talents, setTalents] = useState([]);

  // Fetch talents on component mount
  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const response = await axios.get('http://your-api-url/talents'); // Replace with your backend API URL
        setTalents(response.data);
      } catch (error) {
        console.error('Error fetching talents:', error);
      }
    };

    fetchTalents();
  }, []);

  // Handle talent accept
  const handleAccept = async (talentId) => {
    try {
      const response = await axios.post('http://your-api-url/update-talent-status', {
        talentId,
        status: 'Accepted',
      });
      console.log('Talent accepted:', response.data);
      setTalents(talents.map((talent) => (talent._id === talentId ? response.data : talent)));
    } catch (error) {
      console.error('Error accepting talent:', error);
    }
  };

  // Handle talent reject
  const handleReject = async (talentId) => {
    try {
      const response = await axios.post('http://your-api-url/update-talent-status', {
        talentId,
        status: 'Rejected',
      });
      console.log('Talent rejected:', response.data);
      setTalents(talents.map((talent) => (talent._id === talentId ? response.data : talent)));
    } catch (error) {
      console.error('Error rejecting talent:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        {talents.map((talent) => (
          <div key={talent._id}>
            <p>Name: {talent.name}</p>
            <p>Email: {talent.email}</p>
            <p>Skill: {talent.skillName}</p>
            <p>Status: {talent.status}</p>
            <button onClick={() => handleAccept(talent._id)}>Accept</button>
            <button onClick={() => handleReject(talent._id)}>Reject</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
