import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { tokenStore } from '@/features/auth/store/tokenStore';

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('access_token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    tokenStore.setToken(token);
    const isOnboarded = localStorage.getItem('onboarding_complete');
    navigate(isOnboarded ? '/dashboard' : '/onboarding', { replace: true });
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-sm text-gray-400">로그인 처리 중...</p>
    </div>
  );
}
