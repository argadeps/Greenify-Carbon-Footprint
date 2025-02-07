// src/components/Dashboard.js
import /*React,*/ { useEffect, useState } from 'react';
 

const Dashboard = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Mock fetching user data
    setUsername('John Doe');
  }, []);

  return (
    <div>
      <h1>Welcome Back, {username}</h1>
      {/* Other dashboard content */}
    </div>
  );
};

export default Dashboard;
