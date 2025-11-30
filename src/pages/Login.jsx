import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
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
      const { data, error: apiError } = await apiLogin(email, password);

      console.log('Giriş yanıtı:', data); 

      if (apiError) {
        console.error('Giriş API hatası:', apiError);
        setError('Giriş yapılırken bir hata oluştu. Lütfen bilgilerinizi kontrol edin.');
        setLoading(false);
        return;
      }

      if (data && data.access_token) {
        console.log('Giriş başarılı, token depolanıyor'); 
        localStorage.setItem('auth_token', data.access_token);
        localStorage.setItem('user', JSON.stringify({
          id: data.user_id,
          email: data.email,
          role: data.role
        }));

        window.location.href = '/';
      } else {
        console.error('Yanıtta için access_token ı yok:', data);
        setError('Giriş başarısız oldu');
      }
    } catch (err) {
      console.error('Giriş hatası:', err);
      setError('Giriş yapılırken bir hata oluştu. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-card__header">
          <div className="auth-logo" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <span style={{ fontSize: '20px' }}>👋</span>
          </div>
          <h1 className="auth-title">Kampüs Portal</h1>
          <p className="auth-subtitle">Hesabına Giriş Yap</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              E-posta
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="ornek@kampus.edu.tr"
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
            className={`auth-button ${loading ? 'is-loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/register" className="auth-link">
            Hesabın yok mu? <strong>Kayıt Ol</strong>
          </Link>
          <Link to="/" className="auth-link auth-link--secondary">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
