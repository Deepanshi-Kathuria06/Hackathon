import React, { useState } from 'react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]); // Fetch users from the backend

  const handleApproval = async (userId, action) => {
    try {
      const response = await fetch('/approveReject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action })
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert('Error handling approval');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {/* Render user list with approve/reject buttons */}
    </div>
  );
};

export default AdminDashboard;
