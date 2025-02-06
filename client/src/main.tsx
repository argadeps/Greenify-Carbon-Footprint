import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'; // Import global CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import bootstrap for global styling

import App from './App'; // Main layout component
import Login from './pages/Login'; // Login page component
import SignUp from './pages/SignUp'; // Sign-up page component
//import Dashboard from './components/Dashboard'; // Dashboard page component
import ErrorPage from './pages/ErrorPage'; // Fallback error page component

// Define the router
const router = createBrowserRouter([
  {
    path: '/', // Default route is login page
    element: <App />, // App is the main layout
    errorElement: <ErrorPage />, // Error page for invalid routes
    children: [
      {
        index: true, // Default route points to Login page
        element: <Login />,
      },
      {
        path: '/signup', // Route for sign-up page
        element: <SignUp />, // This will load the SignUp component
      },
      /*{
        path: '/dashboard', // Route for dashboard page
        element: <Dashboard />,
      }, */
    ]
  }
]);

// Render the app with the router provider
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
