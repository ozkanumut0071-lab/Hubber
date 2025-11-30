import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminAPI from '../../api/admin';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

/**
 * Blog listeleme ve yönetimi
 */
const ListBlogsPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await adminAPI.getBlogs();
      setBlogs(data.blogs || data || []);
    } catch (error) {
      console.error('Bloglar yüklenemedi:', error);
      setError('Bloglar yüklenirken bir hata oluştu.');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <p className="eyebrow">Bloglar</p>
          <h1>Blog Yönetimi</h1>
          <p className="muted">Yeni içerikler ekle, taslakları gör.</p>
        </div>
        <Button onClick={() => navigate('/admin/blogs/create')}>Yeni Blog Ekle</Button>
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
          {blogs.length === 0 ? (
            <div className="empty-state">
              <h3>Henüz blog bulunmuyor</h3>
              <p className="muted">İlk yazını eklemek için sağ üstten başlayabilirsin.</p>
            </div>
          ) : (
          <div className="stack">
            {blogs.map((blog) => (
              <article key={blog.id} className="list-row">
                <div>
                  <p className="list-row__title">{blog.title}</p>
                  <p className="muted">
                    {blog.published_at
                      ? new Date(blog.published_at).toLocaleDateString('tr-TR')
                      : new Date(blog.created_at).toLocaleDateString('tr-TR')
                    }
                  </p>
                </div>
                <Badge variant={blog.is_published ? 'success' : 'default'}>
                  {blog.is_published ? 'Yayında' : 'Taslak'}
                </Badge>
              </article>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListBlogsPage;
