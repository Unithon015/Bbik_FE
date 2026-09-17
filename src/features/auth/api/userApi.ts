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

export async function saveAudienceProfile(payload: AudienceProfilePayload): Promise<void> {
  await apiClient.put('/users/me/audience-profile', payload);
}
