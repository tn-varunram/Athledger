// src/pages/Dashboard.jsx
<img
  src="https://cdn-icons-png.flaticon.com/512/861/861512.png"
  alt="Athledger Logo"
  style={{ width: '100px', marginBottom: '1rem' }}
/>
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    
    <div>
      <h2>Welcome to Athledger</h2>
      <p>Book your sports facilities in real-time with zero hassle.</p>
      {user ? (
        <p>You are logged in as <b>{user.username}</b> (Role: {user.role}).</p>
      ) : (
        <p>Please login or register to book facilities.</p>
      )}
    </div>
  );
};

export default Dashboard;
