import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './api';
import { v4 as uuid } from 'uuid';

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const device_id = localStorage.getItem('device_id');
    localStorage.setItem('device_id', device_id); // Store device_id in local storage
    const response = await login(username, password, device_id);
    console.log("Login API response", response);
    if (response.message === 'Logged in successfully') {
      localStorage.setItem('username', username);
      setLoggedIn(true);
      navigate('/'); // Redirect to homepage after successful login
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
