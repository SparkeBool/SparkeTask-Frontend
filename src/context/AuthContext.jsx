import { createContext, useContext, useEffect, useState } from "react";
import { API } from '../services/api'; // your axios instance

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // track loading state

  useEffect(() => {
    // On mount, check if user is authenticated
    API.get('/auth/me')
      .then(() => setAuthenticated(true))
      .catch((err) => { 
         if (err.response?.status !== 401) {
        console.error("Auth check failed:", err); // Only log unexpected errors
      }
        setAuthenticated(false)})
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      await API.post('/auth/login', { email, password });
      setAuthenticated(true);
    } catch (err) {
      setAuthenticated(false);
      throw err; // propagate error so caller can handle it
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await API.post('/auth/logout');
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
