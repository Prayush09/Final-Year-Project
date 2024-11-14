import axios from 'axios';

const authService = {
  login: async (email: string, password: string) => {
    const response = await axios.post('/api/login', { email, password });
    return response.data;
  },
  
  signup: async (userData: { username: string; email: string; password: string }) => {
    const response = await axios.post('/api/signup', userData);
    return response.data;
  },
};

export default authService;
