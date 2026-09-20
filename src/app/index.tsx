import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from '@/app/Router';
import { IS_DEV_BYPASS_AUTH } from '@/shared/lib/devMode';

// dev에서는 API가 막혀 있어도 로딩 화면에 갇히지 않도록 재시도를 끈다.
const queryClient = new QueryClient(
  IS_DEV_BYPASS_AUTH ? { defaultOptions: { queries: { retry: false } } } : undefined,
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
