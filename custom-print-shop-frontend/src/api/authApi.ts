
import { fetchApi } from './apiClient';

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface LoginRequest {
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
    console.log("Login attempt with:", credentials.email);
    
    // For the demo or when backend is unavailable, use local authentication
    if (process.env.NODE_ENV === 'development' || window.location.hostname.includes('lovable.app')) {
      // Check if it's the demo admin account
      if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
        console.log("Admin demo login successful");
        const adminUser = {
          id: 'admin-1',
          name: 'Admin User',
          email: 'admin@example.com',
          isAdmin: true
        };
        
        const mockResponse = {
          user: adminUser,
          token: 'admin-demo-token'
        };
        
        return Promise.resolve(mockResponse);
      }
      
      // Check if it's the demo user account
      if (credentials.email === 'user@example.com' && credentials.password === 'user123') {
        console.log("User demo login successful");
        const regularUser = {
          id: 'user-1',
          name: 'Regular User',
          email: 'user@example.com',
          isAdmin: false
        };
        
        const mockResponse = {
          user: regularUser,
          token: 'user-demo-token'
        };
        
        return Promise.resolve(mockResponse);
      }
      
      // If no match found in demo credentials
      throw new Error("Invalid credentials");
    }
    
    try {
      // Try to reach backend API
      return await fetchApi<AuthResponse>('/users/login', {
        method: 'POST',
        body: credentials,
      });
    } catch (error) {
      console.error("Login API error:", error);
      throw new Error("Invalid credentials or server unavailable");
    }
  },

  // Admin login
  async adminLogin(credentials: LoginRequest): Promise<AuthResponse> {
    console.log("Admin login attempt with:", credentials.email);
    
    // For the demo or when backend is unavailable
    if (process.env.NODE_ENV === 'development' || window.location.hostname.includes('lovable.app')) {
      // Only allow the demo admin account
      if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
        console.log("Admin demo login successful");
        const adminUser = {
          id: 'admin-1',
          name: 'Admin User',
          email: 'admin@example.com',
          isAdmin: true
        };
        
        const mockResponse = {
          user: adminUser,
          token: 'admin-demo-token'
        };
        
        localStorage.setItem('authToken', mockResponse.token);
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        
        return Promise.resolve(mockResponse);
      }
      
      // If not admin credentials
      throw new Error("Invalid admin credentials");
    }
    
    try {
      // Try to reach admin-specific backend API
      return await fetchApi<AuthResponse>('/users/admin/auth', {
        method: 'POST',
        body: credentials,
      });
    } catch (error) {
      console.error("Admin login API error:", error);
      throw new Error("Invalid admin credentials or server unavailable");
    }
  },

  // Register user
  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    // Handle demo mode or when backend is unavailable
    if (process.env.NODE_ENV === 'development' || window.location.hostname.includes('lovable.app')) {
      // Mock successful registration
      return Promise.resolve({
        success: true,
        message: 'Registration successful'
      });
    }
    
    try {
      return await fetchApi<RegisterResponse>('/users', {
        method: 'POST',
        body: userData,
      });
    } catch (error) {
      console.error("Register API error:", error);
      throw new Error("Registration failed or server unavailable");
    }
  },

  // Logout user
  async logout(): Promise<void> {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    return Promise.resolve();
  },

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    // First check local storage
    try {
      const userData = localStorage.getItem('currentUser');
      
      if (userData) {
        return JSON.parse(userData);
      }
      
      // If no local data, try API
      const token = localStorage.getItem('authToken');
      if (!token) {
        return null;
      }
      
      try {
        // Only make API call if we have a token
        const user = await fetchApi<User>('/users/profile');
        return user;
      } catch (error) {
        // Clear invalid auth data
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        return null;
      }
    } catch (error) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      return null;
    }
  }
};