import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define types
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

// Test users array for authentication
const testUsers = [
  {
    email: 'test',
    password: 'test',
    id: '1',
    firstName: 'Test',
    lastName: 'User'
  }
];

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

// Create context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  error: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function with hardcoded test credentials
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Check if credentials match the test user
      const foundUser = testUsers.find(user => user.email === email && user.password === password);
      
      if (foundUser) {
        // Create a user object without the password
        const authenticatedUser: User = {
          id: foundUser.id,
          email: foundUser.email,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName
        };
        
        // Store in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(authenticatedUser));
        setUser(authenticatedUser);
      } else {
        // Authentication failed
        throw new Error('Invalid username or password');
      }
    } catch (err) {
      setError('Invalid username or password');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (email: string, password: string, firstName: string, lastName: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Check if email already exists in test users
      if (testUsers.some(user => user.email === email)) {
        throw new Error('Email already in use');
      }
      
      // Create a new user object
      const newUser: User = {
        id: String(testUsers.length + 1),
        email,
        firstName,
        lastName
      };
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      
      console.log('New user registered:', { email, firstName, lastName });
    } catch (err: any) {
      setError(err.message || 'Error creating account');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = (): void => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}; 