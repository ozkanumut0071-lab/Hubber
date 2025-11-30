import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import App, { SportsRoute } from './App.jsx';
import ForumPost from './pages/ForumPost.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminApp from '../Admin-Panel/components/layout/AdminApp.jsx';
import LoginPage from '../Admin-Panel/pages/Auth/LoginPage.jsx';
import SportsBooking from './pages/SportsBooking.jsx';
import '../Admin-Panel/styles/admin.css';
import '../Admin-Panel/styles/auth.css';
import '../Admin-Panel/styles/toast.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* User Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin-login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminApp />} />

        {/* Main App Routes */}
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/spor" replace />} />
          <Route path="spor" element={<SportsRoute />} />
          <Route path="spor/randevu" element={<SportsBooking />} />

          <Route path="profil" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          <Route path="forum/:id" element={<ForumPost />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
