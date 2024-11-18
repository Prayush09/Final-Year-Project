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
  token: string | null; // Store the token
  setUser: (user: User | null, token: string | null) => void;
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
      user: null, // User state is initially null
      token: null, // Token is initially null
      setUser: (user, token) => set({ user, token }), // Method to set user and token
      login: async (email, password) => {
        try {
          const response = await api.post('/login', { email, password });
          // After successful login, store the user and token in Zustand and persist them
          set({ user: response.data.user, token: response.data.token });
          // Optionally store the token in localStorage as well
          localStorage.setItem('auth-token', response.data.token);
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
          // After successful signup, store the user and token in Zustand and persist them
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
        set({ user: null, token: null }); // Clear user and token state
        // Remove the token from localStorage
        localStorage.removeItem('auth-token');
      },
    }),
    {
      name: 'auth-storage', // Name for the persisted key in localStorage
      getStorage: () => localStorage, // Specify where to store the data (localStorage by default)
      // Hydrate from localStorage for user and token on app load
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);

