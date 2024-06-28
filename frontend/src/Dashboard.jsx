import React, { useEffect, useState } from 'react';
import { logout, getSessions } from './api';

const Dashboard = ({ setLoggedIn }) => {
  const [deviceIds, setDeviceIds] = useState([]);
  const username = localStorage.getItem('username');
  const curr_device_id = localStorage.getItem('device_id');

  useEffect(() => {
    const fetchSessions = async () => {
      const response = await getSessions(username);
      if (response.device_ids) {
        setDeviceIds(response.device_ids);
      } else {
        console.log(response.message);
      }
    };

    fetchSessions();
  }, [username]);

  const handleLogout = async () => {
    const device_id = localStorage.getItem('device_id');
    const response = await logout(username, device_id);
    if (response.message === 'Logged out successfully') {
      localStorage.removeItem('device_id');
      setLoggedIn(false);
    } else {
      alert(response.message);
    }
  };

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <h2>Current Device: {curr_device_id}</h2>
      <h2>Active Devices</h2>
      <ul>
        {Array.isArray(deviceIds) ? (
          deviceIds.map((id) => (
            <li key={id}>{id}</li>
          ))
        ) : (
          <li>No active devices</li>
        )}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
