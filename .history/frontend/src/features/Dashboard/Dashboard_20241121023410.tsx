import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Users, Sparkles, Bell } from 'lucide-react';
import { MatchCard } from '../Match/MatchCard';

interface Match {
  user_id: string;
  matched_user_id: string;
  match_score: number;
  status: 'pending' | 'accepted' | 'rejected';
}

interface Profile {
  name: string;
  age: number;
  gender: string;
  location_preferences: string;
  bio: string;
}

interface MatchWithProfile extends Match {
  profile?: Profile;
  mutualMatch?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [incomingRequests, setIncomingRequests] = useState<MatchWithProfile[]>([]);
  const [currentMatches, setCurrentMatches] = useState<MatchWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const user_id = localStorage.getItem('user_id') || '';

  useEffect(() => {
    if (user_id) {
      fetchMatches();
    }
  }, [user_id]);

  const fetchMatches = async () => {
    try {
      const userMatches = await axios.get<Match[]>(
        `http://localhost:3000/api/match/?user_id=${user_id}`,
        { withCredentials: true }
      );

      const matchedUserIds = new Map(
        userMatches.data.map((match) => [match.matched_user_id, match])
      );

      const matchPromises = Array.from(matchedUserIds.keys()).map(async (matched_user_id) => {
        const matchResponse = await axios.get<Match[]>(
          `http://localhost:3000/api/match/?user_id=${matched_user_id}`,
          { withCredentials: true }
        );

        const profileResponse = await axios.get<Profile>(
          `http://localhost:3000/api/profiles/?user_id=${matched_user_id}`
        );

        const userMatch = matchedUserIds.get(matched_user_id);
        return {
          ...userMatch!,
          profile: profileResponse.data,
          mutualMatch: matchResponse.data.some(
            (m) => m.matched_user_id === user_id && m.status === 'accepted'
          ),
        };
      });

      const resolvedMatches = await Promise.all(matchPromises);

      const incoming = resolvedMatches.filter(
        (match) => match.status === 'pending' && match.mutualMatch
      );
      const current = resolvedMatches.filter(
        (match) => match.status === 'accepted' && match.mutualMatch
      );

      setIncomingRequests(incoming);
      setCurrentMatches(current);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (matchedUserId: string) => {
    try {
      await axios.put(
        `http://localhost:3000/api/match/acceptMatch?user_id=${user_id}&matched_user_id=${matchedUserId}`,
        null,
        { withCredentials: true }
      );

      const acceptedMatch = incomingRequests.find(
        (m) => m.matched_user_id === matchedUserId
      );
      if (acceptedMatch) {
        setCurrentMatches((prev) => [...prev, { ...acceptedMatch, status: 'accepted' }]);
        setIncomingRequests((prev) => prev.filter((m) => m.matched_user_id !== matchedUserId));
      }
    } catch (error) {
      console.error('Error accepting match:', error);
    }
  };

  const handleReject = async (matchedUserId: string) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/match/deleteMatch?user_id=${user_id}&matched_user_id=${matchedUserId}`,
        { withCredentials: true }
      );
      setIncomingRequests((prev) => prev.filter((m) => m.matched_user_id !== matchedUserId));
    } catch (error) {
      console.error('Error rejecting match:', error);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6"
    >
      {/* ... */}
      {/* Remaining JSX Content */}
    </motion.div>
  );
}
