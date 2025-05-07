
import axios from 'axios';

// Base API client for connecting to the backend
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token on protected routes
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors gracefully without redirecting automatically
    if (error.response) {
      console.log('API error response:', error.response.status, error.response.data);
      
      // Only handle unauthorized errors with redirection if not on login pages
      const isLoginPage = window.location.pathname.includes('/login');
      
      if (error.response.status === 401 && !isLoginPage) {
        console.log('Unauthorized access detected, clearing auth data');
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        
        // Check if we're on an admin route
        const isAdminRoute = window.location.pathname.startsWith('/admin');
        if (isAdminRoute) {
          window.location.href = '/admin/login';
        }
      }
      
      if (error.response.status === 403 && !isLoginPage) {
        console.log('Forbidden access detected');
        // Forbidden - typically means not admin
        const isAdminRoute = window.location.pathname.startsWith('/admin');
        if (isAdminRoute) {
          window.location.href = '/';
        }
      }
    }
    
    // Always propagate the error to allow components to handle it
    return Promise.reject(error);
  }
);

// Export the fetchApi function that uses axios
export async function fetchApi<T>(
  endpoint: string,
  options: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
  } = {}
): Promise<T> {
  try {
    const { method = 'GET', body, headers = {} } = options;
    
    const config = {
      headers,
      method,
      data: body,
    };

    const response = await apiClient(endpoint, config);
    return response.data;
  } catch (error: any) {
    // Allow errors to be handled by components
    console.error('API request failed:', error);
    throw error.response?.data?.message || error.message || 'API request failed';
  }
}

export default apiClient;