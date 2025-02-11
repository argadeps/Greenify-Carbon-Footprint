import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import "../index.css";
const Dashboard = () => {
    const [username, setUsername] = useState('John Doe'); // Set a temporary username
    const authContext = useContext(AuthContext);
    // Early return if authContext is unavailable (e.g., during initial render)
    if (!authContext)
        return <p>Loading...</p>;
    const { user } = authContext;
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/api/dashboard', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username);
                }
                else {
                    console.error('Unable to fetch user data');
                }
            }
            catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        // Only fetch user data if the user is authenticated
        if (user) {
            fetchUserData();
        }
    }, [user]); // Run the effect when the user changes
    return (<div id="greeting">
      <h1>Welcome Back, {username}!</h1>
      {/* Add any other dashboard content here */}
    </div>);
};
export default Dashboard;
