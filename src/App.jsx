import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useOutletContext, useNavigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import ProfileDrawer from './components/ProfileDrawer';
import Modal from './components/Modal';
import Sports from './pages/Sports';
import { getCurrentUser, logout as apiLogout } from './services/api';

const tabFromPath = (pathname) => {
  if (pathname.startsWith('/spor')) return 'spor';
  if (pathname.startsWith('/yemekhane')) return 'yemekhane';
  if (pathname.startsWith('/forum')) return 'forum';
  if (pathname.startsWith('/profil')) return 'profil';
  if (pathname.startsWith('/blogs')) return 'haberler';
  return 'haberler';
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = tabFromPath(location.pathname);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      return stored === 'dark';
    }
    return true;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('user');

      if (token) {
        setIsLoggedIn(true);
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            console.error('Failed to parse user data:', e);
          }
        }

        // Optionally verify token with backend
        const { data, error } = await getCurrentUser();
        if (error) {
          // Token is invalid, logout
          handleLogout();
        } else if (data) {
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
        }
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    // Call logout API
    await apiLogout();

    // Clear local storage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');

    // Update state
    setIsLoggedIn(false);
    setUser(null);
    setIsDrawerOpen(false);

    // Redirect to login
    navigate('/login');
  };

  const refreshUser = async () => {
    const { data, error } = await getCurrentUser();
    if (!error && data) {
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    }
  };

  const handleReservationClick = (facility, time) => {
    if (!isLoggedIn) {
      alert('Rezervasyon yapmak için lütfen önce giriş yapınız!');
      return;
    }
    setSelectedReservation({ facilityName: facility.name, time });
    setModalOpen(true);
  };

  const confirmReservation = () => {
    alert(`Başarılı! ${selectedReservation.facilityName} için saat ${selectedReservation.time} rezervasyonunuz oluşturuldu.`);
    setModalOpen(false);
    setSelectedReservation(null);
  };

  useEffect(() => {
    const cls = 'dark-mode';
    const theme = darkMode ? 'dark' : 'light';
    const root = document.documentElement;

    if (darkMode) {
      document.body.classList.add(cls);
      root.classList.add(cls);
    } else {
      document.body.classList.remove(cls);
      root.classList.remove(cls);
    }

    document.body.setAttribute('data-theme', theme);
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [darkMode]);

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        isLoggedIn={isLoggedIn}
        user={user}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
      />

      <main>
        <Outlet context={{ onReserveClick: handleReservationClick, isLoggedIn, refreshUser }} />
      </main>

      <ProfileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onLogout={handleLogout}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmReservation}
        title="Rezervasyon Onayı"
      >
        <p>
          <strong>{selectedReservation?.facilityName}</strong> tesisi için saat{' '}
          <strong>{selectedReservation?.time}</strong> dilimine rezervasyon yapmak üzeresiniz.
        </p>
      </Modal>
    </div>
  );
}

export const SportsRoute = () => {
  const { onReserveClick, isLoggedIn } = useOutletContext();
  return <Sports onReserveClick={onReserveClick} isLoggedIn={isLoggedIn} />;
};

export default App;
