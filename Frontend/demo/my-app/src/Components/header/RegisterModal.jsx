import React, { useState } from 'react';

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

const RegisterModal = ({ onClose }) => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '', dob: '' });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = () => {
    let temp = {};
    if (!/\S+@\S+\.\S+/.test(form.email)) temp.email = 'Invalid email';
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}/.test(form.password))
      temp.password = 'Weak password (8+ chars, UPPER/lower/symbol/number)';
    if (form.password !== form.confirmPassword) temp.confirmPassword = 'Passwords do not match';
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    localStorage.setItem('athledgerUser', JSON.stringify(form));
    alert(`Registered ${form.username}`);
    onClose();
  };

  return (
    <div style={modalStyles.backdrop}>
      <form style={modalStyles.modal} onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input style={modalStyles.input} name="username" placeholder="Username" required value={form.username} onChange={handleChange} />
        <input style={modalStyles.input} name="email" type="email" placeholder="Email" required value={form.email} onChange={handleChange} />
        {errors.email && <div style={modalStyles.error}>{errors.email}</div>}

        <div style={{ position: 'relative' }}>
          <input
            style={modalStyles.input}
            name="password"
            type={showPwd ? 'text' : 'password'}
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
          />
          <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: 10, top: 10, fontSize: '12px' }}>
            {showPwd ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.password && <div style={modalStyles.error}>{errors.password}</div>}

        <div style={{ position: 'relative' }}>
          <input
            style={modalStyles.input}
            name="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            placeholder="Retype Password"
            required
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: 10, top: 10, fontSize: '12px' }}>
            {showConfirm ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.confirmPassword && <div style={modalStyles.error}>{errors.confirmPassword}</div>}

        <input style={modalStyles.input} name="dob" type="date" required value={form.dob} onChange={handleChange} />

        <button type="submit" style={modalStyles.button}>Register</button>
        <button type="button" onClick={onClose} style={{ ...modalStyles.button, backgroundColor: '#888', marginLeft: '10px' }}>Close</button>
      </form>
    </div>
  );
};

  export default RegisterModal;