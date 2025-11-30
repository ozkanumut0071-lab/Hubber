import React from 'react';
import { Link } from 'react-router-dom';

const ProfileDrawer = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  const handleNavigate = () => {
    onClose();
  };

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className={`drawer mini ${isOpen ? 'open' : ''}`}>
        <div className="drawer-menu" style={{ gap: '10px' }}>
          <Link to="/profil" onClick={handleNavigate} className="login-btn" style={{ textAlign: 'center' }}>
            Profil
          </Link>
          <button className="logout-btn" onClick={onLogout} style={{ width: '100%' }}>
            Çıkış Yap
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileDrawer;
