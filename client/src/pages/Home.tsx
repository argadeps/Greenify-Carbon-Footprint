import { useContext } from 'react';
import Navbar from '../components/Navbar';
import CarbonForm from '../components/CarbonForm';
import { AuthContext } from '../context/authContext'; // Import AuthContext
import "../index.css";
import Dashboard from '../components/Dashboard';

const Home = () => {
    const authContext = useContext(AuthContext); // Accessing AuthContext

    // Ensure AuthContext is available
    if (!authContext) {
        throw new Error('AuthContext is not available');
    }

    return (
        <div>
            <Navbar /> {/* Navbar contains the logout button */}
            
            <div>
                <Dashboard />
                <CarbonForm /> 
                {/* Add any content/components to sit inside Home page */}
               
                {/* <CarbonForm /> Add any content/components to sit inside Home page */}
            </div>
        </div>
    );
};

export default Home;
