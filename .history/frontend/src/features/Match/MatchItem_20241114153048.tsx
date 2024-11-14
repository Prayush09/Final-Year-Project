import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, X, MessageCircle, MapPin, Briefcase } from 'lucide-react';

interface MatchItemProps {
  match: {
    id: number;
    name: string;
    age: number;
    occupation: string;
    location: string;
    compatibility: number;
    image: string;
    bio: string;
  };
}

export default function MatchItem({ match }: MatchItemProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={match.image} alt={match.name} />
            <AvatarFallback>{match.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{match.name}</h3>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {match.location}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Briefcase className="mr-1 h-4 w-4" />
                  {match.occupation}
                </div>
              </div>
              <Badge variant="secondary" className="text-primary">
                {match.compatibility}% Match
              </Badge>
            </div>

            <p className="text-muted-foreground">{match.bio}</p>

            <div className="flex gap-2">
              <Button className="flex-1">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" size="icon" className="text-destructive">
                <X className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="text-primary">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}