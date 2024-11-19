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
        withCredentials: true, // Ensure to send credentials (cookies) with the request if needed
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data); // Set user data from the response
      })
      .catch((error) => {
        console.error("Failed to fetch user data", error);
      });
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="relative overflow-hidden"> {/* Added overflow-hidden */}
        {/* Spinning Gradient Effect */}
        <div className="absolute inset-0 z-0 rounded-lg bg-gradient-to-r from-violet-500 via-blue-500 to-indigo-500 animate-spin-slow"></div>

        {/* Card */}
        <Card className="relative profile-container bg-white dark:bg-transparent shadow-xl">
          {/* ... rest of your card content ... */}
        </Card>
      </div>
    </div>
  );
}