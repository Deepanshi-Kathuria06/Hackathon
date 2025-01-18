import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboardPage = () => {
  const [talents, setTalents] = useState([]);

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/talent/pending');
        setTalents(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTalents();
  }, []);

  const handleApprove = async (talentId) => {
    try {
      await axios.post('http://localhost:5000/api/admin/approve', { talentId });
      alert('Talent approved');
      setTalents(talents.filter(talent => talent._id !== talentId));
    } catch (error) {
      console.error(error);
      alert('Failed to approve talent');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-semibold mb-6">Admin Dashboard</h2>
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
            <div className="flex justify-between">
              <button
                onClick={() => handleApprove(talent._id)}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Approve
              </button>
              <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
