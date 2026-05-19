import axios from 'axios';
import { useAuthStore } from '@/features/auth/store';

export const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — har so'rovga token qo'shadi
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — 401 xatosida token yangilaydi
let isRefreshing = false; // bir vaqtda bir marta refresh bo'lishi uchun
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

// Refresh kutayotgan so'rovlarni qayta yuboradi yoki rad etadi
const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((p) => (token ? p.resolve(token) : p.reject(error)));
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response, // muvaffaqiyatli javob — o'zgarishsiz
  async (error) => {
    const originalRequest = error.config;

    // 401 xato va bu so'rov ilgari retry qilinmagan bo'lsa
    if (error.response?.status === 401 && !originalRequest._retry) {
      const { refreshToken, setAuth, logout } = useAuthStore.getState();

      // Refresh token yo'q — tizimdan chiqish
      if (!refreshToken) {
        logout();
        return Promise.reject(error);
      }

      // Refresh jarayoni allaqachon boshlangan bo'lsa — navbatga qo'shamiz
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post('https://dummyjson.com/auth/refresh', {
          refreshToken,
          expiresInMins: 30,
        });

        const { accessToken, refreshToken: newRefreshToken } = res.data;
        const { user } = useAuthStore.getState();

        // Yangi tokenlarni saqlash
        setAuth(user!, accessToken, newRefreshToken);

        // Navbatdagi barcha kutgan so'rovlarga yangi token beramiz
        processQueue(null, accessToken);

        // Asl so'rovni yangi token bilan qayta yuboramiz
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh ham muvaffaqiyatsiz — logout
        processQueue(refreshError, null);
        logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);