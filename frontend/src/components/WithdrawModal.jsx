import React, { useState } from 'react';
import { accountAPI } from '../api';

const WithdrawModal = ({ user, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    password: '',
    amount: '',
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
      const response = await accountAPI.withdraw(
        user.username,
        formData.password,
        parseFloat(formData.amount)
      );

      if (response.data.success) {
        setMessage(`Successfully withdrew ₹${formData.amount}`);
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Withdrawal failed. Please try again.');
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
        <h2 className="text-xl font-semibold">Withdraw Money</h2>
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
            message.includes("Successfully")
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {message}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Password */}
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

        {/* Amount */}
        <div>
          <label className="text-sm text-gray-300">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
            placeholder="Enter amount to withdraw"
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
            {loading ? "Processing..." : "Withdraw"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

};

export default WithdrawModal;

