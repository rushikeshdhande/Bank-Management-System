# Troubleshooting Guide - Account Creation Issues

## Common Issues and Solutions

### 1. Backend Not Running
**Symptom:** Frontend shows connection error or "Account creation failed"
**Solution:** 
- Make sure Spring Boot backend is running on port 8080
- Check IntelliJ console for errors
- Verify database connection in `application.properties`

### 2. Database Connection Issues
**Symptom:** Backend fails to start or throws SQL exceptions
**Solution:**
- Ensure MySQL is running
- Verify database `bankdb` exists
- Check credentials in `src/main/resources/application.properties`
- Test connection: `mysql -u root -p` and verify database exists

### 3. Database Table Not Created
**Symptom:** SQL errors about table not existing
**Solution:** Run this SQL:
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

### 4. Validation Errors
**Common validation failures:**
- **Contact Number:** Must be exactly 10 digits starting with 6, 7, 8, or 9
- **Balance:** Must be greater than 0
- **Email:** Required field (will auto-append @gmail.com if no @ symbol)
- **Password:** Must match confirm password
- **Username:** Must be unique (cannot already exist in database)

### 5. Browser Console Errors
**Check browser console (F12) for:**
- CORS errors (backend not allowing frontend origin)
- Network errors (backend not reachable)
- API errors (check Network tab for response details)

### 6. Backend Console Errors
**Check IntelliJ console for:**
- Database connection errors
- SQL syntax errors
- Null pointer exceptions
- Validation errors

## Testing Steps

1. **Verify Backend is Running:**
   - Open http://localhost:8080/api/account/signup in browser (should see error, but means backend is up)
   - Or check IntelliJ console for "Started BankApplication"

2. **Verify Frontend is Running:**
   - Open http://localhost:3000
   - Should see login page

3. **Test Database Connection:**
   ```sql
   SELECT * FROM bankdb.accounts;
   ```

4. **Check Network Requests:**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Try to create an account
   - Check the `/api/account/signup` request:
     - Status code (should be 200)
     - Request payload (check all fields are sent)
     - Response (check error message if failed)

## Debug Mode

To see more detailed error messages:
1. Check IntelliJ console for full stack traces
2. Check browser console (F12) for frontend errors
3. Check Network tab in DevTools for API responses

## Recent Fixes Applied

1. ✅ Added null checks in AccountService
2. ✅ Added duplicate username error handling
3. ✅ Improved frontend validation
4. ✅ Better error messages
5. ✅ Contact number validation improved

