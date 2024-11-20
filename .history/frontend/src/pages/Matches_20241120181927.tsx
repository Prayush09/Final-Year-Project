import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Heart, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Match {
  id: string;
  matched_user_id: string;
  match_score: number;
  name: string;
  age: number;
  gender: string;
  location: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface ProfileDetails {
  bio: string;
  sleep_schedule: string;
  noise_tolerance: string;
  budget: number;
}

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [profileDetails, setProfileDetails] = useState<{
    [key: string]: ProfileDetails;
  }>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('compatibility');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/matches/find', {
        credentials: 'include',
      });
      const data = await response.json();
      setMatches(
        data.matches.filter(
          (match: Match) => match.match_score > 0 && match.status === 'pending'
        )
      );
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfileDetails = async (matchedUserId: string) => {
    if (profileDetails[matchedUserId]) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/profiles?matched_user_id=${matchedUserId}`,
        {
          credentials: 'include',
        }
      );
      const data = await response.json();
      setProfileDetails((prev) => ({ ...prev, [matchedUserId]: data.profile }));
    } catch (error) {
      console.error('Error fetching profile details:', error);
    }
  };

  const handleCardClick = (matchedUserId: string) => {
    setExpandedCard((prev) =>
      prev === matchedUserId ? null : matchedUserId
    );
    fetchProfileDetails(matchedUserId);
  };

  const filteredMatches = matches
    .filter(
      (match) =>
        match.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (filter) {
        case 'compatibility':
          return b.match_score - a.match_score;
        case 'age':
          return a.age - b.age;
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-1/3">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search by name or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3">
          <Label htmlFor="filter">Filter By</Label>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compatibility">Highest Compatibility</SelectItem>
              <SelectItem value="age">Age</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className={`transition-all duration-300 ${
                  expandedCard === match.matched_user_id
                    ? 'w-full md:col-span-2 lg:col-span-3'
                    : ''
                }`}
                onClick={() => handleCardClick(match.matched_user_id)}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold">{match.name}</h3>
                      <p>{match.age} • {match.gender}</p>
                    </div>
                    <p className="text-primary font-medium">
                      {match.match_score}% Match
                    </p>

                    {expandedCard === match.matched_user_id &&
                      profileDetails[match.matched_user_id] && (
                        <div className="mt-4 space-y-2">
                          <p>
                            <strong>Bio:</strong>{' '}
                            {profileDetails[match.matched_user_id].bio}
                          </p>
                          <p>
                            <strong>Sleep Schedule:</strong>{' '}
                            {profileDetails[match.matched_user_id].sleep_schedule}
                          </p>
                          <p>
                            <strong>Noise Tolerance:</strong>{' '}
                            {profileDetails[match.matched_user_id].noise_tolerance}
                          </p>
                          <p>
                            <strong>Budget:</strong>{' '}
                            {profileDetails[match.matched_user_id].budget}
                          </p>
                        </div>
                      )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {filteredMatches.length === 0 && !loading && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            No matches found. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
}
