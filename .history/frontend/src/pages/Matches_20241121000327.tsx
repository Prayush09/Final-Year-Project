// Matches Component
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import { Loader2 } from 'lucide-react';
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

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('compatibility');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    // Initial fetch of matches
    fetchMatches();

    // Poll the /find endpoint every 10 seconds to create matches in the background
    const intervalId = setInterval(() => {
      createMatchesInBackground();
    }, 10000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/match?user_id=${user_id}`, {
        withCredentials: true,
      });
      console.log('Fetched matches:', response.data);

      // Adjust for object response if necessary
      const fetchedMatches = Array.isArray(response.data.matches) ? response.data.matches : [];
      setMatches(fetchedMatches.filter((match: Match) => match.match_score > 0));
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const createMatchesInBackground = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/match/find?user_id=${user_id}`,
        null,
        { withCredentials: true }
      );
      // Fetch updated matches after creating new ones
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

  const filteredMatches = matches
    .filter((match) =>
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
    
  console.log(filteredMatches)

  //fetch matches from profile: 
  const profilesOfMatches = filteredMatches.map(async (profile) => {
      try{
        await 
      }
  })

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
              <SelectItem value="compatibility">
                Highest Compatibility
              </SelectItem>
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
              <Card>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{match.name}</h3>
                    <p>
                      {match.age} • {match.gender}
                    </p>
                    <p className="text-primary font-medium">
                      {match.match_score}% Match
                    </p>
                    <div className="flex gap-2">
                      {match.status === 'pending' && (
                        <>
                          <Button
                            variant="secondary"
                            onClick={() => handleAccept(match.matched_user_id)}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleReject(match.matched_user_id)}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      <Button
                        variant="outline"
                        onClick={() => handleDelete(match.matched_user_id)}
                      >
                        Unmatch
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {filteredMatches.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No matches found.</p>
        </div>
      )}
    </div>
  );
}
