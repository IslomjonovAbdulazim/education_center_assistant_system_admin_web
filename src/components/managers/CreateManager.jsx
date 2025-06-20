import React, { useState } from 'react';
import { adminAPI } from '../../services/api';
import Input from '../common/Input';
import Button from '../common/Button';

const CreateManager = ({ centers, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    password: '',
    learning_center_id: '',
    subject_field: ''
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
      const submitData = {
        ...formData,
        learning_center_id: parseInt(formData.learning_center_id)
      };
      await adminAPI.createManager(submitData);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create manager');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-error">{error}</div>}

      <Input
        label="Full Name"
        name="fullname"
        value={formData.fullname}
        onChange={handleChange}
        placeholder="Enter manager's full name"
        required
      />

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
        placeholder="Enter password"
        required
      />

      <div className="form-group">
        <label className="form-label">Learning Center *</label>
        <select
          name="learning_center_id"
          value={formData.learning_center_id}
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="">Select a learning center</option>
          {centers.map(center => (
            <option key={center.id} value={center.id}>
              {center.name}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Subject Field"
        name="subject_field"
        value={formData.subject_field}
        onChange={handleChange}
        placeholder="e.g., Mathematics, English, Programming"
      />

      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Manager'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CreateManager;