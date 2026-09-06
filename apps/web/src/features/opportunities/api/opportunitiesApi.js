import { apiClient } from '@/lib/apiClient';

export const opportunitiesApi = {
  list: (filters) => apiClient.get('/opportunities', { params: filters }),
  get: (id) => apiClient.get(`/opportunities/${id}`),
  calculate: (id, amount) => apiClient.post(`/opportunities/${id}/calculate`, { amount }),
};