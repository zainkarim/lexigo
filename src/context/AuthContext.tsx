import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getFirestore, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

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

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const profileData = userDoc.exists() ? userDoc.data() : {};

      const authenticatedUser: User = {
        id: user.uid,
        email: user.email || '',
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
      };

      setUser(authenticatedUser);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (email: string, password: string, firstName: string, lastName: string): Promise<void> => {
    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      // Store user info in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email,
      });

      const newUser: User = {
        id: user.uid,
        email,
        firstName,
        lastName,
      };

      setUser({ id: user.uid, email: user.email!, firstName, lastName });
      localStorage.setItem('user', JSON.stringify({ id: user.uid, email: user.email, firstName, lastName }));
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    await signOut(auth);
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}; 