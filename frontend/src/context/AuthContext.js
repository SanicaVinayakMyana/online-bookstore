import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserFromStorage = () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        const userFromStorage = {
          username: localStorage.getItem('username'),
          roles: JSON.parse(localStorage.getItem('roles') || '[]'),
          imageUrl: localStorage.getItem('imageUrl'),
        };
        setUser(userFromStorage);
        setToken(storedToken);
      }
      setLoading(false);
    };
    loadUserFromStorage();
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/auth/login', { username, password });
      const { token: newToken, roles, imageUrl } = res.data;
      const userData = { username: res.data.username, roles, imageUrl };

      localStorage.setItem('token', newToken);
      localStorage.setItem('username', userData.username);
      localStorage.setItem('roles', JSON.stringify(roles));
      localStorage.setItem('imageUrl', imageUrl);

      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      setToken(newToken);
      setUser(userData);
      
      setLoading(false);
      return true;
    } catch (err) {
      setError('Invalid credentials');
      setLoading(false);
      return false;
    }
  };
  
  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post('/api/auth/register', { username, email, password });
      setLoading(false);
      return true;
    } catch (err) {
      setError('Registration failed');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    localStorage.removeItem('imageUrl');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateUser = (updatedData) => {
    setUser(currentUser => {
      const newUser = { ...currentUser, ...updatedData };
      if (updatedData.imageUrl !== undefined) {
        localStorage.setItem('imageUrl', newUser.imageUrl);
      }
      return newUser;
    });
  };

  const value = { user, token, loading, error, login, register, logout, updateUser };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
