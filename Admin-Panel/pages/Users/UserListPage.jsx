import React, { useEffect, useState } from 'react';
import adminAPI from '../../api/admin';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/Dialog';
import { Ban, UserCheck } from 'lucide-react';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [banDialog, setBanDialog] = useState({ open: false, user: null, action: 'ban' });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await adminAPI.getUsers();
      setUsers(data.users || []);
    } catch (err) {
      console.error('Kullanıcılar yüklenemedi:', err);
      setError('Kullanıcılar yüklenirken bir hata oluştu.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBanAction = async () => {
    try {
      if (!banDialog.user) return;

      if (banDialog.action === 'ban') {
        await adminAPI.banUser(banDialog.user.id);
      } else {
        await adminAPI.unbanUser(banDialog.user.id);
      }

      await loadUsers();
    } catch (err) {
      console.error('İşlem başarısız:', err);
      setError('İşlem gerçekleştirilirken bir hata oluştu.');
    } finally {
      setBanDialog({ open: false, user: null, action: 'ban' });
    }
  };

  const filtered = users.filter((user) =>
    [user.display_name || user.username, user.email, user.role].some((field) =>
      (field || '').toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <p className="eyebrow">Kullanıcılar</p>
          <h1>Kullanıcı Yönetimi</h1>
          <p className="muted">Ban / unban işlemleri ve rol görünümü.</p>
        </div>
        <div className="input-search">
          <input
            type="text"
            placeholder="İsme veya emaile göre ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
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
        <div className="card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kullanıcı Adı</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Kayıt Tarihi</TableHead>
                <TableHead className="is-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="is-strong">{user.display_name || user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'warning' : 'default'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.is_banned ? 'danger' : 'success'}>
                      {user.is_banned ? 'Banlı' : 'Aktif'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString('tr-TR')
                      : '-'}
                  </TableCell>
                  <TableCell className="is-right">
                    {user.role !== 'admin' && (
                      <Button
                        variant={user.is_banned ? 'primary' : 'danger'}
                        size="sm"
                        onClick={() =>
                          setBanDialog({
                            open: true,
                            user,
                            action: user.is_banned ? 'unban' : 'ban',
                          })
                        }
                      >
                        {user.is_banned ? (
                          <>
                            <UserCheck size={14} />
                            <span className="btn__gap">Banı Kaldır</span>
                          </>
                        ) : (
                          <>
                            <Ban size={14} />
                            <span className="btn__gap">Banla</span>
                          </>
                        )}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="muted">
                    Kullanıcı bulunamadı.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog
        open={banDialog.open}
        onOpenChange={(open) => setBanDialog({ open, user: null, action: 'ban' })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {banDialog.action === 'ban' ? 'Kullanıcıyı Banla' : 'Banı Kaldır'}
            </DialogTitle>
            <DialogDescription>
              {banDialog.action === 'ban'
                ? `${banDialog.user?.display_name || banDialog.user?.username} kullanıcısını banlamak istediğinden emin misin?`
                : `${banDialog.user?.display_name || banDialog.user?.username} kullanıcısının banını kaldırmak istediğinden emin misin?`}
            </DialogDescription>
          </DialogHeader>
          <div className="dialog__actions">
            <Button variant="outline" onClick={() => setBanDialog({ open: false, user: null, action: 'ban' })}>
              İptal
            </Button>
            <Button
              variant={banDialog.action === 'ban' ? 'danger' : 'primary'}
              onClick={handleBanAction}
            >
              {banDialog.action === 'ban' ? 'Banla' : 'Banı Kaldır'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserListPage;
