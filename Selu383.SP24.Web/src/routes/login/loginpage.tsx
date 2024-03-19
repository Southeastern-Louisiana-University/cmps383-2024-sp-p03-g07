import React, { useState } from 'react';
import './loginpage.css'; // Import CSS file for styling

const Login: React.FC = () => {
  // State variables to store form input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validate form inputs and handle login logic here
    console.log('Login successful!');
  };

  return (
    <div className="login-container">
      <h2>Log In</h2>
      <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
          <label><strong>Email Address:</strong></label>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label><strong>Password:</strong></label>
          <input type="password" placeholder="Password"value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Log In</button>
      </form>
      <p>Don't have an account? <a href="/signup">Signup</a></p>
    </div>
  );
};

export default Login;
