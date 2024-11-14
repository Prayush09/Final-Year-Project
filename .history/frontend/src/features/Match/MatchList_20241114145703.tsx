import React, { useEffect, useState } from 'react';
import matchService from '../../services/matchService';
import MatchItem from './MatchItem';

const MatchList: React.FC = () => {

  //use 

  return (
    <div>
      <h2>Your Matches</h2>
      {matches.map((match) => (
        <MatchItem key={match.id} match={match} />
      ))}
    </div>
  );
};

export default MatchList;
