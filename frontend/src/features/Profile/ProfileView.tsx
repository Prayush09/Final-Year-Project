import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { MapPin, Briefcase, Calendar } from 'lucide-react';

export default function ProfileView() {
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader className="relative">
        <div className="absolute right-6 top-6">
          <Button variant="outline">Edit Profile</Button>
        </div>
        <div className="flex items-start space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" />
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user?.name}</CardTitle>
            <CardDescription className="flex items-center mt-2">
              <MapPin className="mr-1 h-4 w-4" />
              San Francisco, CA
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            <span>Software Engineer at Tech Corp</span>
          </div>
          <div className="flex items-center space-x-4">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span>25 years old</span>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">About Me</h3>
            <p className="text-muted-foreground">
              I'm a friendly professional looking for a clean and quiet living
              space. I enjoy cooking, reading, and occasional game nights.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Preferences</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Non-smoker</Badge>
              <Badge variant="secondary">Clean and tidy</Badge>
              <Badge variant="secondary">Early riser</Badge>
              <Badge variant="secondary">Pet-friendly</Badge>
              <Badge variant="secondary">Professional</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}