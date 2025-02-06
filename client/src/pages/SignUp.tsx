import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import "../index.css";


function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic, validate credentials

/*    try {
      const response = await fetch('/api/login', { // Make sure this URL matches your server route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token in localStorage or sessionStorage
        localStorage.setItem('token', data.token);

        // Redirect to the dashboard or another page
        navigate('/dashboard');
      } else {
        setError(data.message); // Show error message if credentials are invalid
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };*/ //to be edited to take in Postgres usernames.
}; 

return (
    <div className="signup-container">
      <h1>GREENIFY</h1>
      <h2>Create a new account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <div className="login-link">
        <p>Already have an account? <Link to="/">Log in</Link></p> {/* Link back to login page */}
      </div>
    </div>
  );
}

export default SignUp;