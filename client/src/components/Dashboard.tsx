// src/components/Dashboard.js
import { useEffect, useState } from 'react';
 

const Dashboard = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Mock fetching user data
    setUsername('John Doe');
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
