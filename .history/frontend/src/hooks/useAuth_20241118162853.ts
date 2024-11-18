import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      login: async (email, password) => {
        const user = {
          email,
          password
        };
        await axios.post("localhost:3000/login", user);
      },
      signup: async (email, password, name) => {
        try {
          const user = {
            password,
            email,
            name,
          };
          await axios.post("http://localhost:3000/register", user);
        } catch (error) {
          const err = error as Error;
          console.error('Signup failed:', err.message);
          throw error; // Re-throw the error to inform the caller
        }
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    } 
  )
);