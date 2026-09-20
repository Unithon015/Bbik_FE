import { ChevronRight } from 'lucide-react';

interface RecentItemProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  meta: string;
  date: string;
  alert: string;
  status: string;
  statusColor: string;
  onClick?: () => void;
}

export default function RecentItem({
  icon,
  iconBg,
  title,
  meta,
  date,
  alert,
  status,
  statusColor,
  onClick,
}: RecentItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-4 px-5 py-4 hover:bg-gray-50 max-md:grid max-md:grid-cols-[44px_1fr_auto] max-md:gap-x-3 max-md:gap-y-1 max-md:px-4"
    >
      <div
        className={`flex size-11 shrink-0 items-center justify-center rounded-xl max-md:row-span-2 ${iconBg}`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-[2] max-md:col-start-2">
        <p className="mb-1 truncate text-[16px] font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-400">{meta}</p>
      </div>
      <div className="flex-1 text-xs text-gray-400 max-md:col-start-2 max-md:row-start-2">
        {date}
      </div>
      <div className="flex-1 text-sm font-medium text-violet-600 max-md:col-start-3 max-md:row-start-2 max-md:text-right max-md:text-xs">
        {alert}
      </div>
      <div className="flex-1 max-md:col-start-3 max-md:row-start-1 max-md:text-right">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor}`}>
          {status}
        </span>
      </div>
      <ChevronRight className="size-4 text-gray-300 max-md:hidden" />
    </div>
  );
}
