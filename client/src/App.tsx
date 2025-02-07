import { Outlet } from 'react-router-dom';  
import Background from './layouts/Backgrounds'; // Import Background component
import './App.css';

function App() {
  return (
    <div>
      <Background /> {/* Dynamically updates the background */}
      <main className="container container-fluid mt-5">
        <Outlet /> {/* Displays Login, SignUp, or Home */}
      </main>
    </div>
  );
}

export default App;
