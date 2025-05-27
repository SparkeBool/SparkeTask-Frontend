import { useState } from 'react';
import { API } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { FaUserPlus, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await API.post('/auth/register', { email, password });
      toast.success('Registration successful! Please login.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err?.response?.data?.error || 'An unexpected error occurred. Please try again.';
      toast.error(errorMessage, {
        position: "top-center",
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
    <div className="register-page min-vh-100 d-flex align-items-center bg-gradient-primary">
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
                  <FaUserPlus size={40} color="#4E73DF" />
                </div>
                <h2 className="h3 font-weight-800 text-primary mb-1">Create Your Account</h2>
                <p className="text-muted mb-0">Start organizing your tasks today</p>
              </div>
              
              {/* Body Section */}
              <div className="card-body px-5 py-4">
                <form onSubmit={handleRegister}>
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
                    <label htmlFor="password" className="form-label small text-uppercase text-muted fw-bold mb-2">
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <FaLock className="text-muted" />
                      </span>
                      <input
                        type="password"
                        className="form-control form-control-lg border-start-0"
                        id="password"
                        placeholder="Create a password (min 8 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="8"
                      />
                    </div>
                    <small className="text-muted">Use 8 or more characters with a mix of letters and numbers</small>
                  </div>
                  
                  {/* Terms Checkbox */}
                  <div className="form-group mb-4">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="termsCheck" 
                        required
                      />
                      <label className="form-check-label small text-muted" htmlFor="termsCheck">
                        I agree to the <a href="/terms" className="text-primary">Terms of Service</a> and <a href="/privacy" className="text-primary">Privacy Policy</a>
                      </label>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-100 btn btn-primary btn-lg py-3 fw-bold shadow-sm mb-3"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </motion.button>
                </form>
              </div>
              
              {/* Footer Section */}
              <div className="card-footer bg-light text-center py-3">
                <p className="small text-muted mb-0">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary text-decoration-none fw-bold">
                    Sign in <FaArrowRight className="ms-1" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Add some global styles for the register page */}
      <style jsx>{`
        .bg-gradient-primary {
          background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
        }
        .register-page {
          background-size: cover;
          background-position: center;
        }
        .card {
          border: none;
          border-radius: 0.5rem;
        }
        .input-group-text {
          transition: all 0.3s;
        }
        .form-control:focus + .input-group-text {
          color: #4e73df;
          background-color: #e9f0ff;
        }
      `}</style>
    </div>
  );
}