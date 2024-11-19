import { useState } from 'react';
import { Button } from '@/components/ui/button';


import ViewProfile from '../features/Profile/ProfileView.tsx';
import EditProfile from '../features/Profile/EditProfile.tsx'


// Mock user data
const mockUser = {
  age: 25,
  gender: 'male',
  bio: 'A friendly and organized person looking for like-minded roommates.',
  cleanliness: 4,
  noise_tolerance: 3,
  sleep_schedule: 'Night Owl',
  budget: 15000,
  location_preferences: 'Mumbai'
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {isEditing ? (
       <EditProfile />
      ) : (
        <ViewProfile />
      )}

      {!isEditing && (
        <div className="flex justify-end pt-6">
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        </div>
      )}
    </div>
  );
}
