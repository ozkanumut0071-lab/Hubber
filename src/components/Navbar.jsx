import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/Logo.ico";

const Navbar = ({ isLoggedIn, user, onOpenDrawer, darkMode, onToggleDarkMode }) => {
  const avatarUrl = user?.profile_photo || user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.display_name || user?.email || 'User'}`;

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={Logo} alt="Sportalya logo" className="nav-logo" />
        <Link to="/spor" className="nav-brand">Sportalya</Link>
      </div>

      <div className="nav-auth" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button className="login-btn" style={{ padding: '8px 12px' }} onClick={onToggleDarkMode}>
          {darkMode ? '☀️ Aydınlık' : '🌙 Gece'}
        </button>
        {isLoggedIn ? (
          <button className="profile-pic-btn" onClick={onOpenDrawer}>
            <img src={avatarUrl} alt="Profil" />
          </button>
        ) : (
          <Link to="/login" className="login-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Giriş Yap
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
