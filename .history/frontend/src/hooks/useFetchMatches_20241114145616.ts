import { useState, useEffect } from 'react';
import matchService from '../services/matchService';

const useFetchMatches = (userId: string) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await matchService.getAllMatchesForUser(userId);
        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [userId]);

  return { matches, loading };
};

export default useFetchMatches;
