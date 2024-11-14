import React from 'react';
import MatchSuggestions from '../features/Dashboard/MatchSuggestions';
import Dashboard from '@/features/Dashboard/Dashboard';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <MatchSuggestions />
    </div>
  );
};

export default Dashboard;
