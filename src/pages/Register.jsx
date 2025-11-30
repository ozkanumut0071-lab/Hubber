import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as apiRegister } from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Geçerli bir e-posta adresi girin');
      return;
    }

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    setLoading(true);

    try {
      const { data, error: apiError } = await apiRegister({
        display_name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      console.log('Register response:', data);

      if (apiError) {
        console.error('Register API error:', apiError);
        setError('Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.');
        setLoading(false);
        return;
      }

      if (data && data.access_token) {
        console.log('Register successful, storing token');
        localStorage.setItem('auth_token', data.access_token);
        localStorage.setItem('user', JSON.stringify({
          id: data.user_id,
          email: data.email,
          role: data.role
        }));

        window.location.href = '/';
      } else {
        console.error('No access_token in response:', data);
        setError('Kayıt başarısız oldu');
      }
    } catch (err) {
      console.error('Register error:', err);
      setError('Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-card__header">
          <div className="auth-logo" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <span style={{ fontSize: '20px' }}>🎓</span>
          </div>
          <h1 className="auth-title">Kampüs Portal</h1>
          <p className="auth-subtitle">Yeni Hesap Oluştur</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Ad Soyad
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className="form-input"
              placeholder="Adınız Soyadınız"
              value={formData.fullName}
              onChange={handleChange}
              disabled={loading}
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder="ornek@kampus.edu.tr"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Şifre Tekrar
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className={`auth-button ${loading ? 'is-loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login" className="auth-link">
            Zaten hesabın var mı? <strong>Giriş Yap</strong>
          </Link>
          <Link to="/" className="auth-link auth-link--secondary">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
