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
import { Heart, X, MessageCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Match {
  user_id: string;
  matched_user_id: string;
  match_score: number;
  status: 'pending' | 'accepted' | 'rejected';
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
        credentials: 'include'
      });
      const data = await response.json();
      // Filter out matches with 0% compatibility and non-pending status
      const validMatches = data.matches.filter(
        (match: Match) => match.match_score > 0 && match.status === 'pending'
      );
      setMatches(validMatches);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (matchId: string) => {
    try {
      await fetch(`http://localhost:3000/api/matches/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ matched_user_id: matchId }),
      });
      
      // Remove the match from the current view
      setMatches(matches.filter(match => match.id !== matchId));
    } catch (error) {
      console.error('Error accepting match:', error);
    }
  };

  const handleReject = async (matchId: string) => {
    try {
      await fetch(`http://localhost:3000/api/matches/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ matched_user_id: matchId }),
      });
      
      // Remove the match from the current view
      setMatches(matches.filter(match => match.id !== matchId));
    } catch (error) {
      console.error('Error rejecting match:', error);
    }
  };

  const filteredMatches = matches
    .filter(match => 
      match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (filter) {
        case 'compatibility':
          return b.compatibility - a.compatibility;
        case 'age':
          return a.age - b.age;
        case 'location':
          return a.location.localeCompare(b.location);
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
              <SelectItem value="location">Location</SelectItem>
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
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="aspect-square relative rounded-lg overflow-hidden">
                      <img
                        src={match.image}
                        alt={match.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {match.compatibility}% Match
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">{match.name}</h3>
                      <p className="text-muted-foreground">
                        {match.age} • {match.occupation}
                      </p>
                      <p className="text-muted-foreground">{match.location}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleReject(match.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <Button
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={() => handleAccept(match.id)}
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Like
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {filteredMatches.length === 0 && !loading && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No matches found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}