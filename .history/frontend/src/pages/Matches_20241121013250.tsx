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
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { MatchCard } from '../features/Match/MatchCard.tsx';

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
  const [filter, setFilter] = useState('compatibility');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    fetchMatches();
    const intervalId = setInterval(() => {
      createMatchesInBackground();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/match/?user_id=${user_id}`,
        {
          withCredentials: true,
        }
      );
      const fetchedMatches = response.data;
      setMatches(fetchedMatches);
      await fetchProfilesForMatches(fetchedMatches);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfilesForMatches = async (matches: Match[]) => {
    try {
      const profilesData = await Promise.all(
        matches.map(async (match) => {
          const profileResponse = await axios.get(
            `http://localhost:3000/api/profiles/?user_id=${match.matched_user_id}`
          ); // make sure only 
          return {
            matched_user_id: match.matched_user_id,
            profile: profileResponse.data,
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
      await axios.post(
        `http://localhost:3000/api/match/find?user_id=${user_id}`,
        null,
        { withCredentials: true }
      );
      fetchMatches();
    } catch (error) {
      console.error('Error creating matches in the background:', error);
    }
  };

  const handleAccept = async (matchedUserId: string) => {
    try {
      await axios.put(
        `http://localhost:3000/api/matches/acceptMatch?user_id=${user_id}&matched_user_id=${matchedUserId}`,
        null,
        { withCredentials: true }
      );
      setMatches((prev) =>
        prev.map((match) =>
          match.matched_user_id === matchedUserId
            ? { ...match, status: 'accepted' }
            : match
        )
      );
    } catch (error) {
      console.error('Error accepting match:', error);
    }
  };

  const handleReject = async (matchedUserId: string) => {
    try {
      await axios.put(
        `http://localhost:3000/api/matches/rejectMatch?user_id=${user_id}&matched_user_id=${matchedUserId}`,
        null,
        { withCredentials: true }
      );
      setMatches((prev) =>
        prev.map((match) =>
          match.matched_user_id === matchedUserId
            ? { ...match, status: 'rejected' }
            : match
        )
      );
    } catch (error) {
      console.error('Error rejecting match:', error);
    }
  };

  const handleDelete = async (matchedUserId: string) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/matches/deleteMatch?user_id=${user_id}&matched_user_id=${matchedUserId}`,
        { withCredentials: true }
      );
      setMatches((prev) =>
        prev.filter((match) => match.matched_user_id !== matchedUserId)
      );
    } catch (error) {
      console.error('Error deleting match:', error);
    }
  };

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
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search by name or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <Label htmlFor="filter">Filter By</Label>
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
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {matches.map((match) => {
          const profile = profiles.get(match.matched_user_id);
          if (!profile) return null;

          return (
            <MatchCard
              key={match.matched_user_id}
              profile={profile}
              matchScore={match.match_score}
              status={match.status}
              onAccept={() => handleAccept(match.matched_user_id)}
              onReject={() => handleReject(match.matched_user_id)}
              onDelete={() => handleDelete(match.matched_user_id)}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
    