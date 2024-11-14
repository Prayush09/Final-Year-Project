import React, { useState } from 'react';
import authService from '../../services/authService';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await authService.signup({ username, email, password });
      // Redirect or update UI after signup
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
