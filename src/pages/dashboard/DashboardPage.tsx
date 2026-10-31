import { Plus, Video, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateContent } from '@/features/dashboard/model/useCreateContent';
import { useGetMyContentsInfinite } from '@/features/dashboard/model/useGetMyContentsInfinite';
import type { ContentSummary } from '@/features/dashboard/api/contentsApi';

interface AttachedFile {
  id: number;
  file: File;
  previewUrl: string;
}

let nextId = 0;
const MAX_FILE_SIZE = 50 * 1024 * 1024;

function formatCardDate(dateString: string): string {
  const d = new Date(dateString);
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${month}월 ${day}일 - ${h}:${m}`;
}

function PendingCard({ item, onClick }: { item: ContentSummary; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex min-w-[200px] flex-1 flex-col rounded-2xl border border-gray-200 bg-white p-5 text-left transition-shadow hover:shadow-md"
    >
      <p className="mb-4 line-clamp-2 text-sm font-semibold text-gray-900">{item.title}</p>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-xs text-gray-400">{formatCardDate(item.created_at)}</span>
        <span className="text-xs font-semibold text-orange-500">
          확인 필요 {item.pending_findings_count}건
        </span>
      </div>
    </button>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [text, setText] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { mutate: createContent, isPending } = useCreateContent();
  const { data: contentsData } = useGetMyContentsInfinite();
  const allItems = contentsData?.pages.flatMap((p) => p.items) ?? [];
  const pendingItems = allItems.filter(
    (i) => i.status === 'COMPLETED' && i.pending_findings_count > 0,
  );
  const totalPendingFindings = pendingItems.reduce((sum, i) => sum + i.pending_findings_count, 0);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const oversized = files.find((f) => f.size > MAX_FILE_SIZE);
    if (oversized) {
      setUploadError('파일이 너무 큽니다. 50MB 이하 파일만 업로드할 수 있어요.');
      e.target.value = '';
      return;
    }
    setUploadError(null);
    const file = files[0];
    if (!file) return;
    setAttachedFiles((prev) => {
      prev.forEach((f) => URL.revokeObjectURL(f.previewUrl));
      return [{ id: nextId++, file, previewUrl: URL.createObjectURL(file) }];
    });
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
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-3xl">
        {/* 타이틀 */}
        <h1 className="mb-2 text-center text-[2rem] font-bold text-gray-900">
          새 콘텐츠를 모니터링 해볼까요?
        </h1>
        <p className="mb-8 text-center text-sm text-gray-400">
          이미지와 글을 함께 올리면 한 번에 분석해드려요.
        </p>

        {/* 업로드 섹션 */}
        <div className="mb-10 rounded-2xl border border-gray-200 bg-white px-7 py-5 shadow-sm max-md:px-5">
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

        {/* 판단 대기 항목 */}
        {pendingItems.length > 0 && (
          <div>
            <h2 className="mb-4 text-base font-bold text-gray-900">
              내 판단을 기다리는 항목{' '}
              <span className="text-orange-500">{totalPendingFindings}건</span>
              <span className="ml-1 font-normal text-gray-400">
                · 콘텐츠 {pendingItems.length}개
              </span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {pendingItems.map((item) => (
                <PendingCard
                  key={item.id}
                  item={item}
                  onClick={() => navigate('/dashboard/result', { state: { contentId: item.id } })}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
