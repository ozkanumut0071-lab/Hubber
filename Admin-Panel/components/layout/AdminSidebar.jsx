import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Shield, Users, LogOut } from 'lucide-react';

const AdminSidebar = () => {
  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/admin', exact: true },
    { title: 'Spor Kortları', icon: Shield, path: '/admin/courts' },
    { title: 'Kullanıcılar', icon: Users, path: '/admin/users' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin-login';
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__logo">AS</div>
        <div>
          <p className="sidebar__title">Admin Panel</p>
          <p className="sidebar__subtitle">Hubber</p>
        </div>
      </div>

      <nav className="sidebar__nav">
        <ul>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    ['sidebar__link', isActive ? 'is-active' : ''].join(' ')
                  }
                >
                  <span className="sidebar__icon">
                    <Icon size={18} />
                  </span>
                  <span className="sidebar__text">{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar__footer">
        <button onClick={handleLogout} className="sidebar__logout">
          <LogOut size={18} />
          <span>Çıkış Yap</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
