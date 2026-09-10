import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { apiClient } from '@/lib/apiClient';
import { auth } from '@/lib/firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pendingProfile = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        delete apiClient.defaults.headers.common['Authorization'];
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        if (pendingProfile.current) {
          setIsLoading(false);
          return;
        }
        await syncUser(firebaseUser);
      } catch {
        await signOut(auth);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const syncUser = async (firebaseUser, profile = {}) => {
    const token = await firebaseUser.getIdToken();
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.post('/auth/firebase/sync', {
      email: firebaseUser.email,
      firstName: firebaseUser.displayName?.split(' ')[0],
      lastName: firebaseUser.displayName?.split(' ').slice(1).join(' '),
      phone: profile.phone,
      role: profile.role,
      accountType: profile.accountType,
      nationality: profile.nationality,
      countryOfResidence: profile.countryOfResidence,
      investorType: profile.investorType,
      city: profile.city,
      address: profile.address,
      isPEP: profile.isPEP,
    });
    setUser(response);
    return response;
  };

  const login = async (email, password) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return syncUser(credential.user);
  };

  const register = async (data) => {
    pendingProfile.current = data;
    const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const displayName = [data.firstName, data.lastName].filter(Boolean).join(' ');
    if (displayName) {
      await updateProfile(credential.user, { displayName });
    }
    const response = await syncUser(credential.user, data);
    pendingProfile.current = null;
    return response;
  };

  const verify2FA = async (code) => {
    return user;
  };

  const logout = async () => {
    await signOut(auth);
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