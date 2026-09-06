import { apiClient } from '@/lib/apiClient';

export const authApi = {
  login: (data) => apiClient.post('/auth/login', data),
  register: (data) => apiClient.post('/auth/register', data),
  verify2FA: (data) => apiClient.post('/auth/2fa/verify', data),
  getProfile: () => apiClient.get('/auth/profile'),
  logout: () => apiClient.post('/auth/logout'),
};