import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CarbonForm from './components/CarbonForm';
import "../index.css";

const Home = () => {
    return (
      <div>
        <h1>Test!</h1>
        <Navbar />
        <Dashboard />
        <CarbonForm />
      </div>
    );
  };

  export default Home;