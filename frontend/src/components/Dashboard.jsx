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
  <div className="fixed inset-0 overflow-hidden">

    {/* ===== FULL BACKGROUND ===== */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b]" />

    {/* Neon blobs (soft, no shadow) */}
    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-600/25 rounded-full blur-[160px]" />
    <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-violet-600/25 rounded-full blur-[160px]" />
    <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[160px]" />

    {/* Grid overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

    {/* ===== CONTENT ===== */}
    <div className="relative z-10 min-h-screen px-6 py-8 text-white">

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-3xl font-bold">
          Welcome, {user.fullName || user.username} 👋
        </h1>
        <p className="text-gray-400 mt-1">
          Manage your bank account efficiently
        </p>

        <button
          onClick={onLogout}
          className="mt-4 px-5 py-2 rounded-xl bg-red-500/80 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Balance */}
      {balance !== null && (
        <div className="text-center mb-10">
          <h3 className="text-gray-400">Your Current Balance</h3>
          <div className="text-4xl font-bold mt-2 text-indigo-400">
            ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </div>
        </div>
      )}

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div
          onClick={() => openModal("deposit")}
          className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:bg-white/10 transition"
        >
          <h3 className="text-lg font-semibold">💵 Deposit Money</h3>
          <p className="text-sm text-gray-400 mt-1">
            Add money to your account
          </p>
        </div>

        <div
          onClick={() => openModal("withdraw")}
          className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:bg-white/10 transition"
        >
          <h3 className="text-lg font-semibold">💸 Withdraw Money</h3>
          <p className="text-sm text-gray-400 mt-1">
            Withdraw money from your account
          </p>
        </div>

        <div
          onClick={() => openModal("balance")}
          className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:bg-white/10 transition"
        >
          <h3 className="text-lg font-semibold">💰 Check Balance</h3>
          <p className="text-sm text-gray-400 mt-1">
            View your current account balance
          </p>
        </div>

        <div
          onClick={() => openModal("transfer")}
          className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:bg-white/10 transition"
        >
          <h3 className="text-lg font-semibold">🏦 Bank Transfer</h3>
          <p className="text-sm text-gray-400 mt-1">
            Transfer money to another account
          </p>
        </div>

        <div
          onClick={() => openModal("reset")}
          className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:bg-white/10 transition"
        >
          <h3 className="text-lg font-semibold">🔒 Reset Password</h3>
          <p className="text-sm text-gray-400 mt-1">
            Change your account password
          </p>
        </div>

      </div>

      {/* ===== MODALS ===== */}
      {activeModal === "deposit" && (
        <DepositModal
          user={user}
          onClose={closeModal}
          onSuccess={() => {
            if (password) handleCheckBalance(password);
            closeModal();
          }}
        />
      )}

      {activeModal === "withdraw" && (
        <WithdrawModal
          user={user}
          onClose={closeModal}
          onSuccess={() => {
            if (password) handleCheckBalance(password);
            closeModal();
          }}
        />
      )}

      {activeModal === "balance" && (
        <CheckBalanceModal
          user={user}
          onClose={closeModal}
          onBalanceChecked={setBalance}
          onPasswordSet={setPassword}
        />
      )}

      {activeModal === "transfer" && (
        <TransferModal
          user={user}
          onClose={closeModal}
          onSuccess={() => {
            if (password) handleCheckBalance(password);
            closeModal();
          }}
        />
      )}

      {activeModal === "reset" && (
        <ResetPasswordModal
          user={user}
          onClose={closeModal}
        />
      )}

    </div>
  </div>
);

};

export default Dashboard;

