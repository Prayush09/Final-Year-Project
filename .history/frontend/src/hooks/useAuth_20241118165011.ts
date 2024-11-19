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
        try {
          const response = await axios.post("http://localhost:3000/api/users/login", { email, password });
          set({ user: response.data.user }); // Update user state on successful login
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
      signup: async (email, password, name) => {
        try {
          const user = { email, password, name };
          await axios.post("http://localhost:3000/api/users/register", user);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
          } else if (error instanceof Error) {
            console.error('General error:', error.message);
          } else {
            console.error('Unknown error:', error);
          }
        }
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage', // Name of localStorage key
    }
  )
);