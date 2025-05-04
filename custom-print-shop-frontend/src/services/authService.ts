
// Simple authentication service using localStorage
interface User {
    id: string;
    name: string;
    email: string;
    password: string; // In a real app, never store plaintext passwords
    isAdmin: boolean;
  }
  
  // Initial admin user
  const defaultAdmin: User = {
    id: "admin-1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123", // In a real app, this would be hashed
    isAdmin: true
  };
  
  // Initialize users in localStorage if not exists
  const initializeUsers = (): void => {
    const users = localStorage.getItem('users');
    if (!users) {
      localStorage.setItem('users', JSON.stringify([defaultAdmin]));
    }
  };
  
  // Get all users
  export const getUsers = (): User[] => {
    initializeUsers();
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };
  
  // Register a new user
  export const registerUser = (name: string, email: string, password: string): { success: boolean; message: string } => {
    const users = getUsers();
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
      return { success: false, message: 'User with this email already exists' };
    }
    
    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      password, // In a real app, this would be hashed
      isAdmin: false
    };
    
    // Add user to localStorage
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    
    return { success: true, message: 'Registration successful' };
  };
  
  // Login user
  export const loginUser = (email: string, password: string): { success: boolean; message: string; user?: Omit<User, 'password'> } => {
    const users = getUsers();
    
    // Find user
    const user = users.find(user => user.email === email);
    
    // Check if user exists and password is correct
    if (!user || user.password !== password) {
      return { success: false, message: 'Invalid email or password' };
    }
    
    // Store current user in localStorage (session)
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return { 
      success: true, 
      message: 'Login successful',
      user: userWithoutPassword
    };
  };
  
  // Logout user
  export const logoutUser = (): void => {
    localStorage.removeItem('currentUser');
  };
  
  // Get current user
  export const getCurrentUser = (): Omit<User, 'password'> | null => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  };
  
  // Check if user is logged in
  export const isLoggedIn = (): boolean => {
    return !!getCurrentUser();
  };
  
  // Check if current user is admin
  export const isAdmin = (): boolean => {
    const user = getCurrentUser();
    return !!user?.isAdmin;
  };