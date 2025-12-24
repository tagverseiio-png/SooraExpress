'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from './apiClient';

type User = {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, data?: any) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        const userData = await apiClient.request('/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userData);
      }
    } catch (error) {
      localStorage.removeItem('auth_token');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await apiClient.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('auth_token', response.token);
      setUser(response.user);
    } catch (error: any) {
      throw new Error(error?.message || 'Unable to sign in');
    }
  };

  const signUp = async (email: string, password: string, data?: any) => {
    try {
      const response = await apiClient.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, ...data }),
      });
      localStorage.setItem('auth_token', response.token);
      setUser(response.user);
    } catch (error: any) {
      throw new Error(error?.message || 'Unable to sign up');
    }
  };

  const signOut = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        await apiClient.request('/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } finally {
      localStorage.removeItem('auth_token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
