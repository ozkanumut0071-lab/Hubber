import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SportsBooking = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form, setForm] = useState({
    name: '',
    email: '',
    note: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const facility = state?.facility;
  const slotTime = state?.time;

  useEffect(() => {
    if (!facility || !slotTime) {
      navigate('/spor', { replace: true });
    }
  }, [facility, slotTime, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!facility || !slotTime) return null;

  return (
    <div className="booking-page">
      <div className="booking-hero">
        <button type="button" className="ghost-btn" onClick={() => navigate(-1)}>
          <span style={{ fontWeight: 700 }}>&lt;</span> Spor sayfasına dön
        </button>
        <div className="booking-hero__text">
          <p className="eyebrow" style={{ margin: 0 }}>Rezervasyon</p>
          <h1>Randevu Oluştur</h1>
          <p className="muted" style={{ margin: 0 }}>Seçilen saat: {slotTime}</p>
        </div>
        <div className="booking-hero__tags">
          <span className="pill pill--primary">{facility.type || 'Spor Tesisi'}</span>
          <span className="pill">{facility.hours || '08:00 - 23:00'}</span>
        </div>
      </div>

      <div className="booking-grid">
        <section className="booking-card">
          <div className="booking-badge">Adım 1 · Tesis</div>
          <div className="booking-card__header">
            <div>
              <p className="muted" style={{ margin: 0 }}>Tesis</p>
              <h2 style={{ margin: '6px 0' }}>{facility.name}</h2>
              <p className="muted" style={{ margin: 0 }}>{facility.type || 'Spor Tesisi'} · {slotTime}</p>
            </div>
            <span className="pill pill--soft">{facility.hours || '08:00 - 23:00'}</span>
          </div>
          <div className="booking-info">
            <div>
              <p className="muted">Konum</p>
              <strong>Yerleşke Spor Alanı</strong>
            </div>
            <div>
              <p className="muted">Saha</p>
              <strong>{facility.id || 'Saha'}</strong>
            </div>
            <div>
              <p className="muted">Durum</p>
              <strong>Rezervasyon bekleniyor</strong>
            </div>
          </div>
          <div className="booking-steps">
            <div className="step active">
              <div className="step-dot" />
              <div>
                <p className="muted">Seçim</p>
                <strong>{slotTime}</strong>
              </div>
            </div>
            <div className="step">
              <div className="step-dot muted-dot" />
              <div>
                <p className="muted">Bilgiler</p>
                <strong>Formu doldur</strong>
              </div>
            </div>
            <div className="step">
              <div className="step-dot muted-dot" />
              <div>
                <p className="muted">Onay</p>
                <strong>E-posta bildirimi</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="booking-card booking-card--form">
          <div className="booking-badge">Adım 2 · Bilgiler</div>
          <h3 style={{ margin: '4px 0 10px' }}>Takım bilgisi</h3>
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group stacked">
              <label htmlFor="name">İsim Soyisim</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Örn: Ali Yılmaz"
                required
              />
            </div>
            <div className="form-group stacked">
              <label htmlFor="email">E-posta</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="ornek@mail.com"
                required
              />
            </div>
            <div className="form-group stacked">
              <label htmlFor="note">Not (opsiyonel)</label>
              <textarea
                id="note"
                name="note"
                rows="3"
                value={form.note}
                onChange={handleChange}
                placeholder="Takım ismi, ekipman ihtiyacı veya özel talep"
              />
            </div>

            <button className="login-btn" type="submit" style={{ width: '100%', padding: '14px' }}>
              Randevuyu Onayla
            </button>
          </form>
        </section>
      </div>

      {submitted && (
        <div className="booking-success">
          <div>
            <p className="muted" style={{ margin: 0 }}>Onay bekliyor</p>
            <h3 style={{ margin: '4px 0 6px' }}>Randevu alındı</h3>
            <p style={{ margin: 0 }}>
              {slotTime} için <strong>{facility.name}</strong> kaydedildi. Örnek bildirim aşağıdaki bilgilerle gönderilecek.
            </p>
          </div>
          <div className="success-grid">
            <div>
              <p className="muted">Ad Soyad</p>
              <strong>{form.name || 'İsim belirtilmedi'}</strong>
            </div>
            <div>
              <p className="muted">E-posta</p>
              <strong>{form.email || 'E-posta belirtilmedi'}</strong>
            </div>
            {form.note ? (
              <div style={{ gridColumn: '1/-1' }}>
                <p className="muted">Not</p>
                <strong>{form.note}</strong>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default SportsBooking;
