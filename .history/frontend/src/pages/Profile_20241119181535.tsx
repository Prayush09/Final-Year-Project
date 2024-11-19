import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ViewProfile from '../features/Profile/ProfileView.tsx';
import EditProfile from '../features/Profile/EditProfile.tsx';

// Initial mock user data
const initialUserData = {
  age: 25,
  gender: 'male',
  bio: 'A friendly and organized person looking for like-minded roommates.',
  cleanliness: 4,
  noise_tolerance: 3,
  sleep_schedule: 'Night Owl',
  budget: 15000,
  location_preferences: 'Mumbai',
};

export default function Profile() {
  const [userData, setUserData] = useState(initialUserData); // Store user data in state
  const [isEditing, setIsEditing] = useState(false);

  const handleProfileUpdate = (updatedData: typeof userData) => {
    setUserData(updatedData); // Update user data when edited
    setIsEditing(false); // Switch back to viewing mode
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {isEditing ? (
        // Pass current user data to EditProfile to allow editing
        <EditProfile userData={userData} onProfileUpdate={handleProfileUpdate} />
      ) : (
        // Pass user data to ViewProfile to display the information
        <ViewProfile userData={userData} />
      )}

      <div className="flex justify-end pt-6">
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>
    </div>
  );
}
