import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/authContext'; // Import AuthContext
import CarbonForm from '../components/CarbonForm';
import Dashboard from '../components/Dashboard';
import "../index.css";

const Home = () => {
  const { user } = useContext(AuthContext); // Check if user is logged in

  return (
    <div>
      <Navbar /> {/* Navbar contains the logout button */}

      {user ? (
        // Show Dashboard & CarbonForm if user is authenticated
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
          <Dashboard />
          <CarbonForm />
        </div>
      ) : (
        // Show login/signup options if not authenticated
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold">Welcome to Greenify!</h1>
          <p className="mt-4 text-lg">Track your environmental impact and make a difference.</p>
          <div className="mt-6">
            <Link to="/login" className="bg-green-500 text-white px-4 py-2 rounded-md mr-4">Login</Link>
            <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-md">Sign Up</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;