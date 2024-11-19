import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

export default function ViewProfile() {
  const [user, setUser] = useState<any>(null);

  const user_id = localStorage.getItem("user_id");
  console.log("user ki id hai kya?", user_id);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/profiles/?user_id=${user_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch user data", error);
      });
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="relative">
        {/* Moving Border Container */}
        <div className="absolute -inset-[2px] rounded-lg">
          <div className="absolute inset-0 rounded-lg bg-[conic-gradient(from_0deg_at_50%_50%,#FF1CF7_0%,#53E3FA_25%,#FF1CF7_50%,#53E3FA_75%,#FF1CF7_100%)] animate-border-rotate" />
          <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.8)_60%)] animate-border-lights" />
        </div>
        
        {/* Card */}
        <Card className="relative bg-white dark:bg-gray-900/95 shadow-xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Your Profile</CardTitle>
            <CardDescription>
              Keep your profile information up to date to find the best roommate matches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold">Age:</h3>
                  <p className="text-violet-600 dark:text-violet-300">{user.age}</p>
                </div>

                <div>
                  <h3 className="font-semibold">Gender:</h3>
                  <p className="text-violet-600 dark:text-violet-300">{user.gender}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold">About Me:</h3>
                <p className="text-violet-600 dark:text-violet-300">{user.bio}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold">Cleanliness Level:</h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Messy</span>
                    <Slider
                      value={[user.cleanliness]}
                      min={1}
                      max={5}
                      step={1}
                      disabled
                      className="w-full"
                    />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Spotless</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold">Noise Tolerance:</h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Silent</span>
                    <Slider
                      value={[user.noise_tolerance]}
                      min={1}
                      max={5}
                      step={1}
                      disabled
                      className="w-full"
                    />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Very Tolerant
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold">Sleep Schedule:</h3>
                  <p className="text-violet-600 dark:text-violet-300">{user.sleep_schedule}</p>
                </div>

                <div>
                  <h3 className="font-semibold">Monthly Budget (₹):</h3>
                  <p className="text-violet-600 dark:text-violet-300">{user.budget}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Preferred City:</h3>
                <p className="text-violet-600 dark:text-violet-300">
                  {user.location_preferences}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}