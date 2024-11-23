import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import Matches from '@/pages/Matches';
import Settings from '@/pages/Settings';
import Login from '@/features/Auth/Login';
import Signup from '@/features/Auth/Signup';
import { ProtectedRoute } from './ProtectedRoute';
import Dashboard from '@/features/Dashboard/Dashboard';
import ProfileForm from '@/features/Profile/EditProfile';
import MessageInterface from '@/features/Message/MessageInterface';
import { SocketProvider } from '@/contexts/SocketContext'; // Import the SocketProvider

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/edit" element={<ProfileForm />} />
      <Route path="/messages/:receiverId" element={<MessageInterface />} />
      
      {/* Wrap only the Dashboard component with SocketProvider */}
      <Route
        path="/dashboard"
        element={
          <SocketProvider>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </SocketProvider>
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
