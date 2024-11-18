import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import './styles.css';

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
  FormDescription,
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

export default function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: mockUser as ProfileFormValues,
  });

  function onSubmit(data: ProfileFormValues) {
    toast.success('Profile updated successfully!');
    console.log(data);
    setIsEditing(false);
  }

  return (
    <>
    <div> 

    </div>

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
                          disabled={!isEditing}
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
                      <Select
                        disabled={!isEditing}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                        disabled={!isEditing}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Share your interests, lifestyle, and what makes you a great roommate.
                    </FormDescription>
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
                        <div className="space-y-2">
                          <Slider
                            disabled={!isEditing}
                            min={1}
                            max={5}
                            step={1}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Relaxed</span>
                            <span>Very Clean</span>
                          </div>
                        </div>
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
                        <div className="space-y-2">
                          <Slider
                            disabled={!isEditing}
                            min={1}
                            max={5}
                            step={1}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Need Quiet</span>
                            <span>Very Tolerant</span>
                          </div>
                        </div>
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
                      <Select
                        disabled={!isEditing}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                          disabled={!isEditing}
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
                      <Select
                        disabled={!isEditing}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                {isEditing ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
