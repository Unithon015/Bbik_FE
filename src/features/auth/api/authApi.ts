import axios from 'axios';
import { tokenStore, type AuthUser } from '../store/tokenStore';

const BASE = import.meta.env.VITE_API_BASE_URL;

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: AuthUser & { id: string };
}

function storeAuth(data: AuthResponse) {
  tokenStore.setToken(data.access_token);
  tokenStore.setUser(data.user);
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const { data } = await axios.post<AuthResponse>(`${BASE}/auth/login`, { email, password });
  storeAuth(data);
  return data;
}

export async function signup(email: string, password: string, name: string): Promise<AuthResponse> {
  const { data } = await axios.post<AuthResponse>(`${BASE}/auth/signup`, {
    email,
    password,
    name,
  });
  storeAuth(data);
  return data;
}

export async function refreshToken(): Promise<AuthResponse> {
  const { data } = await axios.post<AuthResponse>(`${BASE}/auth/refresh`, null, {
    withCredentials: true,
  });
  storeAuth(data);
  return data;
}

export async function logout(): Promise<void> {
  await axios.post(`${BASE}/auth/logout`, null, { withCredentials: true }).catch(() => {});
  tokenStore.clear();
}
