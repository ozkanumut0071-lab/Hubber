import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { fetchUserProfile, updateUserProfile, uploadProfilePhoto } from '../services/api';

const Profile = () => {
  const { refreshUser } = useOutletContext() || {};
  const [userData, setUserData] = useState({
    displayName: '',
    email: '',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
  });
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      const { data, error } = await fetchUserProfile();

      if (error) {
        setStatus({ type: 'error', message: 'Profil bilgileri yüklenirken bir hata oluştu.' });
      } else if (data) {
        setUserData({
          displayName: data.display_name || '',
          email: data.email || '',
          avatar: data.profile_photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.display_name || 'User'}`,
        });
      }

      setLoading(false);
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setStatus({ type: 'idle', message: '' });
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Önizleme için lokal URL
    const previewUrl = URL.createObjectURL(file);
    setUserData((prev) => ({ ...prev, avatar: previewUrl }));

    // Cloudinary'ye upload
    setUploading(true);
    setStatus({ type: 'idle', message: '' });

    const { data, error } = await uploadProfilePhoto(file);

    if (error) {
      setStatus({ type: 'error', message: 'Profil fotoğrafı yüklenirken bir hata oluştu.' });
      setUploading(false);
    } else if (data) {
      setUserData((prev) => ({ ...prev, avatar: data.profile_photo }));
      setStatus({ type: 'success', message: 'Profil fotoğrafı başarıyla güncellendi.' });
      setUploading(false);

      // Navbar'daki profil fotoğrafını güncellemek için user bilgisini yenile
      if (refreshUser) {
        await refreshUser();
      }
    }
  };

  const handleSave = async () => {
    if (!userData.displayName.trim()) {
      setStatus({ type: 'error', message: 'Kullanıcı adı zorunludur.' });
      return;
    }

    setStatus({ type: 'idle', message: '' });

    const payload = {
      display_name: userData.displayName,
    };

    const { data, error } = await updateUserProfile(payload);

    if (error) {
      setStatus({ type: 'error', message: 'Profil güncellenirken bir hata oluştu.' });
    } else {
      setStatus({ type: 'success', message: 'Profil bilgileriniz başarıyla güncellendi.' });

      // Navbar'daki kullanıcı adını güncellemek için user bilgisini yenile
      if (refreshUser) {
        await refreshUser();
      }
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
          Profil bilgileri yükleniyor...
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile-title">Profil Bilgilerim</h2>

        <div className="profile-avatar-wrapper">
          <img src={userData.avatar} alt="Profil" />
          <label className="avatar-overlay">
            <span>{uploading ? 'Yükleniyor...' : 'Değiştir'}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              disabled={uploading}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <span className="muted" style={{ fontSize: '0.9rem' }}>
          {uploading ? 'Profil fotoğrafı yükleniyor...' : 'Fotoğrafı değiştirmek için üzerine tıklayın'}
        </span>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label className="form-label">Kullanıcı Adı</label>
          <input
            type="text"
            name="displayName"
            className="form-input"
            value={userData.displayName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">E-Posta Adresi</label>
          <input
            type="email"
            name="email"
            className="form-input"
            value={userData.email}
            disabled
            style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
          />
          <span className="muted" style={{ fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
            E-posta adresi değiştirilemez
          </span>
        </div>

        {status.type !== 'idle' && (
          <div
            style={{
              padding: '12px',
              borderRadius: '10px',
              background: status.type === 'error' ? '#fff4f4' : '#ecfdf3',
              border: `1px solid ${status.type === 'error' ? '#fecdd3' : '#bbf7d0'}`,
              color: status.type === 'error' ? '#b91c1c' : '#14532d',
              marginTop: '6px',
            }}
          >
            {status.message}
          </div>
        )}

        <button className="save-btn" onClick={handleSave}>
          Değişiklikleri Kaydet
        </button>
      </form>
    </div>
  );
};

export default Profile;
