import React from 'react';
import Table from '../common/Table';

const ManagersList = ({ managers, centers, onEdit, onDelete }) => {
  const getCenterName = (centerId) => {
    const center = centers.find(c => c.id === centerId);
    return center ? center.name : 'N/A';
  };

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'fullname', title: 'Full Name' },
    { key: 'phone', title: 'Phone' },
    { 
      key: 'learning_center_id', 
      title: 'Learning Center',
      render: (value) => getCenterName(value)
    },
    { 
      key: 'subject_field', 
      title: 'Subject Field',
      render: (value) => value || 'N/A'
    }
  ];

  if (managers.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
        <p>No managers found.</p>
        <p>Click "Add New Manager" to create your first manager.</p>
      </div>
    );
  }

  return (
    <Table 
      columns={columns}
      data={managers}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default ManagersList;