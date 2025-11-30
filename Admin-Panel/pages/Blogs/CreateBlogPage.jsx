import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminAPI from '../../api/admin';
import Button from '../../components/ui/Button';
import { showToast } from '../../components/ui/Toast';

/**
 * Blog oluşturma sayfası
 */
const CreateBlogPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    image_url: '',
    is_published: false,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Auto-generate slug from title
    if (name === 'title' && !formData.slug) {
      const autoSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData((prev) => ({ ...prev, slug: autoSlug }));
    }
  };

  // Handle image file selection and upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast('Lütfen bir resim dosyası seçin', 'error');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast('Resim boyutu 5MB\'dan küçük olmalıdır', 'error');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to backend
    setUploading(true);
    try {
      const data = await adminAPI.uploadBlogImage(file);
      setFormData((prev) => ({
        ...prev,
        image_url: data.url,
      }));
      showToast('Resim başarıyla yüklendi', 'success');
    } catch (error) {
      console.error('Resim yükleme hatası:', error);
      showToast('Resim yüklenemedi', 'error');
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image_url: '' }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      showToast('Blog başlığı gereklidir', 'error');
      return;
    }

    if (!formData.slug.trim()) {
      showToast('Blog slug gereklidir', 'error');
      return;
    }

    if (!formData.content.trim()) {
      showToast('Blog içeriği gereklidir', 'error');
      return;
    }

    setLoading(true);
    try {
      await adminAPI.createBlog(formData);
      showToast('Blog başarıyla oluşturuldu', 'success');
      navigate('/admin/blogs');
    } catch (error) {
      console.error('Blog oluşturma hatası:', error);
      const errorMessage = error.response?.data?.detail || 'Blog oluşturulamadı';
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <p className="eyebrow">Bloglar</p>
          <h1>Yeni Blog Ekle</h1>
          <p className="muted">Ana sayfada gösterilecek yeni bir haber/blog yazısı oluştur.</p>
        </div>
        <Button variant="secondary" onClick={() => navigate('/admin/blogs')}>
          İptal
        </Button>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="stack" style={{ gap: '20px' }}>
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Başlık <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                placeholder="Blog başlığı..."
                required
              />
            </div>

            {/* Slug */}
            <div className="form-group">
              <label htmlFor="slug" className="form-label">
                Slug <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                className="form-input"
                value={formData.slug}
                onChange={handleChange}
                placeholder="url-friendly-slug"
                required
              />
              <p className="form-hint">
                URL'de görünecek kısım (otomatik oluşturulur, düzenleyebilirsiniz)
              </p>
            </div>

            {/* Content */}
            <div className="form-group">
              <label htmlFor="content" className="form-label">
                İçerik <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <textarea
                id="content"
                name="content"
                className="form-input"
                value={formData.content}
                onChange={handleChange}
                placeholder="Blog içeriği..."
                rows="10"
                required
                style={{ resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <label className="form-label">Kapak Resmi</label>

              {imagePreview ? (
                <div style={{ position: 'relative' }}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: '100%',
                      maxWidth: '500px',
                      height: '300px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '8px 12px',
                      cursor: 'pointer',
                    }}
                  >
                    Kaldır
                  </button>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={uploading}
                    style={{
                      display: 'block',
                      padding: '10px',
                      border: '2px dashed #d1d5db',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      width: '100%',
                    }}
                  />
                  <p className="form-hint">
                    PNG, JPG, GIF formatlarında, maksimum 5MB
                  </p>
                </div>
              )}

              {uploading && (
                <p style={{ color: '#3b82f6', marginTop: '8px' }}>
                  Resim yükleniyor...
                </p>
              )}
            </div>

            {/* Publish Status */}
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="is_published"
                  checked={formData.is_published}
                  onChange={handleChange}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span className="form-label" style={{ marginBottom: 0 }}>
                  Hemen Yayınla
                </span>
              </label>
              <p className="form-hint">
                İşaretlenmezse taslak olarak kaydedilir
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <Button type="submit" disabled={loading || uploading}>
            {loading ? 'Kaydediliyor...' : 'Blog Oluştur'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/admin/blogs')}
            disabled={loading}
          >
            İptal
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogPage;
