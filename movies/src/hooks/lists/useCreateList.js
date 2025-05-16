// src/hooks/lists/useCreateList.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ApiClient from '../../api/apiClient';

const apiClient = new ApiClient('/lists');

const createList = async (newListData) => {
  return await apiClient.create(newListData);
};

export const useCreateList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createList,
    onSuccess: () => {
      queryClient.invalidateQueries(['lists']);
    },
    onError: (error) => {
      console.error('Error creating list:', error);
    },
  });
};