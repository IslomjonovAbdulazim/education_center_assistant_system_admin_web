import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Centers from './pages/Centers';
import Managers from './pages/Managers';
import './styles/globals.css';

const Sidebar = ({ onLogout }) => {
  const location = useLocation();

  const getActiveClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <ul className="nav-menu">
        <li><a href="/dashboard" className={getActiveClass('/dashboard')}>Dashboard</a></li>
        <li><a href="/centers" className={getActiveClass('/centers')}>Learning Centers</a></li>
        <li><a href="/managers" className={getActiveClass('/managers')}>Managers</a></li>
        <li><button onClick={onLogout} className="logout-btn">Logout</button></li>
      </ul>
    </nav>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('admin_token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('admin_token');
      setIsAuthenticated(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  return (
    <Router>
      <div className="admin-layout">
        <Sidebar onLogout={logout} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/centers" element={<Centers />} />
            <Route path="/managers" element={<Managers />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;