import React, { useState } from 'react';
import { accountAPI } from '../api';

const ResetPasswordModal = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
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

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('New passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await accountAPI.resetPassword(
        user.username,
        formData.oldPassword,
        formData.newPassword
      );

      if (response.data.success) {
        setMessage('Password reset successfully!');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Password reset failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

return (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    onClick={onClose}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 text-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Reset Password</h2>
        <button
          onClick={onClose}
          className="text-2xl text-gray-400 hover:text-red-400"
        >
          ×
        </button>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-4 text-sm px-4 py-2 rounded-lg ${
            message.includes("successfully")
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {message}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="text-sm text-gray-300">Current Password</label>
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            required
            placeholder="Enter your current password"
            className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* New Password */}
        <div>
          <label className="text-sm text-gray-300">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            placeholder="Enter new password"
            className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-sm text-gray-300">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm new password"
            className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-white/20 text-gray-300 hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 font-semibold disabled:opacity-60"
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

};

export default ResetPasswordModal;

