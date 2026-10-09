import { useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import bbikFullLogo from '@/shared/assets/bbik-full-logo.svg';
import { tokenStore } from '@/features/auth/store/tokenStore';
import { logout } from '@/features/auth/api/authApi';
import { useGetMyContentsInfinite } from '@/features/dashboard/model/useGetMyContentsInfinite';
import type { ContentSummary } from '@/features/dashboard/api/contentsApi';
import SidebarItem from './SidebarItem';

type Filter = 'all' | 'pending';

function groupItems(items: ContentSummary[]): { label: string; items: ContentSummary[] }[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let recentDate: Date | null = null;
  for (const item of items) {
    const d = new Date(item.created_at);
    const day = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    if (day.getTime() < today.getTime()) {
      if (!recentDate || day.getTime() > recentDate.getTime()) recentDate = day;
    }
  }

  const todayItems: ContentSummary[] = [];
  const recentItems: ContentSummary[] = [];
  const olderItems: ContentSummary[] = [];

  for (const item of items) {
    const d = new Date(item.created_at);
    const day = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    if (day.getTime() === today.getTime()) {
      todayItems.push(item);
    } else if (recentDate && day.getTime() === recentDate.getTime()) {
      recentItems.push(item);
    } else {
      olderItems.push(item);
    }
  }

  const groups: { label: string; items: ContentSummary[] }[] = [];
  if (todayItems.length > 0) groups.push({ label: '오늘', items: todayItems });
  if (recentItems.length > 0 && recentDate) {
    const label = `${recentDate.getMonth() + 1}월 ${recentDate.getDate()}일`;
    groups.push({ label, items: recentItems });
  }
  if (olderItems.length > 0) groups.push({ label: '이전', items: olderItems });
  return groups;
}

export default function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState<Filter>('all');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const user = tokenStore.getUser();
  const initial = (user?.name?.[0] ?? user?.email?.[0] ?? '').toUpperCase();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetMyContentsInfinite();
  const allItems = data?.pages.flatMap((p) => p.items) ?? [];

  const totalCount = allItems.length;
  const pendingCount = allItems.filter(
    (i) => i.status === 'COMPLETED' && i.pending_findings_count > 0,
  ).length;

  const filteredItems =
    filter === 'pending'
      ? allItems.filter((i) => i.status === 'COMPLETED' && i.pending_findings_count > 0)
      : allItems;

  const groups = groupItems(filteredItems);

  const activeContentId = (location.state as { contentId?: string } | null)?.contentId;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!node) return;
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage();
      });
      observerRef.current.observe(node);
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  /* ── 접힌 상태 ── */
  if (isCollapsed) {
    return (
      <aside className="flex h-full w-16 shrink-0 flex-col items-center border-r border-gray-100 bg-white transition-all duration-200">
        <div className="flex h-14 w-full items-center justify-center">
          <button
            onClick={() => setIsCollapsed(false)}
            className="flex size-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            title="사이드바 열기"
          >
            <PanelLeftOpen className="size-4" />
          </button>
        </div>

        <div className="pb-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex size-10 items-center justify-center rounded-xl bg-gray-900 text-white transition-colors hover:bg-gray-700"
            title="새 검수"
          >
            <Plus className="size-5" />
          </button>
        </div>

        <div className="mt-auto border-t border-gray-100 py-3">
          <button
            onClick={() => navigate('/mypage')}
            className="flex size-9 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700 transition-colors hover:bg-violet-200"
            title={user?.name ?? user?.email ?? ''}
          >
            {initial}
          </button>
        </div>
      </aside>
    );
  }

  /* ── 펼쳐진 상태 ── */
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-gray-100 bg-gray-50 transition-all duration-200">
      {/* 로고 + 토글 */}
      <div className="flex h-18 items-center justify-between px-4">
        <img src={bbikFullLogo} alt="삐빅" className="h-8" />
        <button
          onClick={() => setIsCollapsed(true)}
          className="flex size-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          title="사이드바 닫기"
        >
          <PanelLeftClose className="size-4" />
        </button>
      </div>

      {/* 새 검수 버튼 */}
      <div className="px-3 pb-3">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex w-full items-center gap-2 rounded-full bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
        >
          <Plus className="size-4" />새 검수
        </button>
      </div>

      {/* 필터 탭 */}
      <div className="flex items-center gap-1.5 px-3 pb-5">
        <button
          onClick={() => setFilter('all')}
          className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'border border-gray-900 text-gray-900'
              : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          전체 {totalCount}
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
            filter === 'pending'
              ? 'border border-gray-900 text-gray-900'
              : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          확인 필요 {pendingCount}
        </button>
      </div>

      {/* 콘텐츠 목록 */}
      <div className="flex-1 overflow-y-auto px-3">
        {groups.length === 0 && (
          <p className="px-3 py-4 text-xs text-gray-400">검수한 콘텐츠가 없어요.</p>
        )}
        {groups.map((group) => (
          <div key={group.label} className="mb-3">
            <p className="mb-1 px-2 text-xs font-medium text-gray-400">{group.label}</p>
            {group.items.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                isActive={activeContentId === item.id}
                onClick={() =>
                  navigate(
                    item.status === 'COMPLETED' ? '/dashboard/result' : '/dashboard/analyzing',
                    { state: { contentId: item.id } },
                  )
                }
              />
            ))}
          </div>
        ))}
        <div ref={sentinelRef} className="h-2" />
        {isFetchingNextPage && (
          <p className="py-2 text-center text-xs text-gray-400">불러오는 중...</p>
        )}
      </div>

      {/* 유저 정보 */}
      <div className="border-t border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/mypage')}
            className="flex size-9 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700 transition-colors hover:bg-violet-200"
            title={user?.name ?? user?.email ?? ''}
          >
            {initial}
          </button>
          <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-gray-700">
            로그아웃
          </button>
        </div>
      </div>
    </aside>
  );
}
