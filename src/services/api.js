const API_BASE = 'http://localhost:5033/api';  // Change to deployed URL later

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const register = async (data) => {
  const res = await fetch(`${API_BASE}/auth/register`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
};

export const login = async (data) => {
  const res = await fetch(`${API_BASE}/auth/login`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
};

export const getProjects = async () => {
  const res = await fetch(`${API_BASE}/projects`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
};

export const createProject = async (data) => {
  const res = await fetch(`${API_BASE}/projects`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) });
  if (!res.ok) throw new Error('Failed to create project');
  return res.json();
};

export const getProject = async (id) => {
  const res = await fetch(`${API_BASE}/projects/${id}`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch project');
  return res.json();
};

export const deleteProject = async (id) => {
  const res = await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE', headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to delete project');
};

export const createTask = async (projectId, data) => {
  const res = await fetch(`${API_BASE}/projects/${projectId}/tasks`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
};

export const updateTask = async (taskId, data) => {
  const res = await fetch(`${API_BASE}/tasks/${taskId}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(data) });
  if (!res.ok) throw new Error('Failed to update task');
};

export const deleteTask = async (taskId) => {
  const res = await fetch(`${API_BASE}/tasks/${taskId}`, { method: 'DELETE', headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to delete task');
};