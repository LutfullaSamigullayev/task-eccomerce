import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      
      setAuth: (user, accessToken, refreshToken) => {
        // Tokenni Cookie'ga yozamiz (middleware o'qishi uchun)
        Cookies.set('accessToken', accessToken, { expires: 1 }); // 1 kun saqlanadi
        Cookies.set('refreshToken', refreshToken, { expires: 7 }); // 7 kun saqlanadi
        set({ user, accessToken, refreshToken });
      },
      
      logout: () => {
        // Tizimdan chiqqanda Cookie'ni tozalaymiz
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        set({ user: null, accessToken: null, refreshToken: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);