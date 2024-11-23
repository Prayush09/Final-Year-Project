import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useNavigate } from 'react-router-dom';

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
  user_id: string | null; // Add user_id here
  setUser: (user: User | null, token: string | null, name: string | null, user_id: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const api = axios.create({
  baseURL: 'http://localhost:3000/api/users',
  withCredentials: true
});

const navigate = useNavigate();

export const useAuth = create<AuthState>()(
  
  persist(
    (set) => ({
      user: null, // User state is initially null
      token: null,
      name: null, // Initialize name as null
      user_id: null, // Initialize user_id as null
      setUser: (user, token, name, user_id) => set({ user, token, name, user_id }), // Set user, token, name, and user_id
      login: async (email, password) => {
        
        localStorage.setItem("email", email)
        try {
          // Send login request with credentials
          const response = await api.post('/login', { email, password }, { withCredentials: true });

          // After successful login, store the user and token in Zustand and persist them
          const user = response.data.user;
          const token = response.data.token;
          const user_id = user.id; // Get user_id from the response
          
          set({ user, token, name: user.name, user_id }); // Store user_id along with user, token, and name

          // Save token to localStorage for immediate access (or Zustand will manage it)
          localStorage.setItem('auth-token', token);

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
          const registeredUser = response.data.user;
          const token = response.data.token;
          const user_id = registeredUser.id; // Get user_id from the response

          set({ user: registeredUser, token, name: registeredUser.name, user_id }); // Store user_id along with user, token, and name
          localStorage.setItem('auth-token', token); // Save token to localStorage
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
        set({ user: null, token: null, name: null, user_id: null }); // Clear user, token, name, and user_id state
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
        user_id: state.user_id, // Persist user_id in localStorage
      }),
    }
  )
);
