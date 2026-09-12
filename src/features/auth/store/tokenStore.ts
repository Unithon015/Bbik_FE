export interface AuthUser {
  id?: string;
  email: string;
  name: string;
}

let accessToken: string | null = null;
let currentUser: AuthUser | null = null;

export const tokenStore = {
  getToken: () => accessToken,
  setToken: (token: string) => {
    accessToken = token;
  },
  getUser: () => currentUser,
  setUser: (user: AuthUser) => {
    currentUser = user;
  },
  clear: () => {
    accessToken = null;
    currentUser = null;
  },
};
