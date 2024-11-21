import { useState } from 'react';
import {MatchItem} from '../Match/MatchCard';
import {MessageBubble} from '../Message/MessageBubble';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const DUMMY_MATCHES = [
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 25,
    occupation: 'Software Engineer',
    location: 'San Francisco, CA',
    compatibility: 95,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    bio: 'Looking for a quiet and clean living space. I work from home and enjoy cooking.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    age: 28,
    occupation: 'Product Designer',
    location: 'San Francisco, CA',
    compatibility: 88,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    bio: 'Creative professional seeking like-minded roommates. Love art and music.',
  },
];

export default function MatchList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [matches, setMatches] = useState(DUMMY_MATCHES);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/4">
          <MatchFilters onFilter={(filters) => console.log(filters)} />
        </div>

        <div className="md:w-3/4 space-y-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <Input
                id="search"
                placeholder="Search by name or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>

          <div className="grid gap-6">
            {matches.map((match) => (
              <MatchItem key={match.id} match={match} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}