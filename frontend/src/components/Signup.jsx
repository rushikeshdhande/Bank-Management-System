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
  <div className="fixed inset-0 overflow-hidden">

    {/* ===== FULL BACKGROUND ===== */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b]" />

    {/* Neon glow blobs */}
    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[160px]" />
    <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-violet-600/30 rounded-full blur-[160px]" />
    <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[160px]" />

    {/* Grid overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

    {/* ===== CONTENT ===== */}
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-lg rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_60px_rgba(99,102,241,0.45)] p-8">

        <h2 className="text-2xl font-bold text-center text-white">
          Create Account
        </h2>

        {/* Message */}
        {message && (
          <div
            className={`mt-4 mb-4 text-sm px-4 py-2 rounded-lg ${
              message.includes("success")
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Username */}
          <div>
            <label className="text-sm text-gray-300">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Choose a username"
              className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-300">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm password"
              className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="text-sm text-gray-300">Contact Number</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              maxLength="10"
              placeholder="Enter 10-digit mobile number"
              className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Opening Balance */}
          <div>
            <label className="text-sm text-gray-300">Opening Balance</label>
            <input
              type="number"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              required
              min="0.01"
              step="0.01"
              placeholder="Enter opening balance"
              className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold shadow-lg hover:scale-[1.03] transition disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <span
            className="text-indigo-400 cursor-pointer hover:underline"
            onClick={onSwitchToLogin}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  </div>
);

};

export default Signup;

