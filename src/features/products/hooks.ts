import { useQuery } from '@tanstack/react-query';
import { 
  getProducts, 
  getProductById, 
  getCategories, 
  getProductsByCategory, 
  searchProducts 
} from './api';
import { ProductQueryParams } from './types';

// Barcha mahsulotlarni olish uchun ilgak
export const useProducts = (params?: ProductQueryParams) => {
  return useQuery({
    queryKey: ['products', params], // Kesh kaliti parametrlar bilan birga
    queryFn: () => getProducts(params),
  });
};

// Bitta mahsulotni olish uchun ilgak
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id, // Faqat ID mavjud bo'lgandagina API'ga so'rov ketadi
  });
};

// Barcha kategoriyalarni olish uchun ilgak
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60, // Kategoriyalar tez o'zgarmasligi uchun 1 soat keshda saqlaymiz
  });
};

// Kategoriya bo'yicha mahsulotlarni olish uchun ilgak
export const useProductsByCategory = (category: string, params?: ProductQueryParams) => {
  return useQuery({
    queryKey: ['products', 'category', category, params],
    queryFn: () => getProductsByCategory(category, params),
    enabled: !!category, 
  });
};

// Mahsulotlarni qidirish uchun ilgak
export const useSearchProducts = (params: ProductQueryParams) => {
  return useQuery({
    queryKey: ['products', 'search', params],
    queryFn: () => searchProducts(params),
    enabled: !!params.q, // Faqat qidiruv so'zi bo'sh bo'lmaganda ishga tushadi
  });
};