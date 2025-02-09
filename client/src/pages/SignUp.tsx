import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import { AuthContext } from '../context/authContext'; // Import AuthContext
import "../index.css";

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>(''); // State for error message
  const navigate = useNavigate();

  // Accessing AuthContext and ensuring it's not null
  const authContext = useContext(AuthContext);

  // If the AuthContext is not available, throw an error (ensure context is available)
  if (!authContext) {
    throw new Error('AuthContext is not available');
  }

  const { login } = authContext; // Now use the login function from the context directly

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Clear previous error
    setError('');

    try {
      // Sending POST request to create user
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // If signup is successful, store the token using the AuthContext login method
        if (data.token) {
          login(data.userData, data.token); // Pass the received token to the login function from AuthContext
        }

        // Redirect to Home page after successful sign up
        navigate('/home');
      } else {
        setError(data.message || 'Failed to sign up. Please try again.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
      <h1>GREENIFY</h1>
      <h2>Create a new account</h2>
      {error && <p className="error">{error}</p>} {/* Display error message */}
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
