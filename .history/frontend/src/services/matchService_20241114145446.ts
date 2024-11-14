import axios from 'axios';

const matchService = {
  getAllMatchesForUser: async (userId) => {
    const response = await axios.get(`/api/matches/`);
    return response.data;
  },

  acceptMatch: async (matchedUserId: string) => {
    const response = await axios.post('/api/matches/accept', { matched_user_id: matchedUserId });
    return response.data;
  },

  rejectMatch: async (matchedUserId: string) => {
    const response = await axios.post('/api/matches/reject', { matched_user_id: matchedUserId });
    return response.data;
  }
};

export default matchService;
