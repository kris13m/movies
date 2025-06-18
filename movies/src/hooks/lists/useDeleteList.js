import { useMutation, useQueryClient } from '@tanstack/react-query';
import ApiClient from '../../api/apiClient';

const deleteList = async ({ listId }) => {
  const apiClient = new ApiClient(`/lists/${listId}`);
  return await apiClient.delete();
};

export const useDeleteList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
    onError: (error) => {
      console.error('Error deleting list:', error);
    },
  });
};