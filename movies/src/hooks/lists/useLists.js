import { useQuery } from '@tanstack/react-query';
import ApiClient from '../../api/apiClient';

const listsClient = new ApiClient('/lists');

const fetchLists = async (params) => {
  const data = await listsClient.getAll(params);
  return data;
};

export const useLists = (params) => {
  return useQuery({
    queryKey: ['lists'],
    queryFn: () => fetchLists(params),
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};