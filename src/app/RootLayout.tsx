import { Outlet } from 'react-router-dom';
import Navbar from '@/shared/components/Navbar';
import { tokenStore } from '@/features/auth/store/tokenStore';

export default function RootLayout() {
  const isLoggedIn = !!tokenStore.getToken();

  return (
    <div className="font-pretendard flex min-h-screen flex-col bg-white">
      <Navbar isLoggedIn={isLoggedIn} />
      <Outlet />
    </div>
  );
}
