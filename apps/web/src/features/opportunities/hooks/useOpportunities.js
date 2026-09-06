import { useQuery } from '@tanstack/react-query';
import { opportunitiesApi } from '../api/opportunitiesApi';

export function useOpportunities(filters = {}) {
  return useQuery({
    queryKey: ['opportunities', filters],
    queryFn: () => opportunitiesApi.list(filters),
  });
}

export function useOpportunity(id) {
  return useQuery({
    queryKey: ['opportunity', id],
    queryFn: () => opportunitiesApi.get(id),
    enabled: !!id,
  });
}