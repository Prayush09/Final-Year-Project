import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import Matches from '@/pages/Matches';
import Settings from '@/pages/Settings';
import Login from '@/features/Auth/Login';
import Signup from '@/features/Auth/Signup';
import { ProtectedRoute } from './ProtectedRoute';
import Dashboard from '@/features/Dashboard/Dashboard';

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
          </ProtectedRoute>
        }
      />
      <Route
        path = '/dashboard'
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