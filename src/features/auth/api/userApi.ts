import { apiClient } from '@/shared/api/apiClient';
import { IS_DEV_MOCK } from '@/shared/lib/devMode';
import { mockUser, mockAudienceProfile } from '@/shared/mocks/mockData';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
}

export async function getMe(): Promise<UserProfile> {
  if (IS_DEV_MOCK) return mockUser;
  const { data } = await apiClient.get<UserProfile>('/users/me');
  return data;
}

export interface AudienceProfilePayload {
  content_categories: string[];
  audience_contexts: string[];
  account_purposes: string[];
}

export interface AudienceProfile extends AudienceProfilePayload {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export async function saveAudienceProfile(payload: AudienceProfilePayload): Promise<void> {
  if (IS_DEV_MOCK) return;
  await apiClient.put('/users/me/audience-profile', payload);
}

export async function getAudienceProfile(): Promise<AudienceProfile> {
  if (IS_DEV_MOCK) return mockAudienceProfile;
  const { data } = await apiClient.get<AudienceProfile>('/users/me/audience-profile');
  return data;
}
