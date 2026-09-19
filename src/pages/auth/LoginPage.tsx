import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { googleLogo, bbikFullLogo } from '@/shared/assets';
import Input from '@/shared/components/Input';
import { login, demoLogin } from '@/features/auth/api/authApi';

const GOOGLE_LOGIN_URL = `${import.meta.env.VITE_API_BASE_URL}/auth/google/login`;

const schema = z.object({
  email: z.string().email('올바른 이메일을 입력해주세요'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onDemoLogin() {
    setIsDemoLoading(true);
    setServerError('');
    try {
      await demoLogin();
      navigate('/dashboard', { replace: true });
    } catch {
      setServerError('데모 로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsDemoLoading(false);
    }
  }

  async function onSubmit(values: FormValues) {
    setServerError('');
    try {
      await login(values.email, values.password);
      const isOnboarded = localStorage.getItem('onboarding_complete');
      navigate(isOnboarded ? '/dashboard' : '/onboarding', { replace: true });
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 401) {
        setServerError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        setServerError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  }

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="hidden w-1/2 flex-col justify-center bg-[#f0eeff] p-16 lg:flex">
        <div>
          <p className="mb-5 flex items-center gap-2 text-sm font-medium text-[#633DD4]">
            <span className="relative flex size-2 items-center justify-center">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#633DD4] opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[#633DD4]" />
            </span>
            게시 전, 한 번 더 안전하게
          </p>
          <h1 className="mb-5 text-[38px] leading-tight font-bold tracking-tight text-gray-900">
            콘텐츠를 올리면,
            <br />
            민감한 요소를 먼저 찾아드려요.
          </h1>
          <p className="max-w-sm text-[14px] leading-relaxed text-gray-500">
            영상, 이미지, 글을 함께 분석해 사람들이 불편하게 느낄 수 있는 지점과 확인이 필요한
            이유를 한눈에 정리해 모니터링 업무를 없애드립니다.
          </p>
        </div>

        {/* Decorative Cards */}
        <div className="relative h-80 items-center">
          <img
            src="/logo-picture.svg"
            alt=""
            className="h-85 w-full object-contain object-left-bottom"
          />

          {/* Result card */}
          <div className="absolute right-8 bottom-0 left-4 mx-25 rounded-2xl bg-white p-5 shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[15px] font-bold text-gray-900">검수 결과가 정리됐어요</span>
              <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
                확인 필요 3건
              </span>
            </div>
            <div className="space-y-2">
              <div className="bar-expand-1 h-3 w-full rounded-full bg-gray-100" />
              <div className="bar-expand-2 h-3 w-4/5 rounded-full bg-gray-100" />
              <div className="bar-expand-3 h-3 w-3/5 rounded-full bg-gray-100" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex w-full flex-col items-center justify-center bg-white px-8 lg:w-1/2">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="mb-10 flex items-center gap-3">
            <img src={bbikFullLogo} alt="삐빅" className="h-9" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <Input
              label="이메일"
              type="email"
              placeholder="name@company.com"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register('password')}
              error={errors.password?.message}
              rightElement={
                <Link to="/forgot-password" className="text-xs text-violet-600 hover:underline">
                  비밀번호 찾기
                </Link>
              }
            />

            {serverError && <p className="text-sm text-red-500">{serverError}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[#7047E8] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-60"
            >
              {isSubmitting ? '로그인 중...' : '로그인'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">또는</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google */}
          <button
            onClick={() => {
              window.location.href = GOOGLE_LOGIN_URL;
            }}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 py-3.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <img src={googleLogo} alt="Google" className="size-5" />
            Google로 계속하기
          </button>

          {/* Demo login */}
          <button
            onClick={onDemoLogin}
            disabled={isDemoLoading}
            className="mt-3 w-full rounded-xl bg-gray-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-black disabled:opacity-60"
          >
            {isDemoLoading ? '로그인 중...' : '데모로 시작하기'}
          </button>

          {/* Sign up */}
          <p className="mt-8 text-center text-sm text-gray-500">
            아직 계정이 없으신가요?{' '}
            <Link to="/signup" className="font-medium text-violet-600 hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
