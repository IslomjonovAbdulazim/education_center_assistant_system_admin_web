import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ManagersList from '../components/managers/ManagersList';
import CreateManager from '../components/managers/CreateManager';
import EditManager from '../components/managers/EditManager';

const Managers = () => {
  const [managers, setManagers] = useState([]);
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [managersRes, centersRes] = await Promise.all([
        adminAPI.getManagers(),
        adminAPI.getCenters()
      ]);
      setManagers(managersRes.data);
      setCenters(centersRes.data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = () => {
    setShowCreateModal(true);
  };

  const handleEdit = (manager) => {
    setSelectedManager(manager);
    setShowEditModal(true);
  };

  const handleDelete = async (managerId) => {
    if (!window.confirm('Are you sure you want to delete this manager?')) {
      return;
    }

    try {
      await adminAPI.deleteManager(managerId);
      fetchData(); // Refresh list
    } catch (err) {
      setError('Failed to delete manager');
    }
  };

  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    fetchData(); // Refresh list
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    setSelectedManager(null);
    fetchData(); // Refresh list
  };

  if (loading) return <div className="loading">Loading managers...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#333' }}>Managers</h1>
        <Button variant="primary" onClick={handleCreate}>
          Add New Manager
        </Button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <Card>
        <ManagersList 
          managers={managers}
          centers={centers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Manager"
      >
        <CreateManager
          centers={centers}
          onSuccess={handleCreateSuccess}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Manager"
      >
        <EditManager
          manager={selectedManager}
          centers={centers}
          onSuccess={handleEditSuccess}
          onCancel={() => setShowEditModal(false)}
        />
      </Modal>
    </div>
  );
};

export default Managers;