import axios from 'axios';
import { tokenStore } from '@/features/auth/store/tokenStore';
import { refreshToken } from '@/features/auth/api/authApi';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

let refreshing: Promise<void> | null = null;

apiClient.interceptors.request.use((config) => {
  const token = tokenStore.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }
    original._retry = true;

    if (!refreshing) {
      refreshing = refreshToken()
        .then(() => {})
        .catch(() => {
          tokenStore.clear();
          window.location.href = '/login';
        })
        .finally(() => {
          refreshing = null;
        });
    }

    await refreshing;

    const token = tokenStore.getToken();
    if (!token) return Promise.reject(error);

    original.headers.Authorization = `Bearer ${token}`;
    return apiClient(original);
  },
);
