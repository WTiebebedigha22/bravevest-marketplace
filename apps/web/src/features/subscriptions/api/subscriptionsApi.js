import { apiClient } from '@/lib/apiClient';

export const subscriptionsApi = {
  list: () => apiClient.get('/subscriptions/me'),
  create: (data) => apiClient.post('/subscriptions', data),
  get: (id) => apiClient.get(`/subscriptions/${id}`),
  getAgreement: (id) => apiClient.get(`/subscriptions/${id}/agreement`),
};