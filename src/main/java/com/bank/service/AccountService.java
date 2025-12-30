package com.bank.service;

import com.bank.model.AccountDTO;
import com.bank.model.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AccountService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> createAccount(AccountDTO accountDTO) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Validate required fields
            if (accountDTO.getUsername() == null || accountDTO.getUsername().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Username is required");
                return response;
            }
            
            if (accountDTO.getPassword() == null || accountDTO.getPassword().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Password is required");
                return response;
            }
            
            if (accountDTO.getFullName() == null || accountDTO.getFullName().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Full name is required");
                return response;
            }
            
            // Validate password match
            if (accountDTO.getConfirmPassword() == null || 
                !accountDTO.getPassword().equals(accountDTO.getConfirmPassword())) {
                response.put("success", false);
                response.put("message", "Passwords do not match");
                return response;
            }

            // Validate contact number
            if (accountDTO.getContact() == null) {
                response.put("success", false);
                response.put("message", "Contact number is required");
                return response;
            }
            
            String contactStr = accountDTO.getContact().toString();
            if (contactStr.length() != 10 || 
                !(contactStr.startsWith("9") || contactStr.startsWith("8") || 
                  contactStr.startsWith("7") || contactStr.startsWith("6"))) {
                response.put("success", false);
                response.put("message", "Enter valid mobile number (10 digits starting with 6, 7, 8, or 9)");
                return response;
            }

            // Validate balance
            if (accountDTO.getBalance() == null || accountDTO.getBalance() <= 0) {
                response.put("success", false);
                response.put("message", "Opening balance must be greater than 0");
                return response;
            }

            // Validate and format email
            String email = accountDTO.getEmail();
            if (email == null || email.trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Email is required");
                return response;
            }
            
            if (!email.contains("@")) {
                email = email + "@gmail.com";
            }

            // Insert account
            String sql = "INSERT INTO accounts(username, full_name, password, email, phone, balance) VALUES(?, ?, ?, ?, ?, ?)";
            int rowsAffected = jdbcTemplate.update(sql,
                    accountDTO.getUsername().trim(),
                    accountDTO.getFullName().trim(),
                    accountDTO.getPassword(),
                    email.trim(),
                    accountDTO.getContact().toString(),
                    accountDTO.getBalance());

            if (rowsAffected > 0) {
                response.put("success", true);
                response.put("message", "Account created successfully");
            } else {
                response.put("success", false);
                response.put("message", "Account creation failed");
            }
        } catch (org.springframework.dao.DuplicateKeyException e) {
            response.put("success", false);
            response.put("message", "Username already exists. Please choose a different username.");
        } catch (Exception e) {
            response.put("success", false);
            String errorMsg = e.getMessage();
            if (errorMsg != null && errorMsg.contains("Duplicate entry")) {
                response.put("message", "Username already exists. Please choose a different username.");
            } else {
                response.put("message", "Error creating account: " + errorMsg);
            }
            e.printStackTrace(); // For debugging
        }
        
        return response;
    }

    public Map<String, Object> login(LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String sql = "SELECT * FROM accounts WHERE username = ? AND password = ?";
            Map<String, Object> account = jdbcTemplate.queryForMap(sql, 
                    loginRequest.getUsername(), 
                    loginRequest.getPassword());

            if (account != null) {
                response.put("success", true);
                response.put("message", "Login successful");
                Map<String, Object> userData = new HashMap<>();
                userData.put("username", account.get("username"));
                userData.put("fullName", account.get("full_name"));
                response.put("data", userData);
            } else {
                response.put("success", false);
                response.put("message", "Invalid username or password");
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Invalid username or password");
        }
        
        return response;
    }

    public Map<String, Object> checkBalance(String username, String password) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String sql = "SELECT balance FROM accounts WHERE username = ? AND password = ?";
            Double balance = jdbcTemplate.queryForObject(sql, Double.class, username, password);
            
            response.put("success", true);
            response.put("message", "Balance retrieved successfully");
            response.put("balance", balance);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Password is incorrect or account not found");
        }
        
        return response;
    }

    public Map<String, Object> depositMoney(String username, String password, Double amount) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Get current balance
            String fetchBalance = "SELECT balance FROM accounts WHERE username = ? AND password = ?";
            Double preBalance = jdbcTemplate.queryForObject(fetchBalance, Double.class, username, password);
            
            // Update balance
            String sql = "UPDATE accounts SET balance = ? WHERE username = ? AND password = ?";
            int rowsAffected = jdbcTemplate.update(sql, preBalance + amount, username, password);
            
            if (rowsAffected > 0) {
                response.put("success", true);
                response.put("message", amount + " deposited successfully");
                response.put("newBalance", preBalance + amount);
            } else {
                response.put("success", false);
                response.put("message", "Deposit failed");
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error: " + e.getMessage());
        }
        
        return response;
    }

    public Map<String, Object> withdrawMoney(String username, String password, Double amount) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Get current balance
            String fetchBalance = "SELECT balance FROM accounts WHERE username = ? AND password = ?";
            Double preBalance = jdbcTemplate.queryForObject(fetchBalance, Double.class, username, password);
            
            if (amount < preBalance) {
                // Update balance
                String sql = "UPDATE accounts SET balance = ? WHERE username = ? AND password = ?";
                int rowsAffected = jdbcTemplate.update(sql, preBalance - amount, username, password);
                
                if (rowsAffected > 0) {
                    response.put("success", true);
                    response.put("message", amount + " withdrawn successfully");
                    response.put("newBalance", preBalance - amount);
                } else {
                    response.put("success", false);
                    response.put("message", "Withdrawal failed");
                }
            } else {
                response.put("success", false);
                response.put("message", "Insufficient balance");
                response.put("balance", preBalance);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error: " + e.getMessage());
        }
        
        return response;
    }

    public Map<String, Object> forgetPassword(String username, String oldPassword, String newPassword) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String sql = "UPDATE accounts SET password = ? WHERE username = ? AND password = ?";
            int rowsAffected = jdbcTemplate.update(sql, newPassword, username, oldPassword);
            
            if (rowsAffected > 0) {
                response.put("success", true);
                response.put("message", "Password reset successfully");
            } else {
                response.put("success", false);
                response.put("message", "Password reset failed. Please check your credentials.");
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error: " + e.getMessage());
        }
        
        return response;
    }

    public Map<String, Object> bankTransfer(String username, String password, Long accountNo, Double amount) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Get sender account
            String fetchAccount = "SELECT account_no, balance FROM accounts WHERE username = ? AND password = ?";
            Map<String, Object> senderAccount = jdbcTemplate.queryForMap(fetchAccount, username, password);
            Long ownAccount = ((Number) senderAccount.get("account_no")).longValue();
            Double ownBalance = ((Number) senderAccount.get("balance")).doubleValue();
            
            // Check if recipient account exists
            String matchAccount = "SELECT * FROM accounts WHERE account_no = ?";
            Map<String, Object> recipientAccount = jdbcTemplate.queryForMap(matchAccount, accountNo);
            String fetchBal = "SELECT balance FROM accounts WHERE account_no = ?";
            Double prevOpoBal = jdbcTemplate.queryForObject(fetchBal, Double.class, accountNo);
            
            if (amount < ownBalance) {
                // Deduct from sender
                String sql2 = "UPDATE accounts SET balance = ? WHERE account_no = ?";
                int rowsAffected1 = jdbcTemplate.update(sql2, ownBalance - amount, ownAccount);
                
                if (rowsAffected1 > 0) {
                    // Add to recipient
                    String sql = "UPDATE accounts SET balance = ? WHERE account_no = ?";
                    int rowsAffected = jdbcTemplate.update(sql, prevOpoBal + amount, accountNo);
                    
                    if (rowsAffected > 0) {
                        response.put("success", true);
                        response.put("message", "Amount transferred successfully");
                        response.put("newBalance", ownBalance - amount);
                    } else {
                        response.put("success", false);
                        response.put("message", "Transfer failed");
                    }
                } else {
                    response.put("success", false);
                    response.put("message", "Transfer failed");
                }
            } else {
                response.put("success", false);
                response.put("message", "Insufficient balance");
                response.put("balance", ownBalance);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Invalid account number or error: " + e.getMessage());
        }
        
        return response;
    }
}

