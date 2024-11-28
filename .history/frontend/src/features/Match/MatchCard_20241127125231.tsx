import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleCheckBig, X, ChevronDown, ChevronUp } from 'lucide-react';
import { MessageButton } from '../Message/MessageButton';

interface Profile {
  name: string;
  age: number;
  gender: string;
  location_preferences: string;
  bio: string;
}

interface MatchCardProps {
  
  profile: Profile;
  matchScore: number;
  status: string;
  matchedUserId: string;
  onAccept: () => void;
  onReject: () => void;
  onDelete: () => void;
}

export function MatchCard({
  profile,
  matchScore,
  status,
  matchedUserId,
  onAccept,
  onReject,
  onDelete,
}: MatchCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  //TODO: ADD GENERIC PHOTO FOR MALE AND FEMALE...
  const getAnimatedAvatar = (gender: string) => {
    return gender.toLowerCase() === 'female'
      ? 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ31b0G1cbX8SoqSehU27e1FwhkfSlPXQxaZA&s';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <motion.div
            className="cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="relative">
              <motion.img
                src={getAnimatedAvatar(profile.gender)}
                alt={profile.name}
                className="w-full h-48 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full">
                {matchScore}% Match
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">
                  {profile.name}, {profile.age}
                </h3>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </motion.div>
              </div>
              <p className="text-muted-foreground mt-1">
                {profile.location_preferences}
              </p>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6"
                >
                  <p className="text-sm leading-relaxed">{profile.bio}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-6 pt-0 flex flex-col gap-3">
              {status === 'pending' ? (
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-green-500 hover:bg-green-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAccept();
                    }}
                  >
                    <CircleCheckBig className="w-4 h-4 mr-2" />
                    Accept
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      onReject();
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              ) : (
                <MessageButton receiverId={matchedUserId} />
              )}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}