import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import {login} from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth();
  const navigate = useNavigate();
   const { authenticated } = useAuth();

  useEffect(() => {
    if (authenticated) {
      navigate('/dashboard'); // redirect logged in users away from login
    }
  }, [authenticated]);

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    await login(email, password); // use login from context
    toast.success("Login successful!");
    navigate("/dashboard");
  } catch (err) {
    const errorMessage = err.response?.data?.error || "Login failed.";
    toast.error(errorMessage);
  }
};


  return (
    <div className="d-flex min-vh-100 justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="text-center mb-4">
          <h2 className="h3 mb-3 fw-normal">Welcome back</h2>
          <p className="text-muted">Please sign in to your account</p>
        </div>
        
        <form onSubmit={handleLogin}>
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
            className="w-100 btn btn-primary btn-lg" 
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}