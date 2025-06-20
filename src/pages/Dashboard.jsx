import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import Card from '../components/common/Card';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCenters: 0,
    totalManagers: 0,
    totalUsers: 0,
    recentActivities: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [centersRes, managersRes] = await Promise.all([
        adminAPI.getCenters(),
        adminAPI.getManagers()
      ]);
      
      setStats({
        totalCenters: centersRes.data.length,
        totalManagers: managersRes.data.length,
        totalUsers: centersRes.data.reduce((sum, center) => sum + (center.total_users || 0), 0),
        recentActivities: [
          'New learning center created',
          'Manager assigned to center',
          'System backup completed'
        ]
      });
    } catch (err) {
      setError('Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div>
      <h1 style={{ marginBottom: '30px', color: '#333' }}>Admin Dashboard</h1>
      
      {error && <div className="alert alert-error">{error}</div>}
      
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{stats.totalCenters}</span>
          <span className="stat-label">Learning Centers</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.totalManagers}</span>
          <span className="stat-label">Managers</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.totalUsers}</span>
          <span className="stat-label">Total Users</span>
        </div>
      </div>

      <Card title="Recent Activities">
        {stats.recentActivities.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
            No recent activities
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {stats.recentActivities.map((activity, index) => (
              <li key={index} style={{ 
                padding: '12px 0', 
                borderBottom: index < stats.recentActivities.length - 1 ? '1px solid #eee' : 'none' 
              }}>
                <span style={{ color: '#666', fontSize: '14px' }}>
                  {new Date().toLocaleDateString()} - {activity}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;