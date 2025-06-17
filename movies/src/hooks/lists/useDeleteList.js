import { useMutation, useQueryClient } from '@tanstack/react-query';
import ApiClient from '../../api/apiClient';

// This function is called by the mutation
const deleteList = async ({ listId }) => {
  const apiClient = new ApiClient(`/lists/${listId}`);
  return await apiClient.delete();
};

export const useDeleteList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteList,
    onSuccess: () => {
      queryClient.invalidateQueries(['lists']); // Invalidate the list of all lists
    },
    onError: (error) => {
      console.error('Error deleting list:', error);
    },
  });
};

/*
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ApiClient from '../../api/apiClient';

// The async function to delete the list remains the same
const deleteList = async (listId) => {
  const apiClient = new ApiClient(`/lists/${listId}`);
  console.log("Hook's deleteList: Invalidating 'lists' query.");
  return await apiClient.delete();
};

// --- THE CORRECTED HOOK ---
export const useDeleteList = (options = {}) => { // 1. Accept an options object
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteList,


    onSuccess: (data, variables, context) => {
      console.log("Hook's onSuccess: Invalidating 'lists' query.");
   
      queryClient.invalidateQueries({ queryKey: ['lists'] });

      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error) => {
      if (options.onError) {
        options.onError(error);
      }
      console.error('Error deleting list:', error);
    },
    ...options,
  });
};*/