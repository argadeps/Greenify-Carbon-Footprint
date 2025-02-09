import { useLocation } from 'react-router-dom';
import './Backgrounds.css';

function Background() {
  const location = useLocation();

  let backgroundStyle = {};

  if (location.pathname === '/login') {
    // Login Page Background
    backgroundStyle = { backgroundImage: "url('/assets/images/wallpaper.jpg')" };
  } else if (location.pathname === '/signup') {
    // Sign-Up Page Background
    backgroundStyle = { backgroundImage: "url('/assets/images/bgcolor.png')" };
  }

  return <div className="background-container" style={backgroundStyle}></div>;
}

export default Background;
