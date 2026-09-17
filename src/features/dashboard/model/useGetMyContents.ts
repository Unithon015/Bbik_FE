import { useQuery } from '@tanstack/react-query';
import { getMyContents } from '../api/contentsApi';

export function useGetMyContents(page = 1) {
  return useQuery({
    queryKey: ['myContents', page],
    queryFn: () => getMyContents(page),
  });
}
