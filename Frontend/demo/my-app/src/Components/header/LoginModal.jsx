import React, { useState, useEffect } from 'react';
import createRequest from '../../api/request'; 
const modalStyles = {
  backdrop: {
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: 999,
  },
  modal: {
    backgroundColor: '#fff', color: '#000', padding: '24px',
    borderRadius: '12px', minWidth: '300px', maxWidth: '400px',
    animation: 'fadeIn 0.3s ease-in-out'
  },
  input: {
    display: 'block', width: '100%', marginBottom: '12px', padding: '8px',
    fontSize: '14px', borderRadius: '6px', border: '1px solid #ccc'
  },
  error: {
    color: 'red', fontSize: '12px', marginBottom: '8px'
  },
  button: {
    padding: '10px 16px', borderRadius: '6px', backgroundColor: '#4CAF50',
    color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold'
  },
};

const LoginModal = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authRequest = createRequest('http://localhost:8083');

      const res = await authRequest.post('/auth/login', { username : email, password: pwd });

      const token = res.data.token;
      localStorage.setItem('athledgerToken', token);
    
      // Set 1-hour expiration timeout
      setTimeout(() => {
        localStorage.removeItem('athledgerToken');
      }, 3600 * 1000);

      alert("Logged in!");
      onLogin && onLogin(email); // or .username based on your JWT
      onClose();
    } catch (err) {
      alert("Login failed: " + err.response?.data || err.message);
    }
  };


  return (
    <div style={modalStyles.backdrop}>
      <form style={modalStyles.modal} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          style={modalStyles.input}
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div style={{ position: 'relative' }}>
          <input
            style={modalStyles.input}
            type={showPwd ? 'text' : 'password'}
            placeholder="Password"
            required
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: 10, top: 10, fontSize: '12px' }}>
            {showPwd ? 'Hide' : 'Show'}
          </button>
        </div>
        <div style={{ fontSize: '12px', marginBottom: '12px' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); alert("Reset flow") }}>Forgot Password?</a>
        </div>
        <button type="submit" style={modalStyles.button}>Login</button>
        <button type="button" onClick={onClose} style={{ ...modalStyles.button, backgroundColor: '#888', marginLeft: '10px' }}>Close</button>
      </form>
    </div>
  );
};

  export default LoginModal;