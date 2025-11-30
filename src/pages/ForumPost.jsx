import React from 'react';
import { Link, useParams } from 'react-router-dom';

// Simple placeholder to satisfy routing until forum posts are implemented.
const ForumPost = () => {
  const { id } = useParams();

  return (
    <div className="detail-card" style={{ padding: '20px', marginTop: '20px' }}>
      <h2 style={{ marginTop: 0 }}>Forum Gönderisi</h2>
      <p className="muted">ID: {id}</p>
      <p>Forum postu henüz hazır değil. Ana sayfaya dönebilirsiniz.</p>
      <Link to="/spor" className="login-btn" style={{ display: 'inline-block', textDecoration: 'none', padding: '10px 16px', borderRadius: '8px' }}>
        Spor sayfasına dön
      </Link>
    </div>
  );
};

export default ForumPost;
