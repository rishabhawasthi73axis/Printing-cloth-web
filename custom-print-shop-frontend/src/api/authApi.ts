
import { fetchApi } from './apiClient';

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
}

// Auth API methods
export const authApi = {
  // Login user
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return await fetchApi<AuthResponse>('/users/login', {
      method: 'POST',
      body: credentials,
    });
  },

  // Register user
  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    return await fetchApi<RegisterResponse>('/users', {
      method: 'POST',
      body: userData,
    });
  },

  // Logout user
  async logout(): Promise<void> {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  },

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    try {
      const userData = localStorage.getItem('currentUser');
      
      if (!userData) {
        // If no user data in localStorage, try to fetch from API
        const user = await fetchApi<User>('/users/profile');
        return user;
      }
      
      return JSON.parse(userData);
    } catch (error) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      return null;
    }
  }
};