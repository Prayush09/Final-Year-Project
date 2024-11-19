import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import Matches from '@/pages/Matches';
import Settings from '@/pages/Settings';
import Login from '@/features/Auth/Login';
import Signup from '@/features/Auth/Signup';
import { ProtectedRoute } from './ProtectedRoute';
import Dashboard from '@/features/Dashboard/Dashboard';


//TODO: DO the Login and Sign-up pages and connect with backend
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
            <Route path="/profile" element={<Profile />} />
<Route path="/profile/edit" element={<ProfileForm />} />

          </ProtectedRoute>
        }
      />
      <Route
        path = '/dashboard'
        element={
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        }
      />
      <Route
        path="/matches"
        element={
          <ProtectedRoute>
            <Matches />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}