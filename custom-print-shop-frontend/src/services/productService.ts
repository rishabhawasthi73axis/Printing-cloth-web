
// Product management service using localStorage
import { ensurePriceInINR } from '@/utils/currencyFormatter';

export interface Product {
  id: string;
  name: string;
  price: number;
  inventory: number;
  variants: string;
  colors: string;
}

// Sample products with prices converted to INR
const sampleProducts: Product[] = [
  { 
    id: "1", 
    name: "T-Shirt", 
    price: ensurePriceInINR(19.99), 
    inventory: 150, 
    variants: "S, M, L, XL", 
    colors: "Black, White, Gray"
  },
  { 
    id: "2", 
    name: "Hoodie", 
    price: ensurePriceInINR(39.99), 
    inventory: 85, 
    variants: "S, M, L, XL", 
    colors: "Black, Navy Blue"
  },
  { 
    id: "3", 
    name: "Cap", 
    price: ensurePriceInINR(14.99), 
    inventory: 120, 
    variants: "One Size", 
    colors: "Black, White, Red"
  },
  { 
    id: "4", 
    name: "Long Sleeve Shirt", 
    price: ensurePriceInINR(24.99), 
    inventory: 95, 
    variants: "S, M, L, XL", 
    colors: "Black, White, Gray"
  }
];

// Initialize products in localStorage if not exists
const initializeProducts = (): void => {
  const products = localStorage.getItem('products');
  if (!products) {
    localStorage.setItem('products', JSON.stringify(sampleProducts));
  }
};

// Get all products
export const getProducts = (): Product[] => {
  initializeProducts();
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
};

// Get a product by ID
export const getProductById = (id: string): Product | undefined => {
  const products = getProducts();
  return products.find(product => product.id === id);
};

// Add a new product
export const addProduct = (product: Omit<Product, 'id'>): Product => {
  const products = getProducts();
  
  // Ensure price is in INR
  const priceInINR = ensurePriceInINR(product.price);
  
  const newProduct = {
    ...product,
    price: priceInINR,
    id: `product-${Date.now()}`
  };
  
  localStorage.setItem('products', JSON.stringify([...products, newProduct]));
  return newProduct;
};

// Update a product
export const updateProduct = (product: Product): Product | undefined => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === product.id);
  
  if (index === -1) {
    return undefined;
  }
  
  // Ensure price is in INR
  const priceInINR = ensurePriceInINR(product.price);
  const updatedProduct = {
    ...product,
    price: priceInINR
  };
  
  products[index] = updatedProduct;
  localStorage.setItem('products', JSON.stringify(products));
  
  return updatedProduct;
};

// Delete a product
export const deleteProduct = (id: string): boolean => {
  const products = getProducts();
  const newProducts = products.filter(product => product.id !== id);
  
  if (newProducts.length === products.length) {
    return false;
  }
  
  localStorage.setItem('products', JSON.stringify(newProducts));
  return true;
};