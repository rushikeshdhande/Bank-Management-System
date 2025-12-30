# How to Run the Project

## Quick Start Guide

### Frontend (React)
The frontend is already starting! It should be available at `http://localhost:3000`

### Backend (Spring Boot)

Since Maven is not installed on your system, you have two options:

#### Option 1: Run from IntelliJ IDEA (Recommended)

1. Open the project in IntelliJ IDEA
2. IntelliJ should automatically detect the `pom.xml` file and configure Maven
3. Wait for IntelliJ to download dependencies (you'll see progress in the bottom right)
4. Once dependencies are downloaded, right-click on `BankApplication.java` (located at `src/main/java/com/bank/BankApplication.java`)
5. Select **"Run 'BankApplication.main()'"**
6. The backend will start on `http://localhost:8080`

**Note:** Make sure your MySQL database is running and the `bankdb` database exists before starting the backend.

#### Option 2: Install Maven

If you prefer using the command line:

1. Download Maven from: https://maven.apache.org/download.cgi
2. Extract and add to your system PATH
3. Then run:
   ```powershell
   cd "c:\Users\HP\OneDrive\Desktop\Java\Bank Management System"
   mvn clean install
   mvn spring-boot:run
   ```

### Database Setup

Make sure MySQL is running and execute these SQL commands:

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

Update database credentials in `src/main/resources/application.properties` if needed.

### Access the Application

Once both frontend and backend are running:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api/account

