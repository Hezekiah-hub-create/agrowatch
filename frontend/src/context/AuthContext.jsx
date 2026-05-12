import { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('agrowatch_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  /** Mock login — finds user by phone */
  const login = async (phone, password) => {
    await delay(600);
    // Find user by phone in mock data (fallback to farmer if not found)
    const mockUser = Object.values(MOCK_USERS).find(u => u.phone_number === phone) || MOCK_USERS.farmer;
    const sessionUser = { ...mockUser, token: 'mock-jwt-token-xyz' };
    setUser(sessionUser);
    localStorage.setItem('agrowatch_user', JSON.stringify(sessionUser));
    return sessionUser;
  };

  const register = async (data) => {
    await delay(800);
    const newUser = {
      id: Date.now(),
      full_name: data.full_name,
      phone_number: data.phone_number,
      user_role: data.role,
      region: data.region,
      district: data.district,
      token: 'mock-jwt-token-xyz',
    };
    setUser(newUser);
    localStorage.setItem('agrowatch_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agrowatch_user');
  };

  const isFarmer = user?.user_role === 'farmer';
  const isBuyer  = user?.user_role === 'buyer';
  const isAdmin  = user?.user_role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isFarmer, isBuyer, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

// Utility
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
