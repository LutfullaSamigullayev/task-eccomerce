import { api } from '@/lib/axios';
import { ProductsResponse, Product, Category, ProductQueryParams } from './types';

// Barcha mahsulotlarni olish (sahifalash va saralash imkoniyati bilan)
export const getProducts = async (params?: ProductQueryParams): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>('/products', { params });
  return response.data;
};

// Mahsulotlarni qidirish
export const searchProducts = async (params: ProductQueryParams): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>('/products/search', { params });
  return response.data;
};

// Bitta mahsulotni ID orqali olish
export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

// Barcha kategoriyalarni olish
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>('/products/categories');
  return response.data;
};

// Muayyan kategoriya bo'yicha mahsulotlarni olish
export const getProductsByCategory = async (
  category: string,
  params?: ProductQueryParams
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(`/products/category/${category}`, { params });
  return response.data;
};