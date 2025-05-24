import { useState } from 'react';
import { API } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 



export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleRegister = async (e) => {
  e.preventDefault();
  try {
    await API.post('/auth/register', { email, password });
    toast.success('Registration successful! Please login.');
    // Optionally navigate to login page
    navigate('/login'); // Make sure useNavigate is imported and used
  } catch (err) {
    console.error('Registration error:', err);
    const errorMessage = err?.response?.data?.error || 'An unexpected error occurred. Please try again.';
    toast.error(errorMessage);
  }
};


  return (
    <div className="d-flex min-vh-100 justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="text-center mb-4">
          <h2 className="h3 mb-3 fw-normal">Create an account</h2>
          <p className="text-muted">Get started with your task management</p>
        </div>
        
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label visually-hidden">Email address</label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="form-label visually-hidden">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            className="w-100 btn btn-primary btn-lg mb-3" 
            type="submit"
          >
            Register
          </button>

          <div className="text-center">
            <p className="text-muted mb-0">Already have an account?</p>
            <Link to="/login" className="text-decoration-none">
              Sign in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}