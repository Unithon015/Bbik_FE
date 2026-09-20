import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '@/shared/components/Navbar';
import { tokenStore } from '@/features/auth/store/tokenStore';
import { refreshToken } from '@/features/auth/api/authApi';
import { IS_DEV_BYPASS_AUTH } from '@/shared/lib/devMode';

export default function ProtectedLayout() {
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
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar isLoggedIn />
      <Outlet />
    </div>
  );
}
