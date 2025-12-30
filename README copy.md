# Bank Management System

A full-stack Bank Management System with a Java Spring Boot REST API backend and a modern React frontend.

## Features

- **User Authentication**: Sign up and login functionality
- **Account Management**: Create and manage bank accounts
- **Deposit Money**: Add money to your account
- **Withdraw Money**: Withdraw money from your account
- **Check Balance**: View your current account balance
- **Bank Transfer**: Transfer money to other accounts
- **Password Reset**: Change your account password

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- Node.js 16 or higher and npm
- MySQL 8.0 or higher
- MySQL database named `bankdb` with an `accounts` table

## Database Setup

Make sure you have MySQL running and create the database with the following table:

```sql
CREATE DATABASE IF NOT EXISTS bankdb;

USE bankdb;

CREATE TABLE IF NOT EXISTS accounts (
    account_no BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    balance DECIMAL(15, 2) DEFAULT 0.00
);
```

Update the database credentials in `src/main/resources/application.properties` if needed:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bankdb
spring.datasource.username=root
spring.datasource.password=roshan
```

## Backend Setup (Spring Boot)

1. Navigate to the project root directory
2. Build the project:
   ```bash
   mvn clean install
   ```
3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   
   Or run `BankApplication.java` from your IDE.

The backend will start on `http://localhost:8080`

## Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:3000`

## API Endpoints

- `POST /api/account/signup` - Create a new account
- `POST /api/account/login` - Login to an account
- `GET /api/account/balance` - Check account balance (requires username and password)
- `POST /api/account/deposit` - Deposit money (requires username, password, amount)
- `POST /api/account/withdraw` - Withdraw money (requires username, password, amount)
- `POST /api/account/transfer` - Transfer money (requires username, password, accountNo, amount)
- `POST /api/account/reset-password` - Reset password (requires username, oldPassword, newPassword)

## Project Structure

```
Bank Management System/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── bank/
│   │   │           ├── BankApplication.java
│   │   │           ├── controller/
│   │   │           │   └── AccountController.java
│   │   │           ├── service/
│   │   │           │   └── AccountService.java
│   │   │           └── model/
│   │   │               ├── AccountDTO.java
│   │   │               ├── LoginRequest.java
│   │   │               └── ApiResponse.java
│   │   └── resources/
│   │       └── application.properties
│   └── com/bank/ (original console-based code)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DepositModal.jsx
│   │   │   ├── WithdrawModal.jsx
│   │   │   ├── CheckBalanceModal.jsx
│   │   │   ├── ResetPasswordModal.jsx
│   │   │   └── TransferModal.jsx
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── pom.xml
```

## Usage

1. Start the MySQL database
2. Start the Spring Boot backend (port 8080)
3. Start the React frontend (port 3000)
4. Open your browser and navigate to `http://localhost:3000`
5. Create an account or login with existing credentials
6. Use the dashboard to manage your bank account

## Technologies Used

### Backend
- Java 17
- Spring Boot 3.1.5
- Spring JDBC
- MySQL Connector

### Frontend
- React 18
- Vite
- Axios
- Modern CSS with gradients and animations

## Notes

- The original console-based Java code is preserved in `src/com/bank/`
- The new REST API is in `src/main/java/com/bank/`
- CORS is enabled for `http://localhost:3000`
- Passwords are stored in plain text (consider hashing for production)

