import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { storage } from '../utils/storage';
import { mockApi } from '../services/mockApi';
import { isUIMode } from '../config/env';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  facebookLogin: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing tokens on mount
    const accessToken = storage.getAccessToken();
    const idToken = storage.getIdToken();
    if (accessToken && idToken) {
      setIsAuthenticated(true);
      // In a real app, you would fetch user data here
      setUser({
        id: '1',
        email: 'user@example.com',
        name: 'User',
      });
    }
  }, []);

  const handleLoginSuccess = (accessToken: string, idToken: string, userData: User) => {
    storage.setAccessToken(accessToken);
    storage.setIdToken(idToken);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const login = async (email: string, password: string) => {
    if (isUIMode) {
      const response = await mockApi.login(email, password);
      handleLoginSuccess(response.accessToken, response.idToken, response.user);
    } else {
      // TODO: Implement real API call
      throw new Error('Real API not implemented yet');
    }
  };

  const googleLogin = async () => {
    if (isUIMode) {
      const response = await mockApi.googleLogin();
      handleLoginSuccess(response.accessToken, response.idToken, response.user);
    } else {
      // TODO: Implement real Google login
      throw new Error('Real Google login not implemented yet');
    }
  };

  const facebookLogin = async () => {
    if (isUIMode) {
      const response = await mockApi.facebookLogin();
      handleLoginSuccess(response.accessToken, response.idToken, response.user);
    } else {
      // TODO: Implement real Facebook login
      throw new Error('Real Facebook login not implemented yet');
    }
  };

  const logout = () => {
    storage.clearTokens();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, googleLogin, facebookLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 