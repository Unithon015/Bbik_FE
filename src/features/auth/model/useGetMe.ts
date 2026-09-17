import { useQuery } from '@tanstack/react-query';
import { getMe } from '../api/userApi';

export function useGetMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });
}
