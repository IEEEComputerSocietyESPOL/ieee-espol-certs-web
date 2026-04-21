import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import ProfilePage from './components/profile/ProfilePage';
import Dashboard from './pages/Dashboard';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import './index.css';

const AppRouter: React.FC = () => {
  const { currentPage } = useAuth();

  switch (currentPage) {
    case 'login':
      return <LoginPage />;
    case 'register':
      return <RegisterPage />;
    case 'dashboard':
      return <Dashboard />;
    case 'profile':
      return <ProfilePage />;
    case 'forgot-password':
      return <ForgotPasswordPage />;
    default:
      return <LoginPage />;
  }
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
