export interface AuthUser {
  id?: string;
  email: string;
  name: string;
}

const TOKEN_KEY = 'access_token';
const USER_KEY = 'auth_user';

let accessToken: string | null = localStorage.getItem(TOKEN_KEY);
let currentUser: AuthUser | null = (() => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
})();

export const tokenStore = {
  getToken: () => accessToken,
  setToken: (token: string) => {
    accessToken = token;
    localStorage.setItem(TOKEN_KEY, token);
  },
  getUser: () => currentUser,
  setUser: (user: AuthUser) => {
    currentUser = user;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clear: () => {
    accessToken = null;
    currentUser = null;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
