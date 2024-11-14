import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';

const SUGGESTIONS = [
  {
    id: 1,
    name: 'Emma Wilson',
    occupation: 'UX Designer',
    compatibility: 92,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
  },
  {
    id: 2,
    name: 'James Rodriguez',
    occupation: 'Software Developer',
    compatibility: 89,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  },
  {
    id: 3,
    name: 'Sophie Chen',
    occupation: 'Marketing Manager',
    compatibility: 87,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
];

export default function MatchSuggestions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggested Matches</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {SUGGESTIONS.map((suggestion) => (
            <Card key={suggestion.id}>
              <CardContent className="p-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={suggestion.image} alt={suggestion.name} />
                    <AvatarFallback>{suggestion.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="font-semibold">{suggestion.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {suggestion.occupation}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-primary">
                    {suggestion.compatibility}% Match
                  </Badge>
                  <Button className="w-full" size="sm">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}