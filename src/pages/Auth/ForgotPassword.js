// --- File: src/pages/Auth/ForgotPassword.js (New UI) ---

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import the new CSS file and assets
import './ForgotPassword.css';
import logo from '../../assets/logo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    // This is your existing API call simulation logic
    setTimeout(() => {
      setIsLoading(false);
      setMessage('If an account with that email exists, a password reset link has been sent.');
      setEmail('');
    }, 1500);
  };

  return (
    // Use the same main container class as the new login page
    <div className="new-login-page">
      <div className="login-form-section">
        <div className="form-wrapper">
          <img src={logo} alt="Elsewedy Electrometer" className="form-logo" />
          <h1 className="form-title">Forgot Password</h1>
          <p className="form-subtitle">Enter your email to receive a password reset link.</p>

          <form onSubmit={handlePasswordReset}>
            {/* Display success or error messages */}
            {error && <p className="fp-error-message">{error}</p>}
            {message && <p className="fp-success-message">{message}</p>}

            <div className="fp-input-group">
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="form-login-btn" // Re-use the login button style
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          
          <p className="back-to-login-link">
            Remember your password? <Link to="/">Back to Login</Link>
          </p>
        </div>
      </div>

      <div className="login-graphic-section"></div>
    </div>
  );
};

export default ForgotPassword;