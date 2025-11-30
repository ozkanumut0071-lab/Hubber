import React, { useEffect, useState } from 'react';
import adminAPI from '../../api/admin';
import Button from '../../components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Trash2 } from 'lucide-react';

const CourtManagementPage = () => {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', type: '', hours: '08:00 - 23:00', image: '' });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadCourts();
  }, []);

  const loadCourts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminAPI.getCourts();
      setCourts(data.courts || []);
    } catch (err) {
      console.error('Kortlar yüklenemedi', err);
      setError('Kortlar yüklenirken bir hata oluştu.');
      setCourts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Kort adı zorunludur.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await adminAPI.createCourt(form);
      setForm({ name: '', type: '', hours: '08:00 - 23:00' });
      await loadCourts();
    } catch (err) {
      console.error('Kort eklenemedi', err);
      setError('Kort eklenirken bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <p className="eyebrow">Spor Kortları</p>
          <h1>Kort Yönetimi</h1>
          <p className="muted">Yeni kort ekleyin ve mevcutları görüntüleyin.</p>
        </div>
      </header>

      <section className="card" style={{ marginBottom: 16 }}>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label className="form-label">Kort Adı</label>
            <input
              className="form-input"
              placeholder="Örn: Buz Pisti A"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Tür</label>
            <input
              className="form-input"
              placeholder="Örn: Buz Hokeyi"
              value={form.type}
              onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Saatler</label>
            <input
              className="form-input"
              placeholder="08:00 - 23:00"
              value={form.hours}
              onChange={(e) => setForm((prev) => ({ ...prev, hours: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Görsel URL (opsiyonel)</label>
            <input
              className="form-input"
              placeholder="https://resim.link"
              value={form.image}
              onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
            />
          </div>
          <div className="form-group" style={{ alignSelf: 'end' }}>
            <Button type="submit" disabled={saving}>
              {saving ? 'Kaydediliyor...' : 'Kort Ekle'}
            </Button>
          </div>
        </form>
        {error ? <p style={{ color: '#ef4444', marginTop: 8 }}>{error}</p> : null}
      </section>

      {loading ? (
        <div className="card card--center">
          <p className="muted">Yükleniyor...</p>
        </div>
      ) : (
        <div className="card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Adı</TableHead>
                <TableHead>Tür</TableHead>
                <TableHead>Saatler</TableHead>
                <TableHead>Görsel</TableHead>
                <TableHead>Oluşturma</TableHead>
                <TableHead className="is-right">İşlem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="muted">
                    Henüz kort eklenmedi.
                  </TableCell>
                </TableRow>
              ) : (
                courts.map((court) => (
                  <TableRow key={court.id}>
                    <TableCell className="is-strong">{court.name}</TableCell>
                    <TableCell>{court.type || '-'}</TableCell>
                    <TableCell>{court.hours || '-'}</TableCell>
                    <TableCell>
                      {court.image ? (
                        <a href={court.image} target="_blank" rel="noreferrer" className="muted">
                          Görseli aç
                        </a>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {court.created_at
                        ? new Date(court.created_at).toLocaleDateString('tr-TR')
                        : '-'}
                    </TableCell>
                    <TableCell className="is-right">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={async () => {
                          setDeletingId(court.id);
                          try {
                            await adminAPI.deleteCourt(court.id);
                            await loadCourts();
                          } catch (err) {
                            console.error('Silinemedi', err);
                            setError('Kort silinirken bir hata oluştu.');
                          } finally {
                            setDeletingId(null);
                          }
                        }}
                        disabled={deletingId === court.id}
                      >
                        <Trash2 size={14} />
                        <span className="btn__gap">{deletingId === court.id ? 'Siliniyor...' : 'Sil'}</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CourtManagementPage;
