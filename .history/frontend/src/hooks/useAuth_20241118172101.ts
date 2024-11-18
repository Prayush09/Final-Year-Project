import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  profile_completed: boolean;
  
}

interface AuthState {
  user: User | null;
  token: string | null;
  name: string | null;
  setUser: (user: User | null, token: string | null, name: string | null) => void;
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
      token: null,
      name: null, // Initialize name as null
      setUser: (user, token, name) => set({ user, token, name }), // Set user, token, and name
      login: async (email, password) => {
        try {
          const response = await api.post('/login', { email, password });
          // After successful login, store the user and token in Zustand and persist them
          set({ user: response.data.user, token: response.data.token, name: response.data.user.name });
          localStorage.setItem('auth-token', response.data.token); // Save token to localStorage
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
          set({ user: response.data.user, token: response.data.token, name: response.data.user.name });
          localStorage.setItem('auth-token', response.data.token); // Save token to localStorage
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
        set({ user: null, token: null, name: null }); // Clear user, token, and name state
        localStorage.removeItem('auth-token'); // Remove the token from localStorage
      },
    }),
    {
      name: 'auth-storage', // Name for the persisted key in localStorage
      getStorage: () => localStorage, // Specify where to store the data (localStorage by default)
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        name: state.name, // Persist name in localStorage
      }),
    }
  )
);
