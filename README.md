# 💰 MERN Expense Tracker

A full-stack expense tracking application built using the MERN stack.

The application allows users to securely register and log in, manage their personal expenses, and view spending analytics by category.

## 🚀 Features

### Authentication
- User registration
- User login
- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes
- User-specific expense access

### Expense Management
- Create expenses
- View personal expenses
- Edit expenses
- Delete expenses
- Expense categories
- Expense date
- Expense description
- Expense amount

### Analytics
- Total spending
- Total transaction count
- Average expense
- Category-wise spending
- MongoDB `$group` aggregation
- Category spending bar chart

## 📂 Expense Categories

- Food
- Travel
- Bills
- Shopping
- Other

---

# 🛠️ Technologies Used

## Frontend
- React.js
- React Router
- Axios
- CSS

## Backend
- Node.js
- Express.js
- JWT
- bcryptjs

## Database
- MongoDB
- Mongoose
- MongoDB Aggregation

## Development Tools
- Git
- GitHub
- Code0

---

# 📁 Project Structure

```text
Expense-Tracker/
│
├── Backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── expenseController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Expense.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── expenseRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
│
├── .gitignore
└── README.md
