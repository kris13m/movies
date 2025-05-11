import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/apiClient';

const apiclient = new apiClient("/movies");

function useBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });
}

export default useBooks;