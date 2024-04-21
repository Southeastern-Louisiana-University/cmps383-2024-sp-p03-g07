import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './signpage.css'; // Import CSS file for styling

const SignUp: React.FC = () => {
  // State variables to store form input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validate form inputs and handle signup logic here
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!termsAgreed) {
      alert('Please agree to the terms and conditions.');
      return;
    }

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        UserName: username,
        Password: password,
        Roles: ['User'] // Or any other default role you want to set for new users
      })
    });

    if (response.ok) {
      console.log('Signup successful!');
    } else {
      console.log('Failed to Signup!');
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
        <div className="signup-container">
          <h2 className= "perimeter-text">Sign Up</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label><strong>Username:</strong></label>
              <input type="text"  placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
              <label><strong>Password:</strong></label>
              <input type="password" placeholder="Password"value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label><strong>Confirm Password:</strong></label>
              <input type="password" placeholder="Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <input type="checkbox" checked={termsAgreed} onChange={(e) => setTermsAgreed(e.target.checked)} />
              <label>I agree to the Terms and Conditions.</label>
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <p className= "perimeter-text">Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
  );
};

export default SignUp;
