import React, { useState } from 'react';
import './Register.css';
import logo from '../../assets/logo.png';
import api from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiBriefcase } from 'react-icons/fi';

// No changes needed here
const InputGroup = ({ name, type = 'text', placeholder, Icon, value, onChange, required = true }) => {
  return (
    <div className="input-group">
      <Icon className="input-icon" />
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
      />
      <label className="input-label">{placeholder}</label>
    </div>
  );
};

const roles = [
  { id: 1, name: "Super Admin" },
  { id: 2, name: "Admin" },
  { id: 3, name: "Student" },
];


const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // This state now correctly defaults to roleId: 1 (Super Admin)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    roleId: roles[0].id, 
  });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      const dataToSend = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        roleId: Number(formData.roleId),
      };

      const res = await api.post('/api/Auth/signup', dataToSend);
      
      if (res.status === 200 || res.status === 201) {
        setSuccessMessage('✅ Registration Successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/');
        }, 2500);
      } else {
        setError(res.data.message || 'Registration failed. Please check your details.');
        setIsLoading(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again later.');
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="left-side">
        <div className="form-container">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <h2>Create Your Account</h2>
          <p className="subtitle">Join our community and get started in seconds!</p>

          <form onSubmit={handleRegister} noValidate>
            {error && <p className="feedback-message error">{error}</p>}
            {successMessage && <p className="feedback-message success">{successMessage}</p>}
            
            <div className="form-grid-simplified">
              <InputGroup name="fullName" placeholder="Full Name" Icon={FiUser} value={formData.fullName} onChange={handleChange} />
              <InputGroup name="email" type="email" placeholder="Email Address" Icon={FiMail} value={formData.email} onChange={handleChange} />
              
              {/* This dropdown will now render the new roles automatically */}
              <div className="input-group">
                <FiBriefcase className="input-icon" />
                <select 
                  name="roleId" 
                  value={formData.roleId} 
                  onChange={handleChange}
                  required
                >
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <label className="input-label select-label">Role</label>
              </div>

              <div className="input-group">
                <FiLock className="input-icon" />
                <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} required placeholder=" " />
                <label className="input-label">Password</label>
                <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
            </div>

            <button type="submit" className="register-btn" disabled={isLoading || successMessage}>
              {isLoading ? <span className="spinner"></span> : 'Create Account'}
            </button>
          </form>

          <p className="switch-link">
            Already have an account? <Link to="/">Login Here</Link>
          </p>
        </div>
      </div>

      <div className="right-side">
        {/* ... right side content ... */}
      </div>
    </div>
  );
};

export default Register;