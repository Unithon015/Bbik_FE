import { Mail, User } from 'lucide-react';
import PageLayout from '@/shared/components/PageLayout';
import { useGetMe } from '@/features/auth/model/useGetMe';

export default function MyPage() {
  const { data: user, isLoading } = useGetMe();

  return (
    <PageLayout>
      <h1 className="mb-1 text-2xl font-bold text-gray-900">마이페이지</h1>
      <p className="mb-8 text-sm text-gray-500">내 계정 정보를 확인할 수 있어요.</p>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        {isLoading ? (
          <p className="px-7 py-8 text-sm text-gray-400">불러오는 중...</p>
        ) : (
          <div className="divide-y divide-gray-100">
            <div className="flex items-center gap-4 px-7 py-6">
              <div className="flex size-14 items-center justify-center rounded-full bg-violet-100 text-xl font-bold text-violet-700">
                {(user?.name?.[0] ?? user?.email?.[0] ?? '').toUpperCase()}
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>

            <div className="px-7 py-5">
              <p className="mb-4 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                계정 정보
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="size-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">이름</p>
                    <p className="text-sm font-medium text-gray-900">{user?.name ?? '-'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="size-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">이메일</p>
                    <p className="text-sm font-medium text-gray-900">{user?.email ?? '-'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
