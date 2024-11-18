import { useState } from 'react';
import { Button } from '@/components/ui/button';
import './styles.css';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';


export default function ProfilePage(User) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="profile-container bg-white dark:bg-transparent shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Your Profile
          </CardTitle>
          <CardDescription>
            Keep your profile information up to date to find the best roommate matches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold">Age:</h3>
                <p>{User.age}</p>
              </div>

              <div>
                <h3 className="font-semibold">Gender:</h3>
                <p>{User.gender}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">About Me:</h3>
              <p>{User.bio}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold">Cleanliness Level:</h3>
                <p>{User.cleanliness}</p>
              </div>

              <div>
                <h3 className="font-semibold">Noise Tolerance:</h3>
                <p>{User.noise_tolerance}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold">Sleep Schedule:</h3>
                <p>{User.sleep_schedule}</p>
              </div>

              <div>
                <h3 className="font-semibold">Monthly Budget (₹):</h3>
                <p>{mockUser.budget}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Preferred City:</h3>
              <p>{mockUser.location_preferences}</p>
            </div>

            <div className="flex justify-end pt-6">
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
