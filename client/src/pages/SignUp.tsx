import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useNavigate } from 'react-router-dom';
import "../index.css";


function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!username || !email || !password) {
    setError('Please fill in all fields');
    return;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic, validate credentials Sending a POST reqest to api/user
    /*Frontend sends a POST request to /api/user with the username, email, and password.
      Backend checks if the username/email exists and, if not, stores the new user.
      Sends a success or error message */
      
/*    try {
      const response = await fetch('/api/user', { //  Make sure this URL matches server route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store JWT token if returned
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        
        // Redirect to the Home page  
        navigate('/Home');
      } else {
        setError(data.message || 'Failed to sign up. Please try again.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };
  };*/ //to be edited to take in Postgres data.
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