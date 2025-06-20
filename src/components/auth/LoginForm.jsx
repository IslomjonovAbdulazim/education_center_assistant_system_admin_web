import React, { useState } from 'react';
import { authAPI } from '../../services/api';
import Input from '../common/Input';
import Button from '../common/Button';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    phone: '+998990330919',
    password: 'aisha'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      
      if (response.data.user_info.role !== 'admin') {
        setError('Access denied. Admin access required.');
        return;
      }
      
      onLogin(response.data.token);
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Admin Login</h1>
      
      {error && <div className="alert alert-error">{error}</div>}

      <Input
        label="Phone Number"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+998901234567"
        required
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
        required
      />

      <Button
        type="submit"
        variant="primary"
        disabled={loading}
        style={{ width: '100%', marginTop: '20px' }}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};

export default LoginForm;