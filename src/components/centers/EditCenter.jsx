import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import Input from '../common/Input';
import Button from '../common/Button';

const EditCenter = ({ center, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (center) {
      setFormData({
        name: center.name || ''
      });
    }
  }, [center]);

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
      await adminAPI.updateCenter(center.id, formData);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update center');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-error">{error}</div>}

      <Input
        label="Center Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter learning center name"
        required
      />

      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Updating...' : 'Update Center'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditCenter;