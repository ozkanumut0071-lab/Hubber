import axios from 'axios';

// Backend API base URL from environment variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.antalyasports.com/api';

// Axios instance oluştur
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - her istekte JWT token ekle
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - 401 durumunda token temizle ve bildirim göster
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token geçersiz, admin'i logout et
      localStorage.removeItem('admin_token');

      // Show toast notification
      if (typeof window !== 'undefined') {
        // Dynamically import and show toast
        import('../components/ui/Toast').then((module) => {
          module.showToast('Oturumunuz sona erdi. Lütfen tekrar giriş yapın.', 'error');
        });
      }

      // Redirect after a short delay to allow toast to show
      setTimeout(() => {
        window.location.href = '/admin-login';
      }, 500);
    }
    return Promise.reject(error);
  }
);

export default apiClient;