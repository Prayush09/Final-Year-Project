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
        // Simulate API call
        const user = {
          id: '1',
          email,
          name: 'John Doe',
        };
        set({ user });
      },
      signup: async (email, password, name) => {
        // Simulate API call
        
        const user = {
          id: '1',
          email,
          name,
        };
        set({ user });
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);