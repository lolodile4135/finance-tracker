# Finance Tracker

A full-stack web application for tracking personal income and expenses with a clean, user-friendly interface.

## Features

- 📊 Dashboard with income, expense, and balance summary
- 💰 Add and manage transactions
- 🔍 Filter transactions by type and date range
- ⚡ Sort transactions by amount, date, or title
- 🔒 Secure user authentication
- 📱 Responsive design for all devices

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios for API requests
- React Router for navigation
- React Toastify for notifications

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Bcrypt for password hashing

## Getting Started

1. Clone the repository
```bash
git clone [your-repository-url]



# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install




PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


# Start backend server
cd backend
npm start

# Start frontend development server
cd ../frontend
npm run dev



1. Register a new account or login with existing credentials
2. Add new transactions with title, amount, type, and category
3. View your financial summary in the dashboard
4. Filter transactions by type (income/expense) and date range
5. Sort transactions by different criteria
6. Delete transactions as needed
## API Endpoints
### Authentication
- POST /api/users/register - Register new user
- POST /api/users/login - Login user
### Transactions
- GET /api/transactions - Get all transactions
- POST /api/transactions - Create new transaction
- DELETE /api/transactions/:id - Delete transaction

