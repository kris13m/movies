import { useMutation, useQueryClient } from '@tanstack/react-query';
import ApiClient from '../../api/apiClient';

const updateList = async ({ id, params }) => {
  const apiClient = new ApiClient(`/lists/${id}/movies`);
  return await apiClient.create(params);
};

export const useAddMovieToList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateList,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(['list', variables.id]);
    },
    onError: (error) => {
      console.error('Error adding movie to list:', error);
    },
  });
};