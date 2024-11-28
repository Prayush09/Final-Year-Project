import { useState, useEffect } from 'react';
import axios from 'axios';

export function useProfileCheck(email: string | null) {
  const [isProfileComplete, setIsProfileComplete] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) {
      setIsLoading(false);
      return;
    }

    const checkProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/userId?email=${email}`
        );
        setIsProfileComplete(response.data.profile_completed);
      } catch (err) {
        setError('Failed to check profile status');
        console.error('Error checking profile status:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkProfile();
  }, [email]);

  return { isProfileComplete, isLoading, error };
}