import React from 'react';

const Table = ({ columns, data, onEdit, onDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.title}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={column.key}>
                {column.render ? column.render(item[column.key], item) : item[column.key]}
              </td>
            ))}
            <td>
              <button 
                className="btn btn-secondary btn-small" 
                onClick={() => onEdit(item)}
                style={{ marginRight: '8px' }}
              >
                Edit
              </button>
              <button 
                className="btn btn-danger btn-small" 
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;