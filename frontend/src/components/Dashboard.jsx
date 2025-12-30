import React, { useState } from 'react';
import { accountAPI } from '../api';
import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import CheckBalanceModal from './CheckBalanceModal';
import ResetPasswordModal from './ResetPasswordModal';
import TransferModal from './TransferModal';

const Dashboard = ({ user, onLogout }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [balance, setBalance] = useState(null);
  const [password, setPassword] = useState('');

  const openModal = (modalName) => {
    setActiveModal(modalName);
    setBalance(null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setBalance(null);
  };

  const handleCheckBalance = async (pwd) => {
    try {
      const response = await accountAPI.checkBalance(user.username, pwd);
      if (response.data.success) {
        setBalance(response.data.data);
        setPassword(pwd);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to check balance');
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user.fullName || user.username}!</h1>
        <p>Manage your bank account efficiently</p>
        <button 
          className="btn btn-danger" 
          onClick={onLogout}
          style={{ marginTop: '20px', width: 'auto', padding: '10px 20px' }}
        >
          Logout
        </button>
      </div>

      {balance !== null && (
        <div className="balance-display">
          <h3>Your Current Balance</h3>
          <div className="amount">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
        </div>
      )}

      <div className="dashboard-menu">
        <div className="menu-item" onClick={() => openModal('deposit')}>
          <h3>💵 Deposit Money</h3>
          <p>Add money to your account</p>
        </div>
        <div className="menu-item" onClick={() => openModal('withdraw')}>
          <h3>💸 Withdraw Money</h3>
          <p>Withdraw money from your account</p>
        </div>
        <div className="menu-item" onClick={() => openModal('balance')}>
          <h3>💰 Check Balance</h3>
          <p>View your current account balance</p>
        </div>
        <div className="menu-item" onClick={() => openModal('transfer')}>
          <h3>🏦 Bank Transfer</h3>
          <p>Transfer money to another account</p>
        </div>
        <div className="menu-item" onClick={() => openModal('reset')}>
          <h3>🔒 Reset Password</h3>
          <p>Change your account password</p>
        </div>
      </div>

      {activeModal === 'deposit' && (
        <DepositModal
          user={user}
          onClose={closeModal}
          onSuccess={() => {
            if (password) handleCheckBalance(password);
            closeModal();
          }}
        />
      )}

      {activeModal === 'withdraw' && (
        <WithdrawModal
          user={user}
          onClose={closeModal}
          onSuccess={() => {
            if (password) handleCheckBalance(password);
            closeModal();
          }}
        />
      )}

      {activeModal === 'balance' && (
        <CheckBalanceModal
          user={user}
          onClose={closeModal}
          onBalanceChecked={setBalance}
          onPasswordSet={setPassword}
        />
      )}

      {activeModal === 'transfer' && (
        <TransferModal
          user={user}
          onClose={closeModal}
          onSuccess={() => {
            if (password) handleCheckBalance(password);
            closeModal();
          }}
        />
      )}

      {activeModal === 'reset' && (
        <ResetPasswordModal
          user={user}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Dashboard;

