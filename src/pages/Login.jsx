import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const Login = ({ onLogin }) => {
  return (
    <div className="login-container">
      <div className="login-card">
        <LoginForm onLogin={onLogin} />
      </div>
    </div>
  );
};

export default Login;