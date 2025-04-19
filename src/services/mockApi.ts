import { Product } from '../types';
import { mockProducts } from '../data/mockProducts';
import { envConfig } from '../config/env';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate random errors (10% chance)
const simulateError = () => Math.random() < 0.1;

interface MockUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'user1@example.com',
    name: 'User One',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    email: 'user2@example.com',
    name: 'User Two',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
];

export const mockApi = {
  getProducts: async (): Promise<Product[]> => {
    await delay(1000); // Simulate 1 second delay
    if (simulateError()) {
      throw new Error('Failed to fetch products');
    }
    return mockProducts;
  },

  getProductById: async (id: string): Promise<Product> => {
    await delay(800); // Simulate 800ms delay
    if (simulateError()) {
      throw new Error('Failed to fetch product details');
    }
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  },

  rentProduct: async (id: string, days: number): Promise<{ success: boolean; message: string }> => {
    await delay(1500); // Simulate 1.5 second delay
    if (simulateError()) {
      throw new Error('Failed to process rental request');
    }
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    if (product.stock === 0) {
      throw new Error('Product is not available');
    }
    return {
      success: true,
      message: `Successfully rented ${product.name} for ${days} days`
    };
  },

  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      accessToken: 'mock-access-token',
      idToken: 'mock-id-token',
      user,
    };
  },

  googleLogin: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      accessToken: 'mock-google-access-token',
      idToken: 'mock-google-id-token',
      user: mockUsers[0],
    };
  },

  facebookLogin: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      accessToken: 'mock-facebook-access-token',
      idToken: 'mock-facebook-id-token',
      user: mockUsers[1],
    };
  },
}; 