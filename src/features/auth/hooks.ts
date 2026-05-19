import { useMutation } from '@tanstack/react-query';
import { loginUser } from './api';
import { useAuthStore } from './store';

export const useLogin = () => {
  // Zustand omboridan ma'lumot saqlash funksiyasini chaqiramiz
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: loginUser, // api.ts dagi funksiya
    onSuccess: (data) => {
      // So'rov muvaffaqiyatli bo'lsa, tokenni darhol xotiraga yozamiz
      setAuth(data, data.accessToken, data.refreshToken);
    },
    onError: (error) => {
      // Xatoliklarni kuzatish (UI'da toast message chiqarish uchun)
      console.error("Login xatoligi:", error);
    }
  });
};