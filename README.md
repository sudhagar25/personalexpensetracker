# ExpenseWise - Personal Expense Tracker

A simple, clean, and efficient web application to track your personal finances. Built with Node.js, Express, MongoDB, and EJS.

## Features

- **User Authentication**: Secure register and login.
- **Dashboard**: Overview of total income, expenses, and balance.
- **Transaction Management**: Add, view, and delete transactions.
- **Visual Reports**: Interactive charts to visualize spending and income.
- **Responsive Design**: Works on desktop and mobile.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Frontend**: EJS, CSS, Chart.js
- **Auth**: bcrypt, express-session

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/expensewise.git
    cd expensewise
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `.env` file in the root directory and add:
    ```env
    MONGO_URI=mongodb://localhost:27017/expensewise
    SESSION_SECRET=your_secret_key
    PORT=3000
    ```

4.  Run the application:
    ```bash
    npm run dev
    ```

5.  Open your browser and visit `http://localhost:3000`.

## License

MIT
