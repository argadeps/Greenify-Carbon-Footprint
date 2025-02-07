import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import "../index.css";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic, validate credentials

/*    try {
      const response = await fetch('/api/login', { // Make sure this URL matches server route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), //Wheen 
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token in localStorage or sessionStorage
        localStorage.setItem('token', data.token);

        // Redirect to the dashboard
        navigate('/dashboard');
      } else {
        setError(data.message || "Please create an account."); // Show error message if credentials are invalid
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };*/ //to be edited to take in Postgres usernames.
}; 

  return (
    <div className="login-container">
      <h1>GREENIFY</h1>
      <h2>Please enter your details</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <div className="signup-link">
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p> {/* Link to signup page */}
      </div>
    </div>
  );
}

export default Login;
/*Frontend (React):
The user types in the form fields (username and password).
useState stores the entered values.
Backend (Node.js/Express):
On form submission, the frontend sends a POST request to the server with the username and password.
The backend queries PostgreSQL to check if the credentials are valid.
If valid, a response (like a JWT) is sent back. */