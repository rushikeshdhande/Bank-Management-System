import React, { useState } from 'react';
import { accountAPI } from '../api';

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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

    try {
      const response = await accountAPI.login(formData);
      if (response.data.success) {
        onLogin(response.data.data);
        setMessage('');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed. Please try again.');
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
    <div className="relative z-10 flex items-center justify-center w-full h-full px-4">

      {/* ❌ shadow काढले */}
      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
{/* Bank Icon */}
<div className="flex justify-center mb-3">
  <img
    src="/bank.png"
    alt="Bank Icon"
    className="w-16 h-16 object-contain"
  />
</div>

        <h2 className="text-2xl font-bold text-center text-white">
          Login
        </h2>

        <p className="text-center text-sm text-gray-400 mt-1 mb-6">
          Login to your account
        </p>

        {message && (
          <div
            className={`mb-4 text-sm px-4 py-2 rounded-lg ${
              message.includes("success")
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-300">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
              className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold hover:scale-[1.03] transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don&apos;t have an account?{" "}
          <span
            className="text-indigo-400 cursor-pointer hover:underline"
            onClick={onSwitchToSignup}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  </div>
);




};

export default Login;

