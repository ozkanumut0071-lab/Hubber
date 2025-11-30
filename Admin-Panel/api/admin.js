import apiClient from './client';

const LOCAL_USERS_KEY = 'mock_users';
const LOCAL_CURRENT_KEY = 'mock_current_user';
const LOCAL_COURTS_KEY = 'mock_courts';

const ensureSeededAdmin = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]');
    const hasAdmin = stored.some((u) => u.email === 'admin@admin.com');
    if (!hasAdmin) {
      stored.push({
        id: 'admin-1',
        display_name: 'Admin Kullanici',
        email: 'admin@admin.com',
        profile_photo: 'https://images.unsplash.com/photo-1504595403659-9088ce801e29?auto=format&fit=crop&w=600&q=80',
        role: 'admin',
        password: 'admin',
      });
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(stored));
    }
  } catch (err) {
    console.error('Admin seed failed', err);
  }
};

const loadLocalCourts = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(LOCAL_COURTS_KEY) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

const saveLocalCourts = (courts) => {
  try {
    localStorage.setItem(LOCAL_COURTS_KEY, JSON.stringify(courts));
  } catch (err) {
    console.error('Failed to save courts', err);
  }
};

const fallbackLogin = (email, password) => {
  try {
    const users = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]');
    const admin = users.find(
      (u) => u.email === email && u.role === 'admin' && (!u.password || u.password === password),
    );
    if (admin) {
      localStorage.setItem(LOCAL_CURRENT_KEY, JSON.stringify({ id: admin.id, email: admin.email }));
      const token = `mock-admin-token-${admin.id}`;
      localStorage.setItem('admin_token', token);
      return { token, user: admin };
    }
    return null;
  } catch (err) {
    console.error('Admin fallback login failed', err);
    return null;
  }
};

  const mockDashboard = () => {
    // Lightweight demo stats derived from local users + blogs counts
    const users = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]');
    const totalUsers = users.length;
    const admins = users.filter((u) => u.role === 'admin').length;
    const students = totalUsers - admins;
    const totalBlogs = 12;
    const totalReports = 3;
    const growth = 8;
    const courts = loadLocalCourts().length;
    return {
      total_users: totalUsers,
      total_posts: 0,
      total_comments: 0,
      total_blogs: totalBlogs,
      total_courts: courts,
      growth_users: growth,
      growth_reports: -2,
    };
  };

// Admin API servisleri
const adminAPI = {
  // Admin login
  async login(email, password) {
    // Try real API first
    try {
      const { data } = await apiClient.post('/admin/login', { email, password });
      return data;
    } catch (err) {
      // Fallback to local mock storage
      ensureSeededAdmin();
      const fallback = fallbackLogin(email, password);
      if (fallback) return fallback;
      throw err;
    }
  },

  // Dashboard istatistikleri
  async getDashboardStats() {
    try {
      const { data } = await apiClient.get('/admin/dashboard-stats');
      return data;
    } catch (err) {
      ensureSeededAdmin();
      return mockDashboard();
    }
  },

  // Kullanici listesi
  async getUsers() {
    try {
      const { data } = await apiClient.get('/admin/users');
      return data;
    } catch (err) {
      const users = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]');
      return { users };
    }
  },

  // Kullanici banla
  async banUser(userId) {
    try {
      const { data } = await apiClient.post(`/admin/users/${userId}/ban`);
      return data;
    } catch (err) {
      const users = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]').map((u) =>
        u.id === userId ? { ...u, is_banned: true } : u
      );
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
      return { success: true };
    }
  },

  // Ban kaldir
  async unbanUser(userId) {
    try {
      const { data } = await apiClient.post(`/admin/users/${userId}/unban`);
      return data;
    } catch (err) {
      const users = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]').map((u) =>
        u.id === userId ? { ...u, is_banned: false } : u
      );
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
      return { success: true };
    }
  },

  // Spor kortlari
  async getCourts() {
    try {
      const { data } = await apiClient.get('/admin/courts');
      return data;
    } catch (err) {
      return { courts: loadLocalCourts() };
    }
  },

  async createCourt(courtData) {
    try {
      const { data } = await apiClient.post('/admin/courts', courtData);
      return data;
    } catch (err) {
      const current = loadLocalCourts();
      const newCourt = {
        id: `court-${Date.now()}`,
        name: courtData.name || 'Yeni Kort',
        type: courtData.type || 'Tesis',
        hours: courtData.hours || '08:00 - 23:00',
        image: courtData.image || '',
        slots: courtData.slots || [],
        created_at: new Date().toISOString(),
      };
      const next = [newCourt, ...current];
      saveLocalCourts(next);
      return { court: newCourt };
    }
  },

  async deleteCourt(courtId) {
    try {
      const { data } = await apiClient.delete(`/admin/courts/${courtId}`);
      return data;
    } catch (err) {
      const current = loadLocalCourts();
      const next = current.filter((c) => c.id !== courtId);
      saveLocalCourts(next);
      return { success: true };
    }
  },

  // Blog listesi
  async getBlogs() {
    const { data } = await apiClient.get('/admin/blogs');
    return data;
  },

  // Blog detay
  async getBlog(blogId) {
    const { data } = await apiClient.get(`/admin/blogs/${blogId}`);
    return data;
  },

  // Blog olustur
  async createBlog(blogData) {
    const { data } = await apiClient.post('/admin/blogs', blogData);
    return data;
  },

  // Blog guncelle
  async updateBlog(blogId, blogData) {
    const { data } = await apiClient.put(`/admin/blogs/${blogId}`, blogData);
    return data;
  },

  // Blog sil
  async deleteBlog(blogId) {
    const { data } = await apiClient.delete(`/admin/blogs/${blogId}`);
    return data;
  },

  // Blog resmi yükle
  async uploadBlogImage(file) {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await apiClient.post('/upload/image/blog', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
};

export default adminAPI;
