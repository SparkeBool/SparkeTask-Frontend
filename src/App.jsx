import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Container, Spinner, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Board from './components/Board';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';

import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from './services/api';

function Dashboard() {
  const [tasks, setTasks] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(task) {
    const newTask = await createTask(task);
    setTasks((prev) => [...prev, newTask]);
  }

 async function handleDelete(id) {
  try {
    await deleteTask(id);
    setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    toast.success("Task deleted successfully");
  } catch (error) {
    console.error("Failed to delete task:", error);
    toast.error("Failed to delete task");
  } 
}


 async function handleStatusChange(id, newStatus) {
  try {
    const updatedTask = await updateTask(id, { status: newStatus });
    setTasks(prevTasks =>
      prevTasks.map(task => (task._id === id ? updatedTask : task))
    );
  } catch (error) {
    console.error("Failed to update task status:", error);
  }
}


  return (
    <Container className="py-4">
      {loading ? (
        <div className="d-flex justify-content-center my-5 py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <Board
           tasks={tasks}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            onShowForm={() => setShowForm(true)}
          />
          <TaskForm
            show={showForm}
            handleClose={() => setShowForm(false)}
            onCreate={handleCreate}
          />
        </>
      )}
    </Container>
  );
}

function AppRoutes() {
  const { authenticated, loading } = useAuth();

  if (loading) {
    // Show a fullscreen spinner while auth status is loading
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={authenticated ? "/dashboard" : "/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={authenticated ? <Dashboard /> : <Navigate to="/login" />}
      />
      {/* <Route path="/projects" element={<div>Projects Page</div>} />
      <Route path="/team" element={<div>Team Page</div>} />
      <Route path="/profile" element={<div>Profile Page</div>} />
      <Route path="/settings" element={<div>Settings Page</div>} /> */}
    </Routes>
  );
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <Button
          onClick={scrollToTop}
          variant="primary"
          className="rounded-circle p-3"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 1000
          }}
        >
          <i className="bi bi-arrow-up"></i>
        </Button>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <main className="flex-grow-1" style={{ 
          minHeight: 'calc(100vh - 120px)',
          paddingTop: '80px' // Account for fixed navbar
        }}>
          <AppRoutes />
        </main>

        <footer className="bg-dark text-light py-4">
          <Container>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div className="mb-3 mb-md-0">
                <h5 className="mb-1">
                  <i className="bi bi-check2-circle fs-3 text-primary me-2"></i>
                  <span className="fw-bold fs-4">
                    Sparke<span className="text-primary">Task</span>
                  </span>
                </h5>
                <small className="text-warning">Your productivity companion</small>
              </div>
              
              <div className="d-flex">
                <a href="#" className="text-light me-3" aria-label="GitHub">
                  <i className="bi bi-github"></i>
                </a>
                <a href="#" className="text-light me-3" aria-label="Twitter">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="text-light" aria-label="Email">
                  <i className="bi bi-envelope"></i>
                </a>
              </div>
            </div>
            
            <hr className="my-4 bg-secondary" />
            
            <div className="text-center text-md-start">
              <small className="text-light">
                &copy; {new Date().getFullYear()} Sparke Information Technology. All rights reserved. | 
                <a href="#" className="text-light ms-2">Privacy Policy</a> | 
                <a href="#" className="text-light ms-2">Terms of Service</a>
              </small>
            </div>
          </Container>
        </footer>

        <ScrollToTop />

        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
