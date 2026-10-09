import { apiClient as dashboardApi } from '@/shared/api/apiClient';
import { IS_DEV_MOCK } from '@/shared/lib/devMode';
import { mockContent, mockContents, mockAnalysis } from '@/shared/mocks/mockData';

export interface ContentAsset {
  id: string;
  content_type: 'IMAGE' | 'VIDEO';
  original_filename: string;
  mime_type: string;
  byte_size: number;
  download_url: string;
}

export interface Content {
  id: string;
  title: string;
  caption_text: string | null;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  type: string[];
  assets: ContentAsset[];
  created_at: string;
}

export async function getContents(page = 1): Promise<{ items: Content[] }> {
  if (IS_DEV_MOCK) return { items: [mockContent] };
  const { data } = await dashboardApi.get<{ items: Content[] }>('/contents', {
    params: { page },
  });
  return data;
}

export async function getContent(contentId: string): Promise<Content> {
  if (IS_DEV_MOCK) return mockContent;
  const { data } = await dashboardApi.get<Content>(`/contents/${contentId}`);
  return data;
}

export async function createContent(file: File | null, text: string): Promise<Content> {
  if (IS_DEV_MOCK)
    return {
      ...mockContent,
      id: `dev-content-${Date.now()}`,
      title: text || file?.name || '새 콘텐츠',
    };
  const formData = new FormData();
  if (file) formData.append('file', file);
  formData.append('text', text);

  const { data } = await dashboardApi.post<Content>('/contents', formData);
  return data;
}

export type AnalysisStatus = 'QUEUED' | 'ANALYZING' | 'COMPLETED' | 'FAILED';

export interface Evidence {
  id: string;
  layer: string;
  title: string;
  source_url: string;
  excerpt: string | null;
  provider: string | null;
}

export type FindingStatus = 'PENDING' | 'RESOLVED' | 'DISMISSED';

export interface Finding {
  id: string;
  type: string | string[];
  category_code: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  signal_type: string;
  reason: string;
  excerpt: string | null;
  status: FindingStatus;
  asset_id: string | null;
  start_ms: number | null;
  end_ms: number | null;
  evidences: Evidence[];
}

export interface Analysis {
  id: string;
  type: string[];
  status: AnalysisStatus;
  current_step: string;
  progress_percent: number;
  error_message: string | null;
  started_at: string;
  completed_at: string | null;
  findings: Finding[];
}

export async function getAnalysis(contentId: string): Promise<Analysis> {
  if (IS_DEV_MOCK) return mockAnalysis;
  const { data } = await dashboardApi.get<Analysis>(`/contents/${contentId}/analysis`);
  return data;
}

export async function resolveFinding(contentId: string, findingId: string): Promise<void> {
  if (IS_DEV_MOCK) return;
  await dashboardApi.patch(`/contents/${contentId}/findings/${findingId}`);
}

export async function deleteFinding(contentId: string, findingId: string): Promise<void> {
  if (IS_DEV_MOCK) return;
  await dashboardApi.delete(`/contents/${contentId}/findings/${findingId}`);
}

export interface ContentSummary {
  id: string;
  title: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  pending_findings_count: number;
  completed_at: string | null;
  created_at: string;
}

export interface PaginatedContents {
  items: ContentSummary[];
}

export async function getMyContents(page = 1): Promise<PaginatedContents> {
  if (IS_DEV_MOCK) return mockContents;
  const { data } = await dashboardApi.get<PaginatedContents>('/contents/me', {
    params: { page },
  });
  return data;
}
