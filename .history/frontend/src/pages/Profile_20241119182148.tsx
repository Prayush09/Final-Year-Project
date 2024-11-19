import { useState } from 'react';
import { Button } from '@/components/ui/button';


import ViewProfile from '../features/Profile/ProfileView.tsx';
import EditProfile from '../features/Profile/EditProfile.tsx'


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
