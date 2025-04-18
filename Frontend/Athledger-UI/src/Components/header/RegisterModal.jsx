import React, { useState } from 'react';
import { Modal, Form, Button, Message } from 'semantic-ui-react';
import createRequest from '../../api/request';

const RegisterModal = ({ onClose }) => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '', dob: '' });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let temp = {};
    if (!/\S+@\S+\.\S+/.test(form.email)) temp.email = 'Invalid email';
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}/.test(form.password))
      temp.password = 'Weak password (8+ chars, UPPER/lower/symbol/number)';
    if (form.password !== form.confirmPassword) temp.confirmPassword = 'Passwords do not match';
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const authRequest = createRequest('http://localhost:8083');
      await authRequest.post('/auth/register', {
        username: form.username,
        email: form.email,
        password: form.password,
        dob: form.dob,
        role: 'USER'
      });
      setLoading(false);
      alert("Registered successfully!");
      onClose();
    } catch (err) {
      setLoading(false);
      alert("Registration failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <Modal open onClose={onClose} size='tiny'>
      <Modal.Header>Register</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit} loading={loading} error={Object.keys(errors).length > 0}>
          <Form.Input label='Username' name='username' required value={form.username} onChange={handleChange} />
          <Form.Input label='Email' name='email' type='email' required value={form.email} onChange={handleChange} error={!!errors.email} />
          {errors.email && <Message error content={errors.email} />}

          <Form.Input
            label='Password'
            name='password'
            type={showPwd ? 'text' : 'password'}
            required
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            icon={{ name: showPwd ? 'eye slash' : 'eye', link: true, onClick: () => setShowPwd(!showPwd) }}
          />
          {errors.password && <Message error content={errors.password} />}

          <Form.Input
            label='Confirm Password'
            name='confirmPassword'
            type={showConfirm ? 'text' : 'password'}
            required
            value={form.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            icon={{ name: showConfirm ? 'eye slash' : 'eye', link: true, onClick: () => setShowConfirm(!showConfirm) }}
          />
          {errors.confirmPassword && <Message error content={errors.confirmPassword} />}

          <Form.Input label='Date of Birth' name='dob' type='date' required value={form.dob} onChange={handleChange} />

          <Button type='submit' primary content='Register' />
          <Button type='button' onClick={onClose} secondary content='Close' />
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default RegisterModal;