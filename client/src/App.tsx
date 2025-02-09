import { Outlet } from 'react-router-dom';
import Background from './layouts/Backgrounds'; // Import Background component
import './App.css';
import { AuthProvider } from './context/authContext';

function App() {
  return (
    <div>
      <AuthProvider> {/* Wrap the layout and routes with AuthProvider */}
        <Background /> {/* Dynamically updates the background */}
        <main className="container container-fluid mt-5">
          <Outlet /> {/* Displays Login, SignUp, or Home */}
        </main>
      </AuthProvider>
    </div>
  );
}

export default App;
