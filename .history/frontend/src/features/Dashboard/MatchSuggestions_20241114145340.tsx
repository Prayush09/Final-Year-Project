import React, { useEffect, useState } from 'react';
import matchService from '../../services/matchService';

const MatchSuggestions: React.FC = () => {
  const [suggestedMatches, setSuggestedMatches] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const data = await matchService.getSuggestedMatches();
      setSuggestedMatches(data);
    };
    fetchSuggestions();
  }, []);

  return (
    <div>
      <h2>Suggested Matches</h2>
      {suggestedMatches.map((match) => (
        <div key={match.id}>
          <p>{match.username}</p>
          <button>Accept</button>
          <button>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default MatchSuggestions;
