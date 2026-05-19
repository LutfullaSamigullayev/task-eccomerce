import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, {
    message: "Foydalanuvchi nomi kamida 3 ta belgidan iborat bo'lishi kerak.",
  }),
  password: z.string().min(6, {
    message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak.",
  }),
});

// TypeScript uchun avtomatik tur (type) yaratib olamiz
export type LoginFormValues = z.infer<typeof loginSchema>;