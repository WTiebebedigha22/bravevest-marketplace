import { apiClient } from '@/lib/apiClient';
import { firebaseApp } from '@/lib/firebase';

export const opportunitiesApi = {
  list: async () => {
    const [{ listProducts, connectorConfig }, { getDataConnect }] = await Promise.all([
      import('@dataconnect/generated'),
      import('firebase/data-connect'),
    ]);
    const dataConnect = getDataConnect(firebaseApp, connectorConfig);
    const response = await listProducts(dataConnect);
    return response.opportunities;
  },
  get: (id) => apiClient.get(`/opportunities/${id}`),
  calculate: (id, amount) => apiClient.post(`/opportunities/${id}/calculate`, { amount }),
};