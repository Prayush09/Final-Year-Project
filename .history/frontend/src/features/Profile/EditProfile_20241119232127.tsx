import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React from 'react';

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
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@/components/ui/loader.tsx'; // Importing the Loader component



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
  location_preferences: 'Mumbai',
};



export default function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: mockUser as ProfileFormValues,
  });

  

  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false); // State to track loading

  async function onSubmit(data: ProfileFormValues) {
    const email = localStorage.getItem("email"); // Extract email from localStorage
    console.log("Email:", email);
    
    if (!email) {
      toast.error("User not logged in");
      return; // Stop execution if user is not logged in
    }
    //TODO: CREATE A NEW PROFILE FORM SO THAT You can create a field there and then use this one to edit profile.
    const url = `http://localhost:3000/api/users/userId?email=${email}`;
  
    try {
      // Fetch the user_id from the backend
      const response = await axios.get(url);
      
      // Append user_id to the data object
      const dataWithUserId = { ...data, user_id };
      console.log(dataWithUserId);
      setLoading(true); // Show loading state before making the API call
  
      // Send the updated data object to the backend
      await axios.put("http://localhost:3000/api/profiles/update", dataWithUserId, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
  
      toast.success("Profile updated successfully!");
      navigate("/profile"); // Redirect to profile page on success
    } catch (error) {
      // Handle errors
        toast.error("Failed to update profile");
      } 
    finally {
      setLoading(false); // Reset loading state after completion
    }
  }
  

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your gender" />
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
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About Me</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell potential roommates about yourself..."
                        className="resize-none h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="cleanliness"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cleanliness Level</FormLabel>
                      <FormControl>
                        <Slider
                          min={1}
                          max={5}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="noise_tolerance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Noise Tolerance</FormLabel>
                      <FormControl>
                        <Slider
                          min={1}
                          max={5}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sleep_schedule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sleep Schedule</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your sleep schedule" />
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

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Budget (₹)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location_preferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred City</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your preferred city" />
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
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button type="submit" disabled={loading}>
                  {loading ? <Loader /> : 'Save Changes'} {/* Show Loader if loading */}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
