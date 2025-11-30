import apiClient from './client';

/**
 * Admin Cafeteria Menus API servisleri
 */
const cafeteriasAPI = {
  /**
   * Tüm menüleri listele
   */
  getAllMenus: async (params = {}) => {
    const response = await apiClient.get('/admin/cafeteria-menus', { params });
    return response.data;
  },

  /**
   * Menü detayı
   */
  getMenuById: async (menuId) => {
    const response = await apiClient.get(`/admin/cafeteria-menus/${menuId}`);
    return response.data;
  },

  /**
   * Yeni menü oluştur
   */
  createMenu: async (data) => {
    const response = await apiClient.post('/admin/cafeteria-menus', data);
    return response.data;
  },

  /**
   * Menü güncelle
   */
  updateMenu: async (menuId, data) => {
    const response = await apiClient.put(`/admin/cafeteria-menus/${menuId}`, data);
    return response.data;
  },

  /**
   * Menü sil
   */
  deleteMenu: async (menuId) => {
    const response = await apiClient.delete(`/admin/cafeteria-menus/${menuId}`);
    return response.data;
  },

  /**
   * Üniversiteler listesi
   */
  getUniversities: async () => {
    const response = await apiClient.get('/universities');
    return response.data;
  },
};

export default cafeteriasAPI;