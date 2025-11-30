import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Toast from '../ui/Toast';

import Dashboard from '../../pages/DashBoard';
import ListBlogsPage from '../../pages/Blogs/ListBlogsPage';
import UserListPage from '../../pages/Users/UserListPage';
import LoginPage from '../../pages/Auth/LoginPage';

const ProtectedRoute = ({ children }) => {
  const bypassAuth = true; 
  const isAuthenticated = !!localStorage.getItem('admin_token');

  if (bypassAuth || isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <div className="admin-shell">
                <AdminSidebar />
                <main className="admin-main">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/blogs" element={<ListBlogsPage />} />
                    <Route path="/users" element={<UserListPage />} />
                  </Routes>
                </main>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to admin dashboard */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
