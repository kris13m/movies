import { useQuery } from '@tanstack/react-query';
import ApiClient from '../../../api/apiClient';

const listsClient = new ApiClient('/lists');

const fetchList = async (id) => {
  const data = await listsClient.getById(id);
  return data;
};

export const useList = (id) => {
  return useQuery({
    queryKey: ['list', id],
    queryFn: () => fetchList(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};