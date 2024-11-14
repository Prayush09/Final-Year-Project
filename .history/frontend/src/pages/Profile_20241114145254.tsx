import React from 'react';
import ProfileView from '../features/Profile/ProfileView';
import EditProfile from '../features/Profile/EditProfile';

const Profile: React.FC = () => {
  return (
    <div>
      <h1>Profile</h1>
      <ProfileView />
      <EditProfile />
    </div>
  );
};

export default Profile;
