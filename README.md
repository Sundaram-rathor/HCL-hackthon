# hcl-hackathon
HCL hackathon - HEALTHCARE 

 Tech Stack
Frontend
Next.js (React Framework)
Router (app-router)
TailwindCSS (Styling)
Axios (API Communication)


Backend
Node.js + Express.js (API Server)
MongoDB Atlas (Cloud Database)
Mongoose (ORM)
bcrypt.js (Password Hashing)
JWT (Authentication & Protected Routes)



 Authentication Flow
User registers using email + password.
Password is hashed using bcrypt.js.
On login, server issues a JWT token with expiry.
All protected pages (dashboard, profile, goals) require a valid JWT.
Token is validated on every API call.



 ->Project Flow Overview
1️ Authentication System
User Sign Up & Login (Patients + Providers)
JWT-based session management
Secure password hashing
Redirect to dashboard after login

2️ Patient Dashboard
Shows wellness progress (steps, sleep, water intake)
Preventive health reminders
Daily “Health Tip”
API calls via Axios to fetch user-specific data


3️ Profile Management
Patients can view & edit their personal details
Fields include:
basic health information
Stored securely in MongoDB Atlas


4️ Healthcare Provider Panel
Providers see their assigned patients
Compliance status such as:
Goal Met

Click a patient to view detailed goal/health info



5 Goal Tracker for Patients
Log daily steps, sleep hours, or water intake
Data stored in MongoDB
Progress visualized on dashboard



7️ Privacy & Security
JWT for secure access
Password hashing with bcrypt
User action logging
Consent checkbox during registration



 API Structure (Backend)
POST /auth/register – Create account
POST /auth/login – Login user
GET /dashboard – Fetch user data
PUT /profile – Update user info
POST /goals/add – Add daily goal
GET /provider/patients – Provider patient list



✔ Now the app becomes functional end-to-end.

## DataBase

-Mongo Atlas

