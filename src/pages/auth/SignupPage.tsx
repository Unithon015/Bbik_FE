import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { bbikFullLogo } from '@/shared/assets';
import Input from '@/shared/components/Input';
import { signup } from '@/features/auth/api/authApi';

const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  email: z.string().email('올바른 이메일을 입력해주세요'),
  password: z.string().min(15, '비밀번호는 15자 이상이어야 합니다'),
});

type FormValues = z.infer<typeof schema>;

export default function SignupPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setServerError('');
    try {
      await signup(values.email, values.password, values.name);
      navigate('/onboarding', { replace: true });
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 409) {
        setServerError('이미 가입된 이메일입니다.');
      } else if (status === 422) {
        setServerError('입력 형식을 확인해주세요.');
      } else {
        setServerError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
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

        <div className="relative h-80 items-center">
          <img
            src="/logo-picture.svg"
            alt=""
            className="h-85 w-full object-contain object-left-bottom"
          />
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
          <div className="mb-10 flex items-center gap-3">
            <img src={bbikFullLogo} alt="삐빅" className="h-9" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <Input
              label="이름"
              type="text"
              placeholder="홍길동"
              {...register('name')}
              error={errors.name?.message}
            />
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
              placeholder="15자 이상의 비밀번호를 입력해주세요"
              {...register('password')}
              error={errors.password?.message}
            />

            {serverError && <p className="text-sm text-red-500">{serverError}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[#7047E8] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-60"
            >
              {isSubmitting ? '가입 중...' : '회원가입'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="font-medium text-violet-600 hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
