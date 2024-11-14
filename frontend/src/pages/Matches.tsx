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
import { Heart, X, MessageCircle } from 'lucide-react';

const DUMMY_MATCHES = [
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 25,
    occupation: 'Software Engineer',
    location: 'San Francisco, CA',
    compatibility: 95,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
  {
    id: 2,
    name: 'Michael Chen',
    age: 28,
    occupation: 'Product Designer',
    location: 'San Francisco, CA',
    compatibility: 88,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  },
  // Add more dummy matches as needed
];

export default function Matches() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-1/3">
          <Label htmlFor="search">Search</Label>
          <Input id="search" placeholder="Search by name or location" />
        </div>
        <div className="w-full md:w-1/3">
          <Label htmlFor="filter">Filter By</Label>
          <Select>
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
        <Button className="w-full md:w-auto">Search</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DUMMY_MATCHES.map((match) => (
          <Card key={match.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <img
                    src={match.image}
                    alt={match.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
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
                  <Button className="flex-1" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="text-primary">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}