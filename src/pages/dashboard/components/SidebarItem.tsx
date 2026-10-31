import type { ContentSummary } from '@/features/dashboard/api/contentsApi';

interface Props {
  item: ContentSummary;
  isActive: boolean;
  onClick: () => void;
}

function formatTime(dateString: string): string {
  const d = new Date(dateString);
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

export default function SidebarItem({ item, isActive, onClick }: Props) {
  const hasPending = item.status === 'COMPLETED' && item.pending_findings_count > 0;

  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors ${
        isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
      }`}
    >
      <span
        className={`flex-1 truncate text-sm ${
          hasPending ? 'font-semibold text-gray-900' : 'font-normal text-gray-700'
        }`}
      >
        {item.title}
      </span>
      {hasPending ? (
        <span className="ml-2 flex size-5 shrink-0 items-center justify-center rounded-full bg-orange-500 text-[11px] font-bold text-white">
          {item.pending_findings_count}
        </span>
      ) : (
        <span className="ml-2 shrink-0 text-xs text-gray-400">{formatTime(item.created_at)}</span>
      )}
    </button>
  );
}
