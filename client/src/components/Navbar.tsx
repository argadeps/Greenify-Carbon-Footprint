import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav 
      className="d-flex justify-content-between align-items-center position-fixed w-100" 
      style={{ top: 0, left: 0, backgroundColor: '#86A37C', padding: '10px 20px' }}
    >
      {/* Logo on the left, centered vertically */}
      <div className="d-flex justify-content-start">
        <img id="logo" src="/assets/images/logo.png" alt="Logo" style={{ width: '70px', height: 'auto' }} />
      </div>

      {/* Exit logo on the right */}
      <div className="d-flex justify-content-end">
        <Link to="/" className="text-white">
          <img id="exit-logo" src="/assets/images/exitlogo.png" alt="Exit Logo" style={{ width: '90px', height: 'auto' }} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
