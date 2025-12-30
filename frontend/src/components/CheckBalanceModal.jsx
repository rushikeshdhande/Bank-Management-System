import React, { useState } from 'react';
import { accountAPI } from '../api';

const CheckBalanceModal = ({ user, onClose, onBalanceChecked, onPasswordSet }) => {
  const [password, setPassword] = useState('');
  const [balance, setBalance] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await accountAPI.checkBalance(user.username, password);
      if (response.data.success) {
        setBalance(response.data.data);
        onBalanceChecked(response.data.data);
        onPasswordSet(password);
        setMessage('');
      } else {
        setMessage(response.data.message);
        setBalance(null);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to check balance');
      setBalance(null);
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
        <h2 className="text-xl font-semibold">Check Balance</h2>
        <button
          onClick={onClose}
          className="text-2xl text-gray-400 hover:text-red-400"
        >
          ×
        </button>
      </div>

      {/* Error Message */}
      {message && (
        <div className="mb-4 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm">
          {message}
        </div>
      )}

      {/* Balance Section */}
      {balance !== null ? (
        <div className="text-center my-6">
          <h3 className="text-gray-400 text-sm">
            Your Current Balance
          </h3>
          <div className="mt-3 text-3xl font-bold text-indigo-400">
            ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
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
              {loading ? "Checking..." : "Check Balance"}
            </button>
          </div>
        </form>
      )}

      {/* Close Button */}
      {balance !== null && (
        <button
          onClick={onClose}
          className="mt-6 w-full px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 font-semibold"
        >
          Close
        </button>
      )}
    </div>
  </div>
);

};

export default CheckBalanceModal;

