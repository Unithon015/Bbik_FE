import { useState } from 'react';
import { Mail, User, Pencil } from 'lucide-react';
import PageLayout from '@/shared/components/PageLayout';
import { useGetMe } from '@/features/auth/model/useGetMe';
import { useGetAudienceProfile } from '@/features/auth/model/useGetAudienceProfile';
import { saveAudienceProfile } from '@/features/auth/api/userApi';
import { useQueryClient } from '@tanstack/react-query';

const LABEL_MAP: Record<string, string> = {
  beauty_fashion: '뷰티·패션',
  health_fitness: '건강·운동',
  diet: '다이어트',
  food: '음식',
  parenting: '육아',
  gaming: '게임',
  finance_investing: '금융·투자',
  daily_life: '일상',
  entertainment_fandom: '엔터·팬덤',
  education_information: '교육·정보',
  travel: '여행',
  teens: '10대',
  twenties_thirties: '20~30대',
  forties_plus: '40대 이상',
  men: '남성',
  women: '여성',
  fitness_diet_interest: '운동·다이어트 관심층',
  gaming_fandom: '게임 팬덤',
  idol_interest: '아이돌 관심층',
  finance_investing_interest: '투자 관심층',
  general_public: '일반 대중',
  information: '정보 제공',
  promotion: '제품·서비스 홍보',
  review: '후기·리뷰',
  fan_community: '팬 커뮤니티',
  humor_satire: '유머·풍자',
};

const QUESTIONS = [
  {
    key: 'content_categories' as const,
    label: '콘텐츠 카테고리',
    max: 2,
    chips: [
      'beauty_fashion',
      'health_fitness',
      'diet',
      'food',
      'parenting',
      'gaming',
      'finance_investing',
      'daily_life',
      'entertainment_fandom',
      'education_information',
      'travel',
    ],
  },
  {
    key: 'audience_contexts' as const,
    label: '주 시청자',
    max: 2,
    chips: [
      'teens',
      'twenties_thirties',
      'forties_plus',
      'men',
      'women',
      'fitness_diet_interest',
      'parenting',
      'gaming_fandom',
      'idol_interest',
      'finance_investing_interest',
      'general_public',
    ],
  },
  {
    key: 'account_purposes' as const,
    label: '계정 목적',
    max: 2,
    chips: ['information', 'promotion', 'review', 'fan_community', 'daily_life', 'humor_satire'],
  },
];

function TagList({ values }: { values: string[] }) {
  if (!values.length) return <p className="text-sm text-gray-400">-</p>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {values.map((v) => (
        <span
          key={v}
          className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700"
        >
          {LABEL_MAP[v] ?? v}
        </span>
      ))}
    </div>
  );
}

export default function MyPage() {
  const queryClient = useQueryClient();
  const { data: user, isLoading: isUserLoading } = useGetMe();
  const { data: profile, isLoading: isProfileLoading } = useGetAudienceProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Record<string, string[]>>({});
  const [isSaving, setIsSaving] = useState(false);

  function startEdit() {
    setDraft({
      content_categories: profile?.content_categories ?? [],
      audience_contexts: profile?.audience_contexts ?? [],
      account_purposes: profile?.account_purposes ?? [],
    });
    setIsEditing(true);
  }

  function toggleChip(key: string, value: string, max: number) {
    setDraft((prev) => {
      const cur = prev[key] ?? [];
      if (cur.includes(value)) return { ...prev, [key]: cur.filter((v) => v !== value) };
      if (cur.length >= max) return prev;
      return { ...prev, [key]: [...cur, value] };
    });
  }

  async function handleSave() {
    setIsSaving(true);
    try {
      await saveAudienceProfile({
        content_categories: draft.content_categories ?? [],
        audience_contexts: draft.audience_contexts ?? [],
        account_purposes: draft.account_purposes ?? [],
      });
      await queryClient.invalidateQueries({ queryKey: ['audienceProfile'] });
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  }

  const isLoading = isUserLoading || isProfileLoading;

  return (
    <PageLayout>
      <h1 className="mb-1 text-2xl font-bold text-gray-900">마이페이지</h1>
      <p className="mb-8 text-sm text-gray-500">내 계정 정보를 확인할 수 있어요.</p>

      {isLoading ? (
        <p className="text-sm text-gray-400">불러오는 중...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {/* 계정 정보 */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="divide-y divide-gray-100">
              <div className="flex items-center gap-4 px-7 py-6 max-md:px-5">
                <div className="flex size-14 items-center justify-center rounded-full bg-violet-100 text-xl font-bold text-violet-700">
                  {(user?.name?.[0] ?? user?.email?.[0] ?? '').toUpperCase()}
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <div className="px-7 py-5 max-md:px-5">
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
          </div>

          {/* 시청자 프로필 */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="px-7 py-5 max-md:px-5">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  시청자 프로필
                </p>
                {!isEditing && (
                  <button
                    onClick={startEdit}
                    className="flex items-center gap-1.5 text-xs text-violet-600 hover:text-violet-800"
                  >
                    <Pencil className="size-3" />
                    수정
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-6">
                  {QUESTIONS.map((q) => (
                    <div key={q.key}>
                      <p className="mb-2 text-xs text-gray-500">
                        {q.label} (최대 {q.max}개)
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {q.chips.map((chip) => {
                          const isSelected = (draft[q.key] ?? []).includes(chip);
                          const isDisabled = !isSelected && (draft[q.key] ?? []).length >= q.max;
                          return (
                            <button
                              key={chip}
                              onClick={() => toggleChip(q.key, chip, q.max)}
                              disabled={isDisabled}
                              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                                isSelected
                                  ? 'border-[#7047E8] bg-[#7047E8] text-white'
                                  : isDisabled
                                    ? 'cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300'
                                    : 'border-gray-200 bg-white text-gray-600 hover:border-[#7047E8] hover:text-[#7047E8]'
                              }`}
                            >
                              {LABEL_MAP[chip]}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="rounded-xl bg-[#7047E8] px-5 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-60"
                    >
                      {isSaving ? '저장 중...' : '저장'}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      disabled={isSaving}
                      className="rounded-xl border border-gray-200 px-5 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-60"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  {QUESTIONS.map((q) => (
                    <div key={q.key}>
                      <p className="mb-2 text-xs text-gray-400">{q.label}</p>
                      <TagList values={profile?.[q.key] ?? []} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
