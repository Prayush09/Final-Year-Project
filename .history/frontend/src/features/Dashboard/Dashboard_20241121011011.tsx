import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  MessageSquare,
  Bell,
  ArrowRight,
  Heart,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import MatchCard from '../Match/';

interface Match {
  id: string;
  name: string;
  age: number;
  occupation: string;
  location: string;
  compatibility: number;
  image: string;
  bio: string;
  lastActive?: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('matches');

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/matches/', {
        credentials: 'include'
      });
      const data = await response.json();
      setMatches(data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/matches/${id}/like`, {
        method: 'POST',
        credentials: 'include'
      });
      setMatches(matches.filter(match => match.id !== id));
    } catch (error) {
      console.error('Error liking match:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/matches/${id}/reject`, {
        method: 'POST',
        credentials: 'include'
      });
      setMatches(matches.filter(match => match.id !== id));
    } catch (error) {
      console.error('Error rejecting match:', error);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Your journey to meaningful connections starts here
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="relative hover:scale-105 transition-transform"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-purple-500 rounded-full flex items-center justify-center text-[10px] text-white">
              3
            </span>
          </Button>
          <Avatar className="h-12 w-12 ring-2 ring-purple-500 ring-offset-2 transition-all hover:ring-4">
            <AvatarFallback className="bg-purple-600 text-white">
              {user?.name?.[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      </motion.div>

      {/* Profile Completion Alert */}
      {!user?.profile_completed && (
        <motion.div variants={itemVariants}>
          <Alert className="mb-8 border-l-4 border-purple-400 bg-purple-50/50 backdrop-blur-sm">
            <AlertTitle className="text-purple-800 dark:text-purple-200 font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Complete Your Profile
            </AlertTitle>
            <AlertDescription className="text-purple-700 dark:text-purple-300">
              Unlock personalized matches by completing your profile.{' '}
              <Button
                variant="link"
                className="text-purple-800 dark:text-purple-200 hover:text-purple-900"
                onClick={() => navigate('/profile')}
              >
                Complete Now <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
            <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{matches.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-600">12</div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <div className="h-8 w-8 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center">
              <UserCheck className="h-4 w-4 text-pink-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-pink-600">89</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Matches Section */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="matches" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="matches" className="flex items-center gap-2">
              <Heart className="h-4 w-4" /> Current Matches
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Suggestions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches">
            <ScrollArea className="h-[calc(100vh-26rem)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  <p className="text-center text-gray-500">Loading matches...</p>
                ) : matches.length > 0 ? (
                  matches.map((match) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MatchCard
                        match={match}
                        onLike={handleLike}
                        onReject={handleReject}
                      />
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No matches found</p>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="suggestions">
            <div className="text-center text-gray-500">
              Coming soon! We're preparing personalized suggestions for you.
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}