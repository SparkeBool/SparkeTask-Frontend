import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaExclamationCircle } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { authenticated } = useAuth();

  useEffect(() => {
    if (authenticated) {
      navigate('/dashboard');
    }
  }, [authenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/dashboard");
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Login failed. Please check your credentials.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page min-vh-100 d-flex align-items-center bg-gradient-light">
      <div className="container py-5">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="row justify-content-center"
        >
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg border-0 rounded-lg overflow-hidden">
              {/* Header Section */}
              <div className="card-header bg-white py-4 border-0 text-center">
                <div className="mb-3">
                  <FaExclamationCircle size={40} color="#4E73DF" />
                </div>
                <h2 className="h3 font-weight-800 text-primary mb-1">Welcome Back</h2>
                <p className="text-muted mb-0">Sign in to continue to your dashboard</p>
              </div>
              
              {/* Body Section */}
              <div className="card-body px-5 py-4">
                <form onSubmit={handleLogin}>
                  {/* Email Input */}
                  <div className="form-group mb-4">
                    <label htmlFor="email" className="form-label small text-uppercase text-muted fw-bold mb-2">
                      Email Address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaEnvelope className="text-muted" />
                      </span>
                      <input
                        type="email"
                        className="form-control form-control-lg border-start-0"
                        id="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>
                  </div>
                  
                  {/* Password Input */}
                  <div className="form-group mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label htmlFor="password" className="form-label small text-uppercase text-muted fw-bold">
                        Password
                      </label>
                      <a href="/forgot-password" className="small text-primary text-decoration-none">
                        Forgot Password?
                      </a>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaLock className="text-muted" />
                      </span>
                      <input
                        type="password"
                        className="form-control form-control-lg border-start-0"
                        id="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Remember Me & Submit */}
                  <div className="form-group mb-4 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" />
                      <label className="form-check-label small text-muted" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-100 btn btn-primary btn-lg py-3 fw-bold shadow-sm"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </motion.button>
                </form>
              </div>
              
              {/* Footer Section */}
              <div className="card-footer bg-light text-center py-3">
                <p className="small text-muted mb-0">
                  Don't have an account?{' '}
                  <a href="/register" className="text-primary text-decoration-none fw-bold">
                    Create one
                  </a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}