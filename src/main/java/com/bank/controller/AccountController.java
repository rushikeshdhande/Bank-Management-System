package com.bank.controller;

import com.bank.model.AccountDTO;
import com.bank.model.ApiResponse;
import com.bank.model.LoginRequest;
import com.bank.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/account")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> signup(@RequestBody AccountDTO accountDTO) {
        Map<String, Object> result = accountService.createAccount(accountDTO);
        ApiResponse response = new ApiResponse(
                (Boolean) result.get("success"),
                (String) result.get("message"),
                result.get("data")
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> result = accountService.login(loginRequest);
        ApiResponse response = new ApiResponse(
                (Boolean) result.get("success"),
                (String) result.get("message"),
                result.get("data")
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/balance")
    public ResponseEntity<ApiResponse> checkBalance(
            @RequestParam String username,
            @RequestParam String password) {
        Map<String, Object> result = accountService.checkBalance(username, password);
        ApiResponse response = new ApiResponse(
                (Boolean) result.get("success"),
                (String) result.get("message"),
                result.get("balance")
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/deposit")
    public ResponseEntity<ApiResponse> deposit(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam Double amount) {
        Map<String, Object> result = accountService.depositMoney(username, password, amount);
        ApiResponse response = new ApiResponse(
                (Boolean) result.get("success"),
                (String) result.get("message"),
                result.get("newBalance")
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/withdraw")
    public ResponseEntity<ApiResponse> withdraw(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam Double amount) {
        Map<String, Object> result = accountService.withdrawMoney(username, password, amount);
        ApiResponse response = new ApiResponse(
                (Boolean) result.get("success"),
                (String) result.get("message"),
                result.get("newBalance")
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(
            @RequestParam String username,
            @RequestParam String oldPassword,
            @RequestParam String newPassword) {
        Map<String, Object> result = accountService.forgetPassword(username, oldPassword, newPassword);
        ApiResponse response = new ApiResponse(
                (Boolean) result.get("success"),
                (String) result.get("message")
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/transfer")
    public ResponseEntity<ApiResponse> transfer(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam Long accountNo,
            @RequestParam Double amount) {
        Map<String, Object> result = accountService.bankTransfer(username, password, accountNo, amount);
        ApiResponse response = new ApiResponse(
                (Boolean) result.get("success"),
                (String) result.get("message"),
                result.get("newBalance")
        );
        return ResponseEntity.ok(response);
    }
}

