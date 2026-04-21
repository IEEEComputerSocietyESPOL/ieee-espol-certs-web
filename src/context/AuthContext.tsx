import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Member } from '../types';
import { mockMember } from '../data/mockData';

type AuthPage = 'login' | 'register' | 'dashboard' | 'profile'| 'forgot-password';

interface AuthContextType {
  member: Member | null;
  isAuthenticated: boolean;
  currentPage: AuthPage;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  navigate: (page: AuthPage) => void;
  updateProfile: (data: Partial<Member>) => void;
}

export interface RegisterData {
  name: string;
  email: string;
  studentId: string;
  career: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [member, setMember] = useState<Member | null>(null);
  const [currentPage, setCurrentPage] = useState<AuthPage>('login');

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Simulación: cualquier email válido con contraseña no vacía funciona
    await new Promise((r) => setTimeout(r, 800));
    if (email && _password.length >= 6) {
      const loggedMember = { ...mockMember, email };
      setMember(loggedMember);
      setCurrentPage('dashboard');
      return true;
    }
    return false;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 1000));
    const newMember: Member = {
      id: `mem-${Date.now()}`,
      name: data.name,
      initials: data.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase(),
      email: data.email,
      studentId: data.studentId,
      career: data.career,
      joinDate: new Date().toISOString().split('T')[0],
      certificates: [],
    };
    setMember(newMember);
    setCurrentPage('dashboard');
    return true;
  };

  const logout = () => {
    setMember(null);
    setCurrentPage('login');
  };

  const navigate = (page: AuthPage) => setCurrentPage(page);

  const updateProfile = (data: Partial<Member>) => {
    if (!member) return;
    const updated = { ...member, ...data };
    if (data.name) {
      updated.initials = data.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
    }
    setMember(updated);
  };

  return (
    <AuthContext.Provider value={{ member, isAuthenticated: !!member, currentPage, login, register, logout, navigate, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
