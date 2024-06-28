const API_URL = 'http://localhost:5000';

export const register = async (username, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

// export const login = async (username, password, device_id) => {
//   const response = await fetch(`${API_URL}/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ username, password, device_id }),
//   });
//   return response.json();
// };

export const login = async (username, password, device_id) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, device_id }),
    });
    return response.json();
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

export const logout = async (username, device_id) => {
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, device_id }),
  });
  return response.json();
};

export const getSessions = async (username) => {
  const response = await fetch(`${API_URL}/sessions?username=${username}`);
  return response.json();
};
