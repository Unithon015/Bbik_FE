import { FileText, Plus, Video, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/shared/components/PageLayout';
import RecentItem from '@/pages/dashboard/components/RecentItem';
import { useCreateContent } from '@/features/dashboard/model/useCreateContent';
import { useGetMyContents } from '@/features/dashboard/model/useGetMyContents';
import type { ContentSummary } from '@/features/dashboard/api/contentsApi';

const STATUS_LABEL: Record<ContentSummary['status'], string> = {
  pending: '검수 중',
  completed: '분석 완료',
  failed: '실패',
};

const STATUS_COLOR: Record<ContentSummary['status'], string> = {
  pending: 'bg-amber-50 text-amber-600',
  completed: 'bg-green-50 text-green-600',
  failed: 'bg-red-50 text-red-500',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours < 12 ? '오전' : '오후';
  const displayHour = hours % 12 || 12;
  const timeStr = `${ampm} ${displayHour}:${minutes}`;
  if (dateOnly.getTime() === today.getTime()) return `오늘 ${timeStr}`;
  if (dateOnly.getTime() === yesterday.getTime()) return `어제 ${timeStr}`;
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function getAlert(item: ContentSummary): string {
  if (item.status === 'completed') {
    return item.pending_findings_count > 0 ? `확인 필요 ${item.pending_findings_count}건` : '';
  }
  if (item.status === 'pending') return '검수 진행 중';
  if (item.status === 'failed') return '분석 실패';
  return '';
}

interface AttachedFile {
  id: number;
  file: File;
  previewUrl: string;
}

let nextId = 0;

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export default function DashboardPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [text, setText] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const { mutate: createContent, isPending } = useCreateContent();
  const { data: myContents, isLoading: isContentsLoading } = useGetMyContents(page);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const oversized = files.find((f) => f.size > MAX_FILE_SIZE);
    if (oversized) {
      setUploadError(`파일이 너무 큽니다. 30MB 이하 파일만 업로드할 수 있어요.`);
      e.target.value = '';
      return;
    }
    setUploadError(null);
    const newItems = files.map((file) => ({
      id: nextId++,
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setAttachedFiles((prev) => [...prev, ...newItems]);
    e.target.value = '';
  }

  function handleRemove(id: number) {
    setAttachedFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((f) => f.id !== id);
    });
  }

  return (
    <PageLayout>
      {/* Upload section */}
      <h1 className="mb-1 text-2xl font-bold text-gray-900">새 콘텐츠를 모니터링 해볼까요?</h1>
      <p className="mb-6 text-sm text-gray-500">
        이미지·영상 파일과 게시할 글을 함께 올리면 한 번에 분석해드려요.
      </p>

      <div className="mb-12 rounded-2xl border border-gray-200 bg-white px-7 py-5 shadow-sm">
        <textarea
          placeholder="검수할 내용을 입력하거나 파일을 올려주세요."
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full resize-none text-sm text-gray-700 outline-none placeholder:text-gray-400"
          onInput={(e) => {
            const el = e.currentTarget;
            el.style.height = 'auto';
            el.style.height = `${Math.min(el.scrollHeight, 450)}px`;
          }}
        />

        {attachedFiles.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-3">
            {attachedFiles.map(({ id, file, previewUrl }) => {
              const isVideo = file.type.startsWith('video/');
              return (
                <div key={id} className="group relative">
                  {isVideo ? (
                    <div className="flex h-20 w-32 items-center justify-center rounded-xl bg-gray-100">
                      <Video className="size-6 text-gray-400" />
                      <span className="ml-1.5 max-w-[72px] truncate text-xs text-gray-500">
                        {file.name}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={previewUrl}
                      alt={file.name}
                      className="h-20 w-32 rounded-xl object-cover"
                    />
                  )}
                  <button
                    onClick={() => handleRemove(id)}
                    className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-gray-700 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-800"
          >
            <Plus className="size-4" />
            파일 추가
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            disabled={isPending || (attachedFiles.length === 0 && text.trim() === '')}
            onClick={() => {
              setUploadError(null);
              const file = attachedFiles[0]?.file ?? null;
              createContent(
                { file, text },
                {
                  onSuccess: (data) =>
                    navigate('/dashboard/analyzing', {
                      state: { contentId: data.id, content: data },
                    }),
                  onError: (err: unknown) => {
                    const status = (err as { response?: { status?: number } })?.response?.status;
                    if (status === 413)
                      setUploadError('파일이 너무 큽니다. 더 작은 파일을 사용해주세요.');
                    else setUploadError('업로드에 실패했어요. 다시 시도해주세요.');
                  },
                },
              );
            }}
            className="rounded-xl bg-[#7047E8] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPending ? '업로드 중...' : '분석 시작하기'}
          </button>
        </div>
        {uploadError && <p className="mt-3 text-sm text-red-500">{uploadError}</p>}
      </div>

      {/* Recent section */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">최근 검수한 콘텐츠</h2>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="divide-y divide-gray-200">
          {isContentsLoading && <p className="px-5 py-6 text-sm text-gray-400">불러오는 중...</p>}
          {!isContentsLoading && (!myContents || myContents.items.length === 0) && (
            <p className="px-5 py-6 text-sm text-gray-400">아직 검수한 콘텐츠가 없어요.</p>
          )}
          {myContents?.items.map((item) => (
            <RecentItem
              key={item.id}
              icon={<FileText className="size-5 text-violet-500" />}
              iconBg="bg-violet-50"
              title={item.title}
              meta=""
              date={formatDate(item.created_at)}
              alert={getAlert(item)}
              status={STATUS_LABEL[item.status]}
              statusColor={STATUS_COLOR[item.status]}
              onClick={() =>
                navigate(
                  item.status === 'completed' ? '/dashboard/result' : '/dashboard/analyzing',
                  { state: { contentId: item.id } },
                )
              }
            />
          ))}
        </div>
      </div>

      {!isContentsLoading && (page > 1 || (myContents?.items.length ?? 0) > 0) && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            이전
          </button>
          <span className="text-sm text-gray-500">{page}페이지</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={(myContents?.items.length ?? 0) < 10}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            다음
          </button>
        </div>
      )}
    </PageLayout>
  );
}
