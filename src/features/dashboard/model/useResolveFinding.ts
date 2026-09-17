import { useMutation } from '@tanstack/react-query';
import { resolveFinding } from '../api/contentsApi';

export function useResolveFinding() {
  return useMutation({
    mutationFn: ({ contentId, findingId }: { contentId: string; findingId: string }) =>
      resolveFinding(contentId, findingId),
  });
}
