import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import axios from 'axios';

import ViewProfile from '../features/Profile/ProfileView.tsx';
import EditProfile from '../features/Profile/EditProfile.tsx'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form
} from '@/components/ui/form';

import { toast } from 'sonner';

const indianCities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Jaipur",
  "Lucknow",
  "Hyderabad",
  "Ahmedabad",
  "Pune"
] as const;

const profileSchema = z.object({
  age: z.number().min(18, 'Must be at least 18 years old').max(100),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select a gender',
  }),
  bio: z.string().min(10, 'Bio must be at least 10 characters').max(500),
  cleanliness: z.number().min(1).max(5),
  noise_tolerance: z.number().min(1).max(5),
  sleep_schedule: z.enum(['Night Owl', 'Morning Bird'], {
    required_error: 'Please select your sleep schedule',
  }),
  budget: z.number().min(1000, 'Minimum budget is ₹1,000'),
  location_preferences: z.enum(indianCities, {
    required_error: 'Please select a city',
  }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

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
       <EditProfile userData={mockUser}/>
      ) : (
        <ViewProfile userData={mockUser} />
      )}

      {!isEditing && (
        <div className="flex justify-end pt-6">
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        </div>
      )}
    </div>
  );
}
