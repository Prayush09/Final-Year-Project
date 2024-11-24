  import { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import { Input } from '@/components/ui/input';
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
  import { Label } from '@/components/ui/label';
  import { Loader2 } from 'lucide-react';
  import { motion } from 'framer-motion';
  import { MatchCard } from '../features/Match/MatchCard.tsx';

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

  export default function Matches() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [profiles, setProfiles] = useState<Map<string, Profile>>(new Map());
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('compatibility');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const user_id = localStorage.getItem('user_id');

    useEffect(() => {
      fetchMatches();
      const intervalId = setInterval(createMatchesInBackground, 10000);

      return () => clearInterval(intervalId);
    }, []);

    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/match/?user_id=${user_id}`,
          { withCredentials: true }
        );
        const fetchedMatches = response.data;
        setMatches(fetchedMatches.filter((match: any) => match.status === 'pending'));
        await fetchProfilesForMatches(fetchedMatches);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProfilesForMatches = async (matches: Match[]) => {
      try {
        const profilesData = await Promise.all(
          matches
            .filter((match) => match.status === 'pending')
            .map(async (match) => {
              const response = await axios.get(
                `http://localhost:3000/api/profiles/?user_id=${match.matched_user_id}`
              );
              return {
                matched_user_id: match.matched_user_id,
                profile: response.data,
              };
            })
        );

        const profilesMap = new Map(
          profilesData.map((data) => [data.matched_user_id, data.profile])
        );
        setProfiles(profilesMap);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    const createMatchesInBackground = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/match/find?user_id=${user_id}`,
          null,
          { withCredentials: true }
        );
        if (response.data.newMatchesCreated) fetchMatches();
      } catch (error) {
        console.error('Error creating matches in the background:', error);
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
        setMatches((prev) =>
          prev.filter((match) => match.matched_user_id !== matchedUserId)
        );
      } catch (error) {
        console.error('Error accepting match:', error);
      }
    };

    const handleReject = async (matchedUserId: string) => {
      try {
        await axios.put(
          `http://localhost:3000/api/match/rejectMatch?user_id=${user_id}&matched_user_id=${matchedUserId}`,
          null,
          { withCredentials: true }
        );
        setMatches((prev) =>
          prev.filter((match) => match.matched_user_id !== matchedUserId)
        );
      } catch (error) {
        console.error('Error rejecting match:', error);
      }
    };

    const filteredMatches = matches.filter((match) => {
      const profile = profiles.get(match.matched_user_id);
      if (!profile) return false;

      const matchesSearchQuery =
        profile.name.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        profile.location_preferences
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesSearchQuery;
    });

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="text-gray-700 dark:text-gray-300">
                Search
              </Label>
              <Input
                id="search"
                placeholder="Search by name or location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 text-white"
              />
            </div>
            <div className="w-full sm:w-48">
              <Label htmlFor="filter" className="text-gray-700 dark:text-gray-300">
                Filter By
              </Label>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger id="filter">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compatibility">
                    Highest Compatibility
                  </SelectItem>
                  <SelectItem value="age">Age</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredMatches.map((match) => {
            const profile = profiles.get(match.matched_user_id);
            if (!profile) return null;

            return (
              <MatchCard
                matchedUserId={match.matched_user_id}
                profile={profile}
                matchScore={match.match_score}
                status={match.status}
                onAccept={() => handleAccept(match.matched_user_id)}
                onReject={() => handleReject(match.matched_user_id)}
                onDelete={() => null}
              />
            );
          })}
        </motion.div>
      </div>
    );
  }


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
  
  interface Match {
    user_id: string;
    matched_user_id: string;
    match_score: number;
    status: 'pending' | 'accepted' | 'rejected';
  }
  
  interface Profile {
    name: string | null; // Allowing name to be null to prevent errors
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
            withCredentials: true,
          }
        );
        setIncomingRequests((prev) => prev.filter((m) => m.matched_user_id !== matchedUserId));
      } catch (error) {
        console.error('Error rejecting match:', error);
      }
    };
  
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
            <p className="text-gray-600 dark:text-gray-400 mt-2">Discover your perfect match</p>
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
          {/* ... Stats Components */}
        </motion.div>
  
        {/* Matches Section */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="current" className="w-full">
            {/* ... Tabs Implementation */}
          </Tabs>
        </motion.div>
      </motion.div>
    );
  }
  