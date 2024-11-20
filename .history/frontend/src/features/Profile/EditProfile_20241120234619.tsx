import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';


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
  "Pune",
] as const;

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name cannot exceed 100 characters'),
  age: z
    .string()
    .min(1, 'Age is required')
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value) && value >= 18 && value <= 100, 'Must be between 18 and 100'),
  gender: z.enum(['male', 'female', 'other']),
  bio: z.string().min(10, 'Bio must be at least 10 characters long').max(500),
  cleanliness: z.number().min(1).max(5),
  noise_tolerance: z.number().min(1).max(5),
  sleep_schedule: z.enum(['Night Owl', 'Morning Bird']),
  budget: z
    .string()
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value) && value >= 1000, 'Budget must be at least 1000'),
  location_preferences: z.enum(indianCities),
});


type ProfileFormValues = z.infer<typeof profileSchema>;

export default function EditProfile() {
    
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
  "Pune",
] as const;

const profileSchema = z.object({
  name: z.string({required_error:'Please enter you name!'}),
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

const form = useForm<ProfileFormValues>({
  resolver: zodResolver(profileSchema),
  defaultValues: {
    name: 'Update Profile',
    age: 18,
    gender: 'other',
    bio: 'Please update your profile!',
    cleanliness: 4,
    noise_tolerance: 2,
    sleep_schedule: 'Night Owl',
    budget: 1000,
    location_preferences: 'Mumbai',
  },
});

  const navigate = useNavigate();
  const [isProfileComplete, setProfileComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      toast.error('User not logged in');
      return;
    }

    axios
      .get(`http://localhost:3000/api/users/userId?email=${email}`)
      .then((response) => {
        setProfileComplete(response.data.profile_completed);
        console.log(response.data.profile_completed);
        if (response.data.profile_completed) {
          // Pre-fill the form with existing profile data
          form.reset(response.data.profile);
        }
      })
      .catch((error) => {
        console.error('Error fetching profile status', error);
        toast.error('Failed to load profile data');
      });
  }, [form]);

  async function onSubmit(data: ProfileFormValues) {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      toast.error('User ID not found');
      return;
    }

    const endpoint = isProfileComplete
      ? `http://localhost:3000/api/profiles/update?user_id=${userId}`
      : `http://localhost:3000/api/profiles/create?user_id=${userId}`;

    try {
      setLoading(true);
      const method = isProfileComplete ? axios.put : axios.post;
      await method(endpoint, data, { withCredentials: true });
      toast.success('Profile saved successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Failed to save profile', error);
      toast.error('Failed to save profile');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="profile-container bg-white dark:bg-black shadow-xl">
        <CardHeader>
          <CardTitle>{isProfileComplete ? 'Edit Profile' : 'Create Profile'}</CardTitle>
          <CardDescription>
            {isProfileComplete
              ? 'Update your profile information to find better matches.'
              : 'Complete your profile to get started with finding your perfect roommate.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Age */}
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bio */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Tell us about yourself" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cleanliness */}
              <FormField
                control={form.control}
                name="cleanliness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cleanliness Level</FormLabel>
                    <Slider
                      defaultValue={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      min={1}
                      max={5}
                      step={1}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Noise Tolerance */}
              <FormField
                control={form.control}
                name="noise_tolerance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Noise Tolerance</FormLabel>
                    <Slider
                      defaultValue={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      min={1}
                      max={5}
                      step={1}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sleep Schedule */}
              <FormField
                control={form.control}
                name="sleep_schedule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sleep Schedule</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sleep schedule" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Night Owl">Night Owl</SelectItem>
                        <SelectItem value="Morning Bird">Morning Bird</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Budget */}
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location Preferences */}
              <FormField
                control={form.control}
                name="location_preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {indianCities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="mt-6">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Profile'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
