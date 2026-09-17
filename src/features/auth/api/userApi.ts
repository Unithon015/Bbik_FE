import { apiClient } from '@/shared/api/apiClient';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
}

export async function getMe(): Promise<UserProfile> {
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
  await apiClient.put('/users/me/audience-profile', payload);
}

export async function getAudienceProfile(): Promise<AudienceProfile> {
  const { data } = await apiClient.get<AudienceProfile>('/users/me/audience-profile');
  return data;
}
