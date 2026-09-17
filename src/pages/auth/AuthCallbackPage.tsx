import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '@/features/auth/api/authApi';

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken()
      .then(() => {
        const isOnboarded = localStorage.getItem('onboarding_complete');
        navigate(isOnboarded ? '/dashboard' : '/onboarding', { replace: true });
      })
      .catch(() => {
        navigate('/login', { replace: true });
      });
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-sm text-gray-400">로그인 처리 중...</p>
    </div>
  );
}
