import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './RootLayout';
import ProtectedLayout from './ProtectedLayout';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/auth/LoginPage';
import SignupPage from '@/pages/auth/SignupPage';
import OnboardingPage from '@/pages/auth/OnboardingPage';
import AuthCallbackPage from '@/pages/auth/AuthCallbackPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import AnalyzingPage from '@/pages/dashboard/AnalyzingPage';
import ResultPage from '@/pages/dashboard/ResultPage';
import MyPage from '@/pages/mypage/MyPage';
import NotFoundPage from '@/pages/error/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    path: '/auth/callback',
    element: <AuthCallbackPage />,
  },
  {
    path: '/dashboard',
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'analyzing', element: <AnalyzingPage /> },
      { path: 'result', element: <ResultPage /> },
    ],
  },
  {
    path: '/mypage',
    element: <ProtectedLayout />,
    children: [{ index: true, element: <MyPage /> }],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
