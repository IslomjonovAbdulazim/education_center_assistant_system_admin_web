import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import CentersList from '../components/centers/CentersList';
import CreateCenter from '../components/centers/CreateCenter';
import EditCenter from '../components/centers/EditCenter';

const Centers = () => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);

  const fetchCenters = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getCenters();
      setCenters(response.data);
    } catch (err) {
      setError('Failed to fetch learning centers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, []);

  const handleCreate = () => {
    setShowCreateModal(true);
  };

  const handleEdit = (center) => {
    setSelectedCenter(center);
    setShowEditModal(true);
  };

  const handleDelete = async (centerId) => {
    if (!window.confirm('Are you sure you want to delete this learning center?')) {
      return;
    }

    try {
      await adminAPI.deleteCenter(centerId);
      fetchCenters(); // Refresh list
    } catch (err) {
      setError('Failed to delete center');
    }
  };

  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    fetchCenters(); // Refresh list
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    setSelectedCenter(null);
    fetchCenters(); // Refresh list
  };

  if (loading) return <div className="loading">Loading centers...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#333' }}>Learning Centers</h1>
        <Button variant="primary" onClick={handleCreate}>
          Add New Center
        </Button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <Card>
        <CentersList 
          centers={centers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Learning Center"
      >
        <CreateCenter
          onSuccess={handleCreateSuccess}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Learning Center"
      >
        <EditCenter
          center={selectedCenter}
          onSuccess={handleEditSuccess}
          onCancel={() => setShowEditModal(false)}
        />
      </Modal>
    </div>
  );
};

export default Centers;