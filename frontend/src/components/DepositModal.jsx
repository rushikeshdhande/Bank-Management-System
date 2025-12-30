import React, { useState } from 'react';
import { accountAPI } from '../api';

const DepositModal = ({ user, onClose, onSuccess }) => {
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
      const response = await accountAPI.deposit(
        user.username,
        formData.password,
        parseFloat(formData.amount)
      );

      if (response.data.success) {
        setMessage(`Successfully deposited ₹${formData.amount}`);
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Deposit failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Deposit Money</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        {message && (
          <div className={`message ${message.includes('Successfully') ? 'message-success' : 'message-error'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0.01"
              step="0.01"
              placeholder="Enter amount to deposit"
            />
          </div>
          <div className="flex-row">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Processing...' : 'Deposit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepositModal;

