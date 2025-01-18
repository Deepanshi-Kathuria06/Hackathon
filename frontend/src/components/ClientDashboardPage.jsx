import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientDashboardPage = () => {
  const [talents, setTalents] = useState([]);
  const [selectedTalent, setSelectedTalent] = useState('');

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/talent/approved');
        setTalents(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTalents();
  }, []);

  const handleHire = async () => {
    try {
      await axios.post('http://localhost:5000/api/client/hire', { talentId: selectedTalent });
      alert('Hire request sent');
    } catch (error) {
      console.error(error);
      alert('Failed to send hire request');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-semibold mb-6">Client Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {talents.map((talent) => (
          <div key={talent._id} className="bg-white p-6 rounded-lg shadow-md">
            <img
              src={talent.profilePhoto}
              alt="Profile"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{talent.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{talent.skills}</p>
            <button
              onClick={() => setSelectedTalent(talent._id)}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Hire
            </button>
          </div>
        ))}
      </div>
      {selectedTalent && (
        <div className="mt-6 text-center">
          <button
            onClick={handleHire}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Send Hire Request
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientDashboardPage;
