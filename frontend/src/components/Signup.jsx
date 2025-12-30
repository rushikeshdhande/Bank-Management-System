import React, { useState } from 'react';
import { accountAPI } from '../api';

const Signup = ({ onSignup, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    contact: '',
    email: '',
    balance: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate contact number
    const contactNum = parseInt(formData.contact);
    if (isNaN(contactNum) || formData.contact.length !== 10) {
      setMessage('Please enter a valid 10-digit mobile number');
      setLoading(false);
      return;
    }

    // Validate balance
    const balanceNum = parseFloat(formData.balance);
    if (isNaN(balanceNum) || balanceNum <= 0) {
      setMessage('Please enter a valid opening balance greater than 0');
      setLoading(false);
      return;
    }

    try {
      const accountData = {
        fullName: formData.fullName.trim(),
        username: formData.username.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        contact: contactNum,
        email: formData.email.trim(),
        balance: balanceNum,
      };

      const response = await accountAPI.signup(accountData);
      if (response.data.success) {
        setMessage('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          onSignup();
        }, 2000);
      } else {
        setMessage(response.data.message || 'Account creation failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Account creation failed. Please try again.';
      setMessage(errorMessage);
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Create Account</h2>
      {message && (
        <div className={`message ${message.includes('success') ? 'message-success' : 'message-error'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Choose a username"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter password"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm password"
          />
        </div>
        <div className="form-group">
          <label>Contact Number (10 digits)</label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            placeholder="Enter 10-digit mobile number"
            maxLength="10"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Opening Balance</label>
          <input
            type="number"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
            placeholder="Enter opening balance"
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Already have an account?{' '}
        <span className="link" onClick={onSwitchToLogin}>
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;

