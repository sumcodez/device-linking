import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login'
import Dashboard from './Dashboard'
import Signup from './Signup'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={loggedIn ? <Dashboard setLoggedIn={setLoggedIn} /> : <Login setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} />} />
      </Routes>
    </Router>
  )
}

export default App
