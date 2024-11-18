import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, Home } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import MatchSuggestions from './MatchSuggestions';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="text-center bg-indigo-600 text-white p-6 rounded-md shadow-lg">
        <h1 className="text-3xl font-semibold">Welcome {user?.name}!</h1>
        <p className="mt-2 text-xl">Your dashboard is ready to go! Let's get started.</p>
      </div>

      {/* Profile Completion Banner */}
      {!user?.profile_completed && (
        <Alert variant="destructive">
          <AlertTitle className="font-semibold">Profile Incomplete</AlertTitle>
          <AlertDescription>
            Complete your profile to start getting match suggestions.{' '}
            <Button className="mt-2" onClick={() => {/* Redirect to profile form */}}>Complete Profile</Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Cards Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+4 from last week</p>
          </CardContent>
        </Card>

        <Card className="shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 new messages</p>
          </CardContent>
        </Card>

        <Card className="shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Listings</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">2 new this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Match Suggestions Component */}
      {user?.profile_completed && <MatchSuggestions />}
    </div>
  );
}
