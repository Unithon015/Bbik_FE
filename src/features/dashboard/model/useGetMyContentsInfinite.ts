import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyContents } from '../api/contentsApi';

export function useGetMyContentsInfinite() {
  return useInfiniteQuery({
    queryKey: ['myContentsInfinite'],
    queryFn: ({ pageParam }) => getMyContents(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.items.length < 10 ? undefined : allPages.length + 1,
  });
}
