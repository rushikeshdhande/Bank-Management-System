# How to Start the Backend Server

## Quick Steps (Using IntelliJ IDEA)

1. **Open IntelliJ IDEA** with your project

2. **Wait for Maven Dependencies** (if not already downloaded):
   - IntelliJ should automatically detect `pom.xml`
   - Wait for dependencies to download (check bottom right corner for progress)
   - If prompted, click "Enable Auto-Import" for Maven

3. **Run the Backend:**
   - Navigate to: `src/main/java/com/bank/BankApplication.java`
   - Right-click on the file
   - Select: **"Run 'BankApplication.main()'"**
   
   OR
   
   - Click on `BankApplication.java` to open it
   - Click the green ▶️ button next to the `main` method
   - Select "Run 'BankApplication.main()'"

4. **Verify Backend is Running:**
   - Look for this message in the console: `Started BankApplication in X.XXX seconds`
   - Backend should be running on: `http://localhost:8080`

## Troubleshooting

- **If dependencies are not downloading:**
  - Right-click on `pom.xml` → Maven → Reload Project
  
- **If you see database connection errors:**
  - Make sure MySQL is running
  - Verify database credentials in `src/main/resources/application.properties`
  - Ensure `bankdb` database exists

- **If port 8080 is already in use:**
  - Change port in `src/main/resources/application.properties`: `server.port=8081`
  - Update frontend API URL in `frontend/src/api.js` to match

## Once Backend is Running

- Frontend: http://localhost:3000 (should already be running)
- Backend API: http://localhost:8080/api/account

You can test the backend by visiting: http://localhost:8080/api/account/signup (will show an error, but confirms backend is running)

