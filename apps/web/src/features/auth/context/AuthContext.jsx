import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '@/lib/apiClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchProfile();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await apiClient.get('/auth/profile');
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('token');
      delete apiClient.defaults.headers.common['Authorization'];
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    if (response.accessToken) {
      localStorage.setItem('token', response.accessToken);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.accessToken}`;
      setUser(response.user);
      return response;
    }
    return response;
  };

  const register = async (data) => {
    const response = await apiClient.post('/auth/register', data);
    return response;
  };

  const verify2FA = async (code) => {
    const response = await apiClient.post('/auth/2fa/verify', { code });
    if (response.accessToken) {
      localStorage.setItem('token', response.accessToken);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.accessToken}`;
      setUser(response.user);
    }
    return response;
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete apiClient.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, verify2FA, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}