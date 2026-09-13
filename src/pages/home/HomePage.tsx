import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenStore } from '@/features/auth/store/tokenStore';
import HeroScrollSection from './component/HeroScrollSection';
import PurposeSection from './component/PurposeSection';
import ServiceSection from './component/ServiceSection';
import PrinciplesSection from './component/PrinciplesSection';
import HowItWorksSection from './component/HowItWorksSection';
import CtaBannerSection from './component/CtaBannerSection';
import FooterSection from './component/FooterSection';

function parseJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  } catch {
    return null;
  }
}

export default function HomePage() {
  const navigate = useNavigate();
  const isLoggedIn = !!tokenStore.getToken();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (!token) return;

    tokenStore.setToken(token);

    const payload = parseJwtPayload(token);
    if (payload) {
      const email = (payload.email ?? '') as string;
      const name = (payload.name ?? email) as string;
      tokenStore.setUser({ email, name });
    }

    const isOnboarded = localStorage.getItem('onboarding_complete');
    navigate(isOnboarded ? '/dashboard' : '/onboarding', { replace: true });
  }, [navigate]);

  return (
    <main>
      <HeroScrollSection isLoggedIn={isLoggedIn} />
      <PurposeSection />
      <ServiceSection />
      <PrinciplesSection />
      <HowItWorksSection />
      <CtaBannerSection isLoggedIn={isLoggedIn} />
      <FooterSection isLoggedIn={isLoggedIn} />
    </main>
  );
}
