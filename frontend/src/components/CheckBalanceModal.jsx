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
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Check Balance</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        {message && (
          <div className="message message-error">
            {message}
          </div>
        )}
        {balance !== null ? (
          <div className="balance-display" style={{ margin: '20px 0' }}>
            <h3>Your Current Balance</h3>
            <div className="amount">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            <div className="flex-row">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Checking...' : 'Check Balance'}
              </button>
            </div>
          </form>
        )}
        {balance !== null && (
          <button className="btn" onClick={onClose} style={{ marginTop: '20px' }}>
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckBalanceModal;

