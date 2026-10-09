import type { UserProfile, AudienceProfile } from '@/features/auth/api/userApi';
import type { Content, PaginatedContents, Analysis } from '@/features/dashboard/api/contentsApi';

export const mockUser: UserProfile = {
  id: 'dev-user-001',
  email: 'dev@bbik.app',
  name: '테스트 유저',
};

export const mockAudienceProfile: AudienceProfile = {
  id: 'dev-audience-001',
  user_id: 'dev-user-001',
  content_categories: ['뷰티', '패션'],
  audience_contexts: ['10대', '20대 초반'],
  account_purposes: ['브랜드 홍보', '제품 리뷰'],
  created_at: '2024-01-15T09:00:00Z',
  updated_at: '2024-03-10T14:30:00Z',
};

// 사진 + 글
export const mockContentImageText: Content = {
  id: 'dev-content-001',
  title: '신제품 립스틱 리뷰',
  caption_text:
    '이번에 새로 나온 OO 브랜드 립스틱 써봤어요! 발색이 정말 예쁘고 지속력도 좋더라고요 ✨ #뷰티 #립스틱',
  status: 'COMPLETED',
  type: ['IMAGE', 'TEXT'],
  assets: [
    {
      id: 'dev-asset-001',
      content_type: 'IMAGE',
      original_filename: 'lipstick_review.jpg',
      mime_type: 'image/jpeg',
      byte_size: 2097152,
      download_url: 'https://example.com/dev/lipstick_review.jpg',
    },
  ],
  created_at: '2024-03-10T10:00:00Z',
};

// 글만
export const mockContentTextOnly: Content = {
  id: 'dev-content-002',
  title: '봄 코디 추천',
  caption_text:
    '올봄 코디 추천드려요! OO 브랜드 재킷이랑 청바지 조합 너무 예쁘지 않나요? 요즘 제일 자주 입는 조합이에요 🌸',
  status: 'COMPLETED',
  type: ['TEXT'],
  assets: [],
  created_at: '2024-03-08T13:30:00Z',
};

// 사진만
export const mockContentImageOnly: Content = {
  id: 'dev-content-003',
  title: '스킨케어 루틴 컷',
  caption_text: null,
  status: 'PENDING',
  type: ['IMAGE'],
  assets: [
    {
      id: 'dev-asset-003',
      content_type: 'IMAGE',
      original_filename: 'skincare_routine.jpg',
      mime_type: 'image/jpeg',
      byte_size: 3145728,
      download_url: 'https://example.com/dev/skincare_routine.jpg',
    },
  ],
  created_at: '2024-03-12T09:00:00Z',
};

export const mockContent = mockContentImageText;

export const mockContents: PaginatedContents = {
  items: [
    {
      id: 'dev-content-001',
      title: '신제품 립스틱 리뷰',
      status: 'COMPLETED',
      pending_findings_count: 2,
      completed_at: '2024-03-10T10:30:00Z',
      created_at: '2024-03-10T10:00:00Z',
    },
    {
      id: 'dev-content-002',
      title: '봄 코디 추천',
      status: 'COMPLETED',
      pending_findings_count: 0,
      completed_at: '2024-03-08T14:00:00Z',
      created_at: '2024-03-08T13:30:00Z',
    },
    {
      id: 'dev-content-003',
      title: '스킨케어 루틴 컷',
      status: 'PENDING',
      pending_findings_count: 0,
      completed_at: null,
      created_at: '2024-03-12T09:00:00Z',
    },
  ],
};

export const mockAnalysis: Analysis = {
  id: 'dev-analysis-001',
  type: ['IMAGE', 'TEXT'],
  status: 'COMPLETED',
  current_step: '분석 완료',
  progress_percent: 100,
  error_message: null,
  started_at: '2024-03-10T10:01:00Z',
  completed_at: '2024-03-10T10:30:00Z',
  findings: [
    {
      id: 'dev-finding-001',
      type: '광고 표시 누락',
      category_code: 'AD_DISCLOSURE',
      priority: 'HIGH',
      signal_type: 'MISSING_DISCLOSURE',
      reason:
        '유료 광고임에도 불구하고 게시물에 광고 표시(#광고, #협찬 등)가 없습니다. 공정거래위원회 지침에 따라 표시가 필요합니다.',
      excerpt: '이번에 새로 나온 OO 브랜드 립스틱 써봤어요!',
      status: 'PENDING',
      asset_id: 'dev-asset-001',
      start_ms: null,
      end_ms: null,
      evidences: [
        {
          id: 'dev-evidence-001',
          layer: '법률',
          title: '추천·보증 등에 관한 표시·광고 심사지침',
          source_url: 'https://www.ftc.go.kr',
          excerpt: '경제적 이해관계가 있는 경우 광고 여부를 명확히 표시해야 합니다.',
          provider: '공정거래위원회',
        },
      ],
    },
    {
      id: 'dev-finding-002',
      type: '효능 과장 표현',
      category_code: 'EXAGGERATED_CLAIM',
      priority: 'MEDIUM',
      signal_type: 'OVERSTATEMENT',
      reason:
        '"지속력도 좋더라고요"는 구체적인 근거 없이 제품 효능을 단정하는 표현으로, 과장 광고로 분류될 수 있습니다.',
      excerpt: '발색이 정말 예쁘고 지속력도 좋더라고요',
      status: 'PENDING',
      asset_id: null,
      start_ms: null,
      end_ms: null,
      evidences: [],
    },
  ],
};
