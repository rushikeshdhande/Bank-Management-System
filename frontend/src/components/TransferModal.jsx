import React, { useState } from 'react';
import { accountAPI } from '../api';

const TransferModal = ({ user, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    password: '',
    accountNo: '',
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
      const response = await accountAPI.transfer(
        user.username,
        formData.password,
        parseInt(formData.accountNo),
        parseFloat(formData.amount)
      );

      if (response.data.success) {
        setMessage(`Successfully transferred ₹${formData.amount} to account ${formData.accountNo}`);
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Transfer failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Bank Transfer</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        {message && (
          <div className={`message ${message.includes('Successfully') ? 'message-success' : 'message-error'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Password</label>
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
            <label>Recipient Account Number</label>
            <input
              type="number"
              name="accountNo"
              value={formData.accountNo}
              onChange={handleChange}
              required
              placeholder="Enter recipient account number"
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
              placeholder="Enter amount to transfer"
            />
          </div>
          <div className="flex-row">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Processing...' : 'Transfer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferModal;

