import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ViewProfile from '../features/Profile/ProfileView.tsx';
import { useNavigate } from 'react-router-dom';


export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-6">
        <ViewProfile />
        <div className="flex justify-end pt-6">
          <Button onClick={() => navigate("/profile/edit")}>Edit Profile</Button>
        </div>
    </div>
  );
}
