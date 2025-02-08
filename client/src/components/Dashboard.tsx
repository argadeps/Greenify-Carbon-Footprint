// src/components/Dashboard.js
import { useEffect, useState } from 'react';
 

const Dashboard = () {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch user data from backend
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` },
        
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          alert('Unable to fetch user data');
        }
      };
  
      fetchUserData();
    }, []);

  return (
    <div>
      <div id="greeting-container">
        <h1 id="greeting">Welcome Back, {username}!</h1>
        <hr id="line" />
      </div>
      {/* Other dashboard content */}
    </div>
  );
};

export default Dashboard;
