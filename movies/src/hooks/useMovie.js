import { useQuery } from '@tanstack/react-query';
import ApiClient from '../api/apiClient';

const moviesClient = new ApiClient('/movies/');

const fetchMovie = async (id) => {
  const data = await moviesClient.getById(id);
  return data;
};

export const useMovie = (id) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovie(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};