import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from './api';

const Signup = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const device_id = localStorage.getItem('device_id');
    const response = await register(username, password, device_id);
    if (response.message === 'User registered successfully') {
      setLoggedIn(true);
      localStorage.setItem('username', username);
      localStorage.setItem('device_id', response.device_id); // Save device_id to local storage
      navigate('/'); // Redirect to homepage after successful signup
    } else {
      alert(response.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
