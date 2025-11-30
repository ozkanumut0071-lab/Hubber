import React, { useEffect, useState } from 'react';
import adminAPI from '../api/admin';
import { Users, Shield } from 'lucide-react';

/**
 * Dashboard Page
 * Admin paneli ana sayfa - istatistikler
 */
const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await adminAPI.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('İstatistikler yüklenemedi:', error);
      setError('İstatistikler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Toplam Kullanıcı', value: stats?.total_users || 0, icon: Users, tone: 'blue' },
    { title: 'Toplam Spor Kortu', value: stats?.total_courts || 0, icon: Shield, tone: 'green' },
  ];

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <p className="eyebrow">Kontrol Paneli</p>
          <h1>Dashboard</h1>
          <p className="muted">
            Hubber ekosisteminin nabzını tutan ferah bir görünüm. Anlık değerler burada.
          </p>
        </div>
      </header>

      {loading ? (
        <div className="card card--center">
          <p className="muted">Yükleniyor...</p>
        </div>
      ) : error ? (
        <div className="card card--center">
          <p style={{ color: '#ef4444' }}>{error}</p>
        </div>
      ) : (
        <>
          <section className="stat-grid">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className={`card stat-card stat-card--${card.tone}`}>
                  <div>
                    <p className="muted">{card.title}</p>
                    <p className="stat-card__value">{card.value}</p>
                  </div>
                  <span className="stat-card__icon">
                    <Icon size={22} />
                  </span>
                </article>
              );
            })}
          </section>

          <section className="card">
            <div className="card__header">
              <div>
                <p className="eyebrow">Hoş Geldin</p>
                <h2>Panoya göz at</h2>
              </div>
            </div>
            <p className="muted">
              Blog içerikleri, kullanıcılar ve moderasyon işlemleri sol menüden yönetilebilir.
              Sade kartlar ve cool gray palet ile daha samimi bir akış yakalandı.
            </p>
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard;
