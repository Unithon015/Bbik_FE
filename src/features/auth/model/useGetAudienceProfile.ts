import { useQuery } from '@tanstack/react-query';
import { getAudienceProfile } from '../api/userApi';

export function useGetAudienceProfile() {
  return useQuery({
    queryKey: ['audienceProfile'],
    queryFn: getAudienceProfile,
    retry: false,
  });
}
