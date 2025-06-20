import axios from 'axios';

const API_BASE_URL = 'https://islomjonovabdulazim-learning-center-assistant-system-99fa.twc1.net';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
};

// Admin API
export const adminAPI = {
  // Learning Centers
  getCenters: () => api.get('/admin/learning-centers'),
  createCenter: (data) => api.post('/admin/learning-centers', data),
  updateCenter: (id, data) => api.put(`/admin/learning-centers/${id}`, data),
  deleteCenter: (id) => api.delete(`/admin/learning-centers/${id}`),
  
  // Managers
  getManagers: () => api.get('/admin/users?role=manager'),
  createManager: (data) => api.post('/admin/users', { ...data, role: 'manager' }),
  updateManager: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteManager: (id) => api.delete(`/admin/users/${id}`),
  
  // Stats
  getStats: () => api.get('/admin/stats'),
};

export default api;