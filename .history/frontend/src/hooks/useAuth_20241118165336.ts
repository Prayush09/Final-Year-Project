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

const api = axios.create({
  baseURL: 'http://localhost:3000/api/users',
});

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null, // Initially set to null, it will be hydrated from localStorage
      setUser: (user) => set({ user }), // Method to update the user state
      login: async (email, password) => {
        try {
          const response = await api.post('/login', { email, password });
          // After successful login, store the user in Zustand and persist it in localStorage
          set({ user: response.data.user });
        } catch (error) {
          console.error("Login failed:", error);
          if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
          } else if (error instanceof Error) {
            console.error('General error:', error.message);
          } else {
            console.error('Unknown error:', error);
          }
        }
      },
      signup: async (email, password, name) => {
        try {
          const user = { email, password, name };
          const response = await api.post('/register', user);
          // After successful signup, store the user in Zustand and persist it in localStorage
          set({ user: response.data.user });
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
      logout: () => {
        set({ user: null }); // Clear user state
        // Optional: Clear from localStorage as well
        localStorage.removeItem('auth-storage'); // Removing the persisted data on logout
      },
    }),
    {
      name: 'auth-storage', // Name for the persisted key in localStorage
      getStorage: () => localStorage, // Specify where to store the data (localStorage by default)
    }
  )
);
