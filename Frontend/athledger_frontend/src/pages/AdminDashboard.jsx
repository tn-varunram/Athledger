// src/pages/AdminDashboard.jsx
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
// import relevant API calls, e.g. addFacility, updateFacility, deleteFacility from SMS

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [newSport, setNewSport] = useState('');
  const [courtName, setCourtName] = useState('');

  const handleAddFacility = async () => {
    // call addFacility with newSport, courtName
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome, {user?.username} (Role: {user?.role})</p>

      <h3>Add New Facility</h3>
      <label>Sport:</label>
      <input
        value={newSport}
        onChange={(e) => setNewSport(e.target.value)}
        placeholder="e.g., Badminton"
      />
      <label>Court Name:</label>
      <input
        value={courtName}
        onChange={(e) => setCourtName(e.target.value)}
        placeholder="e.g., Court #2"
      />
      <button onClick={handleAddFacility}>Add Facility</button>

      {/* Similar UI sections for updating or removing facilities */}
    </div>
  );
};

export default AdminDashboard;
