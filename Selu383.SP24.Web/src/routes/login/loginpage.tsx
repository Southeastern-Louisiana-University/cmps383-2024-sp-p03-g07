import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './loginpage.css'; // Import CSS file for styling

const Login: React.FC = () => {
  // State variables to store form input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('/api/authentication/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        UserName: username,
        Password: password
      })
    });

    if (response.ok) {
      // Assuming the response of a successful login is the token
      const data = await response.json();
      localStorage.setItem('token', data.token);
      // Save the username to local storage
      localStorage.setItem('username', username);
      localStorage.setItem('userId', data.userId);
      console.log('Login successful!');
      // Redirect to home page or any other desired page
      window.location.href = '/';
    } else {
      console.log('Failed to login!');
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Enstay</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <Link className="nav-item nav-link" to="/login">Login</Link>
              <Link className="nav-item nav-link" to="/signup">Sign-Up</Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="login-container">
        <h2>Log In</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label><strong>Username:</strong></label>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label><strong>Password:</strong></label>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Log In</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
      </div>
    </div>
  );
};

export default Login;
