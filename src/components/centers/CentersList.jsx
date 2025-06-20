import React from 'react';
import Table from '../common/Table';

const CentersList = ({ centers, onEdit, onDelete }) => {
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Center Name' },
    { 
      key: 'total_users', 
      title: 'Total Users',
      render: (value) => value || 0
    },
    { 
      key: 'created_date', 
      title: 'Created Date',
      render: (value) => value || 'N/A'
    }
  ];

  if (centers.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
        <p>No learning centers found.</p>
        <p>Click "Add New Center" to create your first center.</p>
      </div>
    );
  }

  return (
    <Table 
      columns={columns}
      data={centers}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default CentersList;