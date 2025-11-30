import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import adminAPI from '../../api/admin';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Geçerli bir e-posta adresi girin');
      return;
    }

    setLoading(true);

    try {
      const response = await adminAPI.login(email, password);

      if (response.token) {
        localStorage.setItem('admin_token', response.token);
        window.location.href = '/admin';
      } else {
        setError('Giriş başarısız oldu');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message ||
        'Giriş yapılırken bir hata oluştu. Lütfen bilgilerinizi kontrol edin.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-card__header">
          <div className="auth-logo" style={{ background: '#3b4b5b' }}>
            <span style={{ fontSize: '20px' }}>🔐</span>
          </div>
          <h1 className="auth-title">Sportalya Admin</h1>
          <p className="auth-subtitle">Yönetici Girişi</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Admin Email
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="admin@hubber.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Şifre
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
            style={{ background: loading ? '#999' : 'linear-gradient(135deg, #52606d 0%, #111827 100%)' }}
          >
            {loading ? 'Giriş Yapılıyor...' : 'Admin Girişi'}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/" className="auth-link auth-link--secondary">
            ← Ana sayfaya dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
