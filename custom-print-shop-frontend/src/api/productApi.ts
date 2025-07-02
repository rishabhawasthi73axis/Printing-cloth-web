
import { fetchApi } from './apiClient';

// Product types
export interface Product {
  id: string;
  name: string;
  price: number;
  inventory: number;
  variants: string;
  colors: string;
  description?: string;
  category?: string;
  image?: string;
}

export interface CreateProductInput {
  name: string;
  price: number;
  inventory: number;
  variants: string;
  colors: string;
  description?: string;
  category?: string;
  image?: string;
}

// Product API methods
export const productApi = {
  // Get all products
  async getProducts(): Promise<Product[]> {
    return await fetchApi<Product[]>('/products');
  },

  // Get a product by ID
  async getProductById(id: string): Promise<Product> {
    return await fetchApi<Product>(`/products/${id}`);
  },

  // Add a new product
  async addProduct(product: CreateProductInput): Promise<Product> {
    return await fetchApi<Product>('/products', {
      method: 'POST',
      body: product,
    });
  },

  // Update a product
  async updateProduct(product: Product): Promise<Product> {
    return await fetchApi<Product>(`/products/${product.id}`, {
      method: 'PUT',
      body: product,
    });
  },

  // Delete a product
  async deleteProduct(id: string): Promise<boolean> {
    const response = await fetchApi<{ message: string }>(`/products/${id}`, {
      method: 'DELETE',
    });
    return !!response;
  }
};