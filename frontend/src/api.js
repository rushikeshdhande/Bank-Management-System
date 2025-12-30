import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/account';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const accountAPI = {
  signup: (accountData) => api.post('/signup', accountData),
  login: (loginData) => api.post('/login', loginData),
  checkBalance: (username, password) => 
    api.get('/balance', { params: { username, password } }),
  deposit: (username, password, amount) => 
    api.post('/deposit', null, { params: { username, password, amount } }),
  withdraw: (username, password, amount) => 
    api.post('/withdraw', null, { params: { username, password, amount } }),
  resetPassword: (username, oldPassword, newPassword) => 
    api.post('/reset-password', null, { 
      params: { username, oldPassword, newPassword } 
    }),
  transfer: (username, password, accountNo, amount) => 
    api.post('/transfer', null, { 
      params: { username, password, accountNo, amount } 
    }),
};

export default api;

