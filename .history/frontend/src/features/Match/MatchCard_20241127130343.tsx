import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MatchCard } from '../features/Match/MatchCard.tsx';
import { cn } from '@/lib/utils';

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

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [profiles, setProfiles] = useState<Map<string, Profile>>(new Map());
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filter, setFilter] = useState('compatibility');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    fetchMatches();
    const intervalId = setInterval(createMatchesInBackground, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchMatches = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.get(
        `http://localhost:3000/api/match/?user_id=${user_id}`,
        { withCredentials: true }
      );
      const fetchedMatches = response.data;
      setMatches(fetchedMatches.filter((match: any) => match.status === 'pending'));
      await fetchProfilesForMatches(fetchedMatches);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setIsRefreshing(false);
      setLoading(false);
    }
  };

  const fetchProfilesForMatches = async (matches: Match[]) => {
    try {
      const profilesData = await Promise.all(
        matches
          .filter((match) => match.status === 'pending')
          .map(async (match) => {
            const response = await axios.get(
              `http://localhost:3000/api/profiles/?user_id=${match.matched_user_id}`
            );
            return {
              matched_user_id: match.matched_user_id,
              profile: response.data,
            };
          })
      );

      const profilesMap = new Map(
        profilesData.map((data) => [data.matched_user_id, data.profile])
      );
      setProfiles(profilesMap);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const createMatchesInBackground = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/match/find?user_id=${user_id}`,
        null,
        { withCredentials: true }
      );
      if (response.data.newMatchesCreated) {
        await fetchMatches();
      }
    } catch (error) {
      console.error('Error creating matches in the background:', error);
    }
  };

  const handleAccept = async (matchedUserId: string) => {
    try {
      await axios.put(
        `http://localhost:3000/api/match/acceptMatch`,
        {
          user_id: user_id,
          matched_user_id: matchedUserId,
        },
        { withCredentials: true }
      );
      await fetchMatches();
    } catch (error) {
      console.error('Error accepting match:', error);
    }
  };

  const handleReject = async (matchedUserId: string) => {
    try {
      await axios.put(
        `http://localhost:3000/api/match/rejectMatch?user_id=${user_id}&matched_user_id=${matchedUserId}`,
        null,
        { withCredentials: true }
      );
      await fetchMatches();
    } catch (error) {
      console.error('Error rejecting match:', error);
    }
  };

  const filteredMatches = matches.filter((match) => {
    const profile = profiles.get(match.matched_user_id);
    if (!profile) return false;
    
    const nameIncludesQuery = profile.name.toLowerCase().includes(searchQuery.toLowerCase());
    const locationIncludesQuery = profile.location_preferences.toLowerCase().includes(searchQuery.toLowerCase());
    
    return nameIncludesQuery || locationIncludesQuery;
  });
    
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="search" className="text-gray-700 dark:text-gray-300">
              Search
            </Label>
            <Input
              id="search"
              placeholder="Search by name or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 text-white"
            />
          </div>
          <div className="w-full sm:w-48">
            <Label htmlFor="filter" className="text-gray-700 dark:text-gray-300">
              Filter By
            </Label>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger id="filter">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compatibility">
                  Highest Compatibility
                </SelectItem>
                <SelectItem value="age">Age</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-auto flex items-end">
            <Button
              variant="outline"
              size="icon"
              onClick={fetchMatches}
              disabled={isRefreshing}
              className={cn(
                'transition-transform duration-700 ease-in-out',
                isRefreshing && 'animate-spin'
              )}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredMatches.map((match) => {
            const profile = profiles.get(match.matched_user_id);
            if (!profile) return null;

            return (
              <motion.div
                key={match.matched_user_id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
                transition={{ duration: 0.2 }}
              >
                <MatchCard
                  matchedUserId={match.matched_user_id}
                  profile={profile}
                  matchScore={match.match_score}
                  status={match.status}
                  onAccept={() => handleAccept(match.matched_user_id)}
                  onReject={() => handleReject(match.matched_user_id)}
                  onDelete={() => null}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}