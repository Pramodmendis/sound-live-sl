How to Run the Project:

1. **Backend Setup**
   - Navigate to `sound-live-sl/backend`
   - Run: `npm install`
   - Start server: `npm run dev`

2. **Frontend Setup**
   - Navigate to `sound-live-sl/frontend`
   - Run: `npm install`
   - Start frontend: `npm start'

3. **Access the App**
   - Frontend: http://localhost:3000/
   - Backend: http://localhost:5000/api/


Known Issues / Notes:

- The PayHere sandbox integration was fully functional until mid-May 2025. However, due to an unexpected issue with the PayHere sandbox environment (likely from PayHere’s side), live payment simulation stopped working consistently.
- This issue was communicated and clarified with the project supervisor during the Viva presentation on [replace with actual Viva date].
- All payment logic, invoice generation, and booking confirmation flows are correctly implemented and can be tested with real credentials or when the sandbox resumes normal function.


* Default Login Credentials:

Client Test Account:
  Email: induwaramendis001@gmail.com
  Password: 1234567890

Admin Test Account:
  Email: super@soundlive.com
  Password: Super@1234 (Super admin)

Note:
- These accounts are already created in the database for demo purposes.
- You can log in and test full booking, profile, and admin functionalities using the above credentials.
