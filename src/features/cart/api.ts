import { api } from '@/lib/axios';
import { Cart, CartsResponse } from './types';

// Barcha savatchalarni olish
export const getCarts = async (): Promise<CartsResponse> => {
  const response = await api.get<CartsResponse>('/carts');
  return response.data;
};

// ID bo'yicha bitta savatchani olish
export const getCartById = async (id: number): Promise<Cart> => {
  const response = await api.get<Cart>(`/carts/${id}`);
  return response.data;
};

// Foydalanuvchi ID'si bo'yicha savatchalarni olish
export const getCartsByUser = async (userId: number): Promise<CartsResponse> => {
  const response = await api.get<CartsResponse>(`/carts/user/${userId}`);
  return response.data;
};

// Yangi savatcha qo'shish (Serverda faqat simulyatsiya qilinadi)
export const addCart = async (userId: number, products: { id: number; quantity: number }[]): Promise<Cart> => {
  const response = await api.post<Cart>('/carts/add', { userId, products });
  return response.data;
};

// Savatchani yangilash
export const updateCart = async (cartId: number, products: { id: number; quantity: number }[]): Promise<Cart> => {
  const response = await api.put<Cart>(`/carts/${cartId}`, { merge: true, products });
  return response.data;
};

// Savatchani o'chirish
export const deleteCart = async (cartId: number): Promise<Cart> => {
  const response = await api.delete<Cart>(`/carts/${cartId}`);
  return response.data;
};