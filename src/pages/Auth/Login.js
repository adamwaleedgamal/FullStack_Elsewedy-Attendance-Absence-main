// --- File: src/pages/Auth/Login.js (New UI) ---

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FiEye, FiEyeOff } from 'react-icons/fi';

// Import your new CSS file and assets
import './Login.css';
import logo from '../../assets/logo.png';
import googleIcon from '../../assets/google-icon.svg.png';
import facebookIcon from '../../assets/facebook-icon.svg.png';

const Login = () => {
  // Your existing state and logic is perfect and remains unchanged
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await api.post('/api/Auth/login', formData);
      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        const tokenPayload = JSON.parse(atob(response.data.token.split('.')[1]));
        const userRoleClaim = tokenPayload.role;
        const userIdClaim = tokenPayload.nameid;
        if (!userRoleClaim || !userIdClaim) {
            setError("Token is missing required user ID or Role. Please contact support.");
            setIsLoading(false);
            return;
        }
        const userRole = userRoleClaim.toLowerCase();
        const normalizedUserRole = userRole === 'superadmin' ? 'super admin' : userRole;
        localStorage.setItem("userRole", normalizedUserRole);
        const userToStore = {
            id: userIdClaim, name: tokenPayload.fullName || "User",
            email: tokenPayload.email, role: normalizedUserRole,
        };
        localStorage.setItem('user', JSON.stringify(userToStore));
        if (normalizedUserRole === 'super admin') navigate('/admin/dashboard');
        else if (normalizedUserRole === 'admin') navigate('/dashboard');
        else if (normalizedUserRole === 'student') navigate('/profile');
        else navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="new-login-page">
      <div className="login-form-section">
        <div className="form-wrapper">
          <img src={logo} alt="Elsewedy Electrometer" className="form-logo" />
          <h1 className="form-title">Login</h1>
          <p className="form-subtitle">Welcome back, Select method to login.</p>

          {error && <p className="form-error-message">{error}</p>}

                    <form onSubmit={handleLogin} noValidate>
            <div className="input-wrapper">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Enter your email</label>
            </div>

            <div className="input-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Enter Password</label>
              <span className="password-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>

            {/* --- THIS IS THE NEW CODE TO ADD --- */}
            <div className="form-options">
                <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
            </div>
            {/* --- END OF NEW CODE --- */}
            
            <button type="submit" className="form-login-btn" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>


          <div className="form-divider">Or</div>

          <div className="social-login-icons">
            <button className="social-icon-btn">
              <img src={googleIcon} alt="Google Login" />
            </button>
            <button className="social-icon-btn">
              <img src={facebookIcon} alt="Facebook Login" />
            </button>
          </div>
        </div>
      </div>
      <div className="login-graphic-section"></div>
    </div>
  );
};

export default Login;