import axios from 'axios';
import { toast } from 'react-toastify';

export const API = axios.create({
  baseURL: 'https://server-2mp1.onrender.com:4000/api', // optional: change if you prefix routes
  withCredentials: true, // ensures cookies (for auth) are sent
});

// 🌐 Utility to handle API responses
const handleError = (action, err) => {
  const message = err.response?.data?.message || err.message || 'Unexpected error';
  console.error(`${action} failed:`, message);
  toast.error(`${action} failed: ${message}`);
  throw err;
};

// 📥 Get all tasks
export const fetchTasks = async () => {
  try {
    const res = await API.get('/tasks');
    return res.data;
  } catch (err) {
    return handleError('Fetching tasks', err);
  }
};

// ➕ Create a task
export const createTask = async (task) => {
  try {
    const res = await API.post('/tasks', task);
    toast.success('Task created');
    return res.data;
  } catch (err) {
    return handleError('Creating task', err);
  }
};

// 🔄 Update a task
export const updateTask = async (id, updates) => {
  try {
    const res = await API.put(`/tasks/${id}`, updates);
    toast.success('Task updated');
    return res.data;
  } catch (err) {
    return handleError('Updating task', err);
  }
};

// ❌ Delete a task
export const deleteTask = async (id) => {
  try {
    await API.delete(`/tasks/${id}`);
    toast.success('Task deleted');
  } catch (err) {
    return handleError('Deleting task', err);
  }
};
