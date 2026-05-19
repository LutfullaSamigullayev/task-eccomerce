import { api } from '@/lib/axios';

// Login so'rovi
export const loginUser = async (credentials: Record<string, string>) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Joriy foydalanuvchini olish (Token Axios orqali avtomatik ketadi)
export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Tokenni yangilash
export const refreshUserToken = async (refreshToken: string) => {
  const response = await api.post('/auth/refresh', {
    refreshToken,
    expiresInMins: 30,
  });
  return response.data;
};