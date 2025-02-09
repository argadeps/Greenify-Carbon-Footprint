import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { logout } = authContext;

  return (
    <nav 
      id= "navbar" className="d-flex justify-content-between align-items-center position-fixed w-100" 
    >
      {/* Logo on the left, centered vertically */}
      <div className="d-flex justify-content-start">
        <img id="logo" src="/assets/images/logo.png" alt="Logo" style={{ width: '70px', height: 'auto' }} />
      </div>

      {/* Exit logo on the right */}
      <div className="d-flex justify-content-end">
        <Link to="/" className="text-white">
          <img 
            id="exit-logo" 
            src="/assets/images/exitlogo.png" 
            alt="Exit Logo" 
            style={{ width: '90px', height: 'auto', cursor: 'pointer' }} 
            onClick={logout}  // This makes the image clickable and triggers the logout
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
