import { useMutation, useQueryClient } from '@tanstack/react-query';
import ApiClient from '../../../api/apiClient';

// This function is called by the mutation
const deleteMovie = async ({ listId, movieId }) => {
  const apiClient = new ApiClient(`/lists/${listId}/movies/${movieId}`);
  return await apiClient.delete();
};

export const useDeleteMovieFromList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMovie,
    onSuccess: (_data, { listId }) => {
      queryClient.invalidateQueries(['list', listId]);
    },
    onError: (error) => {
      console.error('Error deleting movie from list:', error);
    },
  });
};