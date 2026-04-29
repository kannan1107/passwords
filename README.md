# Password Manager UI

A React-based password manager application with user authentication and user management features.

---

## Features

### User Authentication
- User registration and login
- Password reset functionality
- JWT token-based authentication
- Persistent login sessions

### User Management
- Display all registered users
- User profile management
- Secure logout

### UI Components
- Responsive navigation bar
- User-friendly forms
- Modern styling with Tailwind CSS

### UI Page Or Functions

### Forget password page

  - click the Forget password, I will be asking email ID
  - if email ID true mean send the mail (reset password link) or miss match mean show the error
    
### Update Password

  - Update password page three input field 1. email ID , 2. Password, 3. conform password, 4. password show button, 5. submit button
    
### Home page 

    - list out the all user

---

## Tech Stack

- **Frontend**: React 18 + Vite  
- **State Management**: Redux Toolkit + RTK Query  
- **Routing**: React Router DOM  
- **Styling**: Tailwind CSS  
- **HTTP Client**: RTK Query (built on Fetch API)

---

## Project Structure

src/
├── component/
│ ├── Home.jsx # Home page with user list
│ ├── Login.jsx # Login form
│ ├── Navbar.jsx # Navigation component
│ ├── Signup.jsx # Registration form
│ └── ResetPassword.jsx # Password reset
├── features/
│ └── ApplicationApi.js # API endpoints
├── store/
│ ├── authSlice.js # Authentication state
│ └── store.js # Redux store configuration
├── App.jsx # Main app component
└── main.jsx # App entry point


---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
