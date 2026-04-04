import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || '';
    const isAuthRequest = requestUrl.includes('/auth/login') || requestUrl.includes('/auth/register');

    if (isAuthRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      Cookies.remove('user');
      localStorage.removeItem('rocketdrop.token');
      localStorage.removeItem('rocketdrop.currentUser');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  refresh: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
};

// Product APIs
export const productAPI = {
  getAll: (page = 0, size = 12) => api.get('/products', { params: { page, size } }),
  getById: (id) => api.get(`/products/${id}`),
  search: (keyword, category, page = 0, size = 12) =>
    api.get('/products/search', { params: { keyword, category, page, size } }),
};

// Drop APIs
export const dropAPI = {
  getUpcoming: () => api.get('/drops'),
  getLive: () => api.get('/drops/live'),
  getById: (id) => api.get(`/drops/${id}`),
};

// Cart APIs
export const cartAPI = {
  get: () => api.get('/cart'),
  add: (data) => api.post('/cart/add', data),
  update: (itemId, data) => api.put(`/cart/${itemId}`, data),
  remove: (itemId) => api.delete(`/cart/${itemId}`),
  clear: () => api.post('/cart/clear'),
};

// Order APIs
export const orderAPI = {
  create: (data) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  track: (id) => api.get(`/orders/${id}/track`),
};

// Review APIs
export const reviewAPI = {
  create: (data) => api.post('/reviews', data),
  getByProduct: (productId) => api.get(`/products/${productId}/reviews`),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
};

// Wishlist APIs
export const wishlistAPI = {
  get: () => api.get('/wishlist'),
  add: (productId) => api.post('/wishlist', { productId }),
  remove: (productId) => api.delete(`/wishlist/${productId}`),
};

// Admin APIs
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),

  getCategories: () => api.get('/admin/categories'),
  createCategory: (data) => api.post('/admin/categories', data),
  updateCategory: (id, data) => api.put(`/admin/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/admin/categories/${id}`),

  getProducts: () => api.get('/admin/products'),
  createProduct: (data) => api.post('/admin/products', data),
  updateProduct: (id, data) => api.put(`/admin/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
  addProductImageFile: (productId, formData) =>
    api.post(`/admin/products/${productId}/images/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteProductImage: (productId, imageId) => api.delete(`/admin/products/${productId}/images/${imageId}`),

  getDrops: () => api.get('/admin/drops'),
  createDrop: (data) => api.post('/admin/drops', data),
  updateDrop: (id, data) => api.put(`/admin/drops/${id}`, data),
  updateDropStatus: (id, status) => api.patch(`/admin/drops/${id}/status`, { status }),
  deleteDrop: (id) => api.delete(`/admin/drops/${id}`),
};

export default api;
