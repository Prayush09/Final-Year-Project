import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Users, Sparkles, Bell } from 'lucide-react';
import { MatchCard } from '../Match/MatchCard';
import { useSocket } from '../../Context/SocketContext';
import { Banner } from '../../components/ui/banner';
import { useProfileCheck } from '../../hooks/useProfileCheck';

interface Match {
  user_id: string;
  matched_user_id: string;
  match_score: number;
  status: 'pending' | 'accepted' | 'rejected';
}

interface Profile {
  name: string;
  age: number;
  gender: string;
  location_preferences: string;
  bio: string;
}

interface MatchWithProfile extends Match {
  profile?: Profile;
  mutualMatch?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [incomingRequests, setIncomingRequests] = useState<MatchWithProfile[]>([]);
  const [currentMatches, setCurrentMatches] = useState<MatchWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const user_id = localStorage.getItem('user_id') || '';
  const email = localStorage.getItem('email');
  
  const { isProfileComplete, isLoading: profileCheckLoading } = useProfileCheck(email);

  useEffect(() => {
    if (user_id) {  
      fetchMatches();
      fetchUnreadMessages();

      if (socket) {
        socket.emit('joinRoom', user_id);
        
        socket.on('newMessage', () => {
          fetchUnreadMessages();
        });
      }
    }

    return () => {
      if (socket) {
        socket.off('newMessage');
      }
    };
  }, [user_id, socket]);

  const fetchUnreadMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/messages/unread/${user_id}`,
        { withCredentials: true }
      );
      setUnreadMessages(response.data.count);
    } catch (error) {
      console.error('Error fetching unread messages:', error);
    }
  };

  const fetchMatches = async () => {
    try {
      const userMatches = await axios.get<Match[]>(
        `http://localhost:3000/api/match/?user_id=${user_id}`,
        { withCredentials: true }
      );

      const matchedUserIds = new Map(
        userMatches.data.map((match) => [match.matched_user_id, match])
      );

      const matchPromises = Array.from(matchedUserIds.keys()).map(async (matched_user_id) => {
        const matchResponse = await axios.get<Match[]>(
          `http://localhost:3000/api/match/?user_id=${matched_user_id}`,
          { withCredentials: true }
        );

        const profileResponse = await axios.get<Profile>(
          `http://localhost:3000/api/profiles/?user_id=${matched_user_id}`
        );

        const userMatch = matchedUserIds.get(matched_user_id);
        return {
          ...userMatch!,
          profile: profileResponse.data,
          mutualMatch: matchResponse.data.some(
            (m) => m.matched_user_id === user_id && m.status === 'accepted'
          ),
        };
      });

      const resolvedMatches = await Promise.all(matchPromises);

      const incoming = resolvedMatches.filter(
        (match) => match.status === 'pending' && match.mutualMatch
      );
      const current = resolvedMatches.filter(
        (match) => match.status === 'accepted' && match.mutualMatch
      );

      setIncomingRequests(incoming);
      setCurrentMatches(current);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (matchedUserId: string) => {
    try {
      await axios.put(
        `http://localhost:3000/api/match/acceptMatch`,
        {
          user_id: user_id,
          matched_user_id: matchedUserId,
        },
        { withCredentials: true }
      );

      const acceptedMatch = incomingRequests.find(
        (m) => m.matched_user_id === matchedUserId
      );
      if (acceptedMatch) {
        setCurrentMatches((prev) => [...prev, { ...acceptedMatch, status: 'accepted' }]);
        setIncomingRequests((prev) => prev.filter((m) => m.matched_user_id !== matchedUserId));
      }
    } catch (error) {
      console.error('Error accepting match:', error);
    }
  };

  const handleReject = async (matchedUserId: string) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/match/deleteMatch`,
        {
          data: { user_id, matched_user_id: matchedUserId },
          withCredentials: true
        }
      );
      setIncomingRequests((prev) => prev.filter((m) => m.matched_user_id !== matchedUserId));
    } catch (error) {
      console.error('Error rejecting match:', error);
    }
  };

  if (profileCheckLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!isProfileComplete) {
    return (
      <div className="min-h-screen p-6">
        <Banner
          message="Please complete your profile to start matching with others."
          actionLabel="Complete Profile"
          onAction={() => navigate('/profile/edit')}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-background dark:to-gray-900 p-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
            Your Matches
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Discover your perfect match
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="relative hover:scale-105 transition-transform"
            onClick={() => navigate('/messages')}
          >
            <Bell className="h-5 w-5" />
            {unreadMessages > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-purple-500 rounded-full flex items-center justify-center text-[10px] text-white">
                {unreadMessages}
              </span>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Matches</CardTitle>
            <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Heart className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{currentMatches.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Incoming Requests</CardTitle>
            <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
              <Users className="h-4 w-4 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-600">{incomingRequests.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Match Rate</CardTitle>
            <div className="h-8 w-8 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-pink-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-pink-600">
              {currentMatches.length > 0
                ? Math.round((currentMatches.length / (currentMatches.length + incomingRequests.length)) * 100)
                : 0}%
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Matches Section */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="current" className="flex items-center gap-2">
              <Heart className="h-4 w-4" /> Current Matches
            </TabsTrigger>
            <TabsTrigger value="incoming" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Incoming Requests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <ScrollArea className="h-[calc(100vh-26rem)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  <p className="text-center text-gray-500">Loading matches...</p>
                ) : currentMatches.length > 0 ? (
                  currentMatches.map((match) => (
                    <MatchCard
                      key={match.matched_user_id}
                      profile={match.profile!}
                      matchScore={match.match_score}
                      status={match.status}
                      matchedUserId={match.matched_user_id}
                      onAccept={() => {}}
                      onReject={() => {}}
                      onDelete={() => handleReject(match.matched_user_id)}
                    />
                  ))
                ) : (
                  <p className="text-center text-gray-500">No current matches</p>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="incoming">
            <ScrollArea className="h-[calc(100vh-26rem)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  <p className="text-center text-gray-500">Loading requests...</p>
                ) : incomingRequests.length > 0 ? (
                  incomingRequests.map((match) => (
                    <MatchCard
                      key={match.matched_user_id}
                      profile={match.profile!}
                      matchScore={match.match_score}
                      status={match.status}
                      matchedUserId={match.matched_user_id}
                      onAccept={() => handleAccept(match.matched_user_id)}
                      onReject={() => handleReject(match.matched_user_id)}
                      onDelete={() => handleReject(match.matched_user_id)}
                    />
                  ))
                ) : (
                  <p className="text-center text-gray-500">No incoming requests</p>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}