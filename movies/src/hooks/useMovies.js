import { useQuery } from '@tanstack/react-query';
import ApiClient from '../api/apiClient';

const moviesClient = new ApiClient('/movies');

const fetchMovies = async (params) => {
  const data = await moviesClient.getAll(params);
  return data;
};

export const useMovies = (params) => {
  return useQuery({
    queryKey: ['movies', params],
    queryFn: () => fetchMovies(params),
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};