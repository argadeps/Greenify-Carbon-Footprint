import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import { AuthContext } from "../context/authContext"; // Import AuthContext
import "../index.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>(""); // State for error message
  const navigate = useNavigate();

  // Accessing AuthContext and ensuring it's not null
  const authContext = useContext(AuthContext);

  // If the AuthContext is not available, throw an error (ensure context is available)
  if (!authContext) {
    throw new Error("AuthContext is not available");
  }

  const { login } = authContext; // Now use the login function from the context directly

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset the error on new submission
    navigate("/Home"); // Navigate to the Home page
    /* if (!username || !password) {
      setError("Please fill in the form");
      return;
    } */
    //navigate('/Home');  // Navigate to the Home page
    // Handle login logic, validate credentials
    /* Frontend sends a POST request to /api/user with the username and password.
       Backend verifies credentials.
       If successful, sends back a JWT token. */

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // If authentication is successful, store the token using the AuthContext login method
        login(data.userData, data.token); // Pass the received token to the login function from AuthContext
        navigate("/home"); // Navigate to the Home page
      } else {
        // Handle any errors, such as invalid credentials
        setError(
          data.message ||
            "Invalid login credentials. Either sign up or try again."
        ); // Set the error message
        console.error(data.message); // Or set error state to show message
      }
    } catch (err) {
      console.error("Error during login:", err); //To add a ui error.
      setError("An error occurred during login. Please try again later.");
    }
  }; //TO BE edited

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
        <button type="submit">Sign In</button>{" "}
        {/* When clicked, form is submitted and user is navigated */}
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Display error message */}
      </form>
      <div className="signup-link">
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>{" "}
        {/* Link to signup page */}
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
If valid, a response (like a JWT) is sent back.

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
  font-weight: bold;
}

could add 
 const [loading, setLoading] = useState(false);)
 setLoading(true); // Show loading spinner
 } finally {
 setLoading(false); // Hide loading spinner
 disabled={loading}*/
