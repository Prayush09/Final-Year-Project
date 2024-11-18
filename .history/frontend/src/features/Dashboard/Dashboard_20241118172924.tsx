import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, Home, ArrowRight, Bell, Waves } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import MatchSuggestions from './MatchSuggestions';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const WaveIconComponent = () => {
    return (
      <div className="icon-container">
        <Waves className="h-8 w-8 text-blue-500" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Welcome back, {user?.name?.split(' ')[0]}! 
          </h1>
          <WaveIconComponent />
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Here's what's happening with your matches today.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white">
              3
            </span>
          </Button>
          <Avatar className="h-12 w-12 border-2 border-indigo-600">
            <AvatarImage src={user?.avatar || ''} />
            <AvatarFallback className="bg-indigo-600 text-white">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Profile Completion Banner */}
      {!user?.profile_completed && (
        <Alert className="mb-8 border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20">
          <AlertTitle className="text-yellow-800 dark:text-yellow-200 font-semibold flex items-center gap-2">
            <span className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse" />
            Profile Incomplete
          </AlertTitle>
          <AlertDescription className="text-yellow-700 dark:text-yellow-300">
            Complete your profile to unlock personalized match suggestions.{' '}
            <Button 
              variant="link" 
              className="text-yellow-800 dark:text-yellow-200 font-semibold hover:text-yellow-900"
              onClick={() => {navigate()}}
            >
              Complete Now <ArrowRight className="h-4 w-4 ml-1 inline" />
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="transform transition-all hover:scale-105 hover:shadow-xl bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
            <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">24</div>
            <div className="flex items-center mt-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                +4 this week
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="transform transition-all hover:scale-105 hover:shadow-xl bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
            <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">8</div>
            <div className="flex items-center mt-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                3 new messages
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="transform transition-all hover:scale-105 hover:shadow-xl bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Saved Listings</CardTitle>
            <div className="h-8 w-8 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
              <Home className="h-4 w-4 text-pink-600 dark:text-pink-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">12</div>
            <div className="flex items-center mt-2">
              <Badge variant="secondary" className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                2 new this week
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Match Suggestions Section */}
      {user?.profile_completed && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="h-2 w-2 bg-green-400 rounded-full" />
            Your Match Suggestions
          </h2>
          <MatchSuggestions />
        </div>
      )}
    </div>
  );
}