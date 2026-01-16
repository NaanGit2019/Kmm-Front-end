import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, LoginCredentials, UserRole } from '@/types';
import { API_BASE_URL } from '@/config/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isManager: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  getAuthHeader: () => Record<string, string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'kmm_auth_token';
const USER_KEY = 'kmm_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);
    
    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        // Invalid stored data, clear it
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Login failed' }));
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setUser(data.user);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  const getAuthHeader = useCallback(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isManager: user?.role === 'manager',
    login,
    logout,
    getAuthHeader,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Demo login helper for development (uses mock data)
export function useDemoLogin() {
  const { login } = useAuth();
  
  const loginAsManager = () => {
    // Simulate successful login with mock data
    const mockManagerUser: User = {
      id: 1,
      email: 'manager@example.com',
      name: 'John Manager',
      role: 'manager',
      profileId: 1,
    };
    localStorage.setItem(TOKEN_KEY, 'demo-manager-token');
    localStorage.setItem(USER_KEY, JSON.stringify(mockManagerUser));
    window.location.reload();
  };

  const loginAsEmployee = () => {
    const mockEmployeeUser: User = {
      id: 2,
      email: 'employee@example.com',
      name: 'Jane Employee',
      role: 'employee',
      profileId: 2,
    };
    localStorage.setItem(TOKEN_KEY, 'demo-employee-token');
    localStorage.setItem(USER_KEY, JSON.stringify(mockEmployeeUser));
    window.location.reload();
  };

  return { loginAsManager, loginAsEmployee };
}
