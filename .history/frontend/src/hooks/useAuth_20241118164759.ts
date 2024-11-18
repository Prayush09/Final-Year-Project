export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null, // Initialize the 'user' state as null
      setUser: (user) => set({ user }),
      login: async (email, password) => {
        const user = { email, password };
        await axios.post("http://localhost:3000/api/users/login", user);
      },
      signup: async (email, password, name) => {
        const user = { email, password, name };
        await axios.post("http://localhost:3000/api/users/register", user);
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage', // Key used for persisting state in local storage
    }
  )
);
