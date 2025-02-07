import { Outlet } from 'react-router-dom';  // Outlet renders the component based on the route
import './App.css';

function App() {
  return (
    <div>
      <main className="container container-fluid mt-5">
      <Outlet /> {/* This will display the Login, SignUp, or Dashboard component */}
      </main>
    </div>
  );
}

export default App;
