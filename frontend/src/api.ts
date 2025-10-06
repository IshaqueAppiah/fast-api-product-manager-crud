import axios from 'axios';
import { Product } from './types';

// Use environment variable or default to localhost
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productApi = {
  // Get all products
  getAllProducts: () => api.get<Product[]>('/products'),
  
  // Get product by ID
  getProductById: (id: number) => api.get<Product>(`/product/${id}`),
  
  // Create new product
  createProduct: (product: Omit<Product, 'id'>) => api.post<Product>('/product', product),
  
  // Update product
  updateProduct: (id: number, product: Omit<Product, 'id'>) => 
    api.put<Product>(`/product/${id}`, product),
  
  // Delete product
  deleteProduct: (id: number) => api.delete<{message: string}>(`/product/${id}`),
  
  // Health check
  healthCheck: () => api.get<{message: string}>('/'),
};