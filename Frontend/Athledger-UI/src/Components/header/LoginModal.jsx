import React, { useState } from 'react';
import { Modal, Form, Button, Message } from 'semantic-ui-react';
import createRequest from '../../api/request';

const LoginModal = ({ onClose, onLogin, setIsLoggedIn, setRole }) => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      const authRequest = createRequest('http://localhost:8083');
      const res = await authRequest.post('/auth/login', { username: email, password: pwd });

      const token = res.data.token;
      localStorage.setItem('athledgerToken', token);
      const role = res.data.role;
      localStorage.setItem('role', role);

      setTimeout(() => {
        localStorage.removeItem('athledgerToken');
        localStorage.removeItem('role');
      }, 3600 * 1000);

      alert("Logged in!");
      onLogin && onLogin(email);
      setIsLoggedIn(true);
      setRole(role);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open onClose={onClose} size='tiny'>
      <Modal.Header>Login</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit} loading={loading} error={!!error}>
          <Form.Input
            label='Email'
            type='text'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
          />

          <Form.Input
            label='Password'
            type={showPwd ? 'text' : 'password'}
            required
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder='Enter your password'
            icon={{ name: showPwd ? 'eye slash' : 'eye', link: true, onClick: () => setShowPwd(!showPwd) }}
          />

          {error && <Message error header='Login Failed' content={error} />}

          <div style={{ fontSize: '12px', marginBottom: '12px' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Reset flow") }}>Forgot Password?</a>
          </div>

          <Button type='submit' primary>Login</Button>
          <Button type='button' onClick={onClose} secondary style={{ marginLeft: '10px' }}>Close</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default LoginModal;
