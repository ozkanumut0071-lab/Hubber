import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Toast from '../ui/Toast';

// Pages
import Dashboard from '../../pages/DashBoard';
import UserListPage from '../../pages/Users/UserListPage';
import CourtManagementPage from '../../pages/Courts/CourtManagementPage';

/**
 * Protected Route Component
 */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('admin_token');

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

/**
 * Admin Panel App (without BrowserRouter - used as sub-route)
 */
const AdminApp = () => {
  return (
    <>
      <Toast />
      <ProtectedRoute>
        <div className="admin-shell">
          <AdminSidebar />
          <main className="admin-main">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<UserListPage />} />
              <Route path="/courts" element={<CourtManagementPage />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </main>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default AdminApp;
