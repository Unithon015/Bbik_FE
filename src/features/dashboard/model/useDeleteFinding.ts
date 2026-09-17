import { useMutation } from '@tanstack/react-query';
import { deleteFinding } from '../api/contentsApi';

export function useDeleteFinding() {
  return useMutation({
    mutationFn: ({ contentId, findingId }: { contentId: string; findingId: string }) =>
      deleteFinding(contentId, findingId),
  });
}
