import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Heart, Home as HomeIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Find Your Perfect Roommate
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px]">
          Connect with compatible roommates, share your space, and create your ideal
          living environment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1000px]">
        <Card>
          <CardContent className="pt-6 text-center space-y-4">
            <Users className="w-12 h-12 mx-auto text-primary" />
            <h2 className="text-xl font-semibold">Match with Roommates</h2>
            <p className="text-muted-foreground">
              Find roommates who share your lifestyle and preferences.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center space-y-4">
            <HomeIcon className="w-12 h-12 mx-auto text-primary" />
            <h2 className="text-xl font-semibold">List Your Space</h2>
            <p className="text-muted-foreground">
              Share your available room or find a place to live.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center space-y-4">
            <Heart className="w-12 h-12 mx-auto text-primary" />
            <h2 className="text-xl font-semibold">Perfect Match</h2>
            <p className="text-muted-foreground">
              Our algorithm ensures you find the most compatible roommates.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button size="lg" asChild>
          <Link to="/signup">Get Started</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link to="/login">I already have an account</Link>
        </Button>
      </div>
    </div>
  );
}