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

interface ProfileDetails {
  bio: string;
  sleep_schedule: string;
  noise_tolerance: string;
  budget: number;
}

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([]);
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
        data.matches.filter((match: Match) => match.match_score > 0)
      );
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (matchedUserId: string) => {
    try {
      await fetch('http://localhost:3000/api/matches/acceptMatch', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ matched_user_id: matchedUserId }),
      });
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
      await fetch('http://localhost:3000/api/matches/rejectMatch', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ matched_user_id: matchedUserId }),
      });
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
      await fetch('http://localhost:3000/api/matches/deleteMatch', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ matched_user_id: matchedUserId }),
      });
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
                    <p>{match.age} • {match.gender}</p>
                    <p className="text-primary font-medium">
                      {match.match_score}% Match
                    </p>
                    <div className="flex gap-2">
                      {match.status === 'pending' && (
                        <>
                          <Button
                            variant="success"
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