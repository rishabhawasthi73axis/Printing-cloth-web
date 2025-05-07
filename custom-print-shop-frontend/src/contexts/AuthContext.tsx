
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { authApi, User } from '@/api/authApi';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize authentication state on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log('Checking authentication status...');
        
        // First check local storage to avoid network requests when possible
        const userJson = localStorage.getItem('currentUser');
        const token = localStorage.getItem('authToken');
        
        if (userJson && token) {
          const userData = JSON.parse(userJson);
          console.log("User found in local storage:", userData);
          setUser(userData);
          setIsLoading(false);
          return;
        }
        
        // If no user in localStorage but we have a token, try API
        if (token && !userJson) {
          try {
            console.log("Token found, fetching user data from API...");
            const currentUser = await authApi.getCurrentUser();
            if (currentUser) {
              console.log("User found from API:", currentUser);
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
              setUser(currentUser);
              return;
            }
          } catch (error) {
            console.error("Error fetching user from API:", error);
            // Clear token if API call fails
            localStorage.removeItem('authToken');
          }
        }
        
        console.log("No valid authentication found");
      } catch (error) {
        console.error("Error checking auth status:", error);
        // Clear any invalid auth data
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log(`Login attempt: ${email} (isAdmin check will happen after authentication)`);
      const response = await authApi.login({ email, password });
      
      // Save token and user to localStorage
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      
      setUser(response.user);
      
      toast({
        title: response.user.isAdmin ? "Admin Login Successful" : "Login Successful",
        description: `Welcome back, ${response.user.name}!`,
      });
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive"
      });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const result = await authApi.register({ name, email, password });
      
      if (result.success) {
        toast({
          title: "Registration Successful",
          description: "You can now login with your credentials.",
        });
        return true;
      } else {
        toast({
          title: "Registration Failed",
          description: result.message,
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Registration failed",
        variant: "destructive"
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      toast({
        title: "Logout Successful",
        description: "You have been logged out.",
      });
      
      // Force reload the page to clear any cached state
      window.location.href = '/';
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Failed",
        description: "An error occurred during logout.",
        variant: "destructive"
      });
    }
  };

  const isAdmin = user?.isAdmin || false;

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};