import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { tokenStore } from '@/features/auth/store/tokenStore';
import { refreshToken } from '@/features/auth/api/authApi';
import { IS_DEV_BYPASS_AUTH } from '@/shared/lib/devMode';
import DashboardSidebar from '@/pages/dashboard/components/DashboardSidebar';

export default function DashboardLayout() {
  const [status, setStatus] = useState<'loading' | 'ok' | 'fail'>(() =>
    IS_DEV_BYPASS_AUTH || tokenStore.getToken() ? 'ok' : 'loading',
  );

  useEffect(() => {
    if (status !== 'loading') return;
    refreshToken()
      .then(() => setStatus('ok'))
      .catch(() => setStatus('fail'));
  }, [status]);

  if (status === 'loading') return null;
  if (status === 'fail') return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen bg-white">
      <DashboardSidebar />
      <main className="flex flex-1 flex-col overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
