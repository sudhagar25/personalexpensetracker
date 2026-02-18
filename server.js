const express = require('express');
const dotenv = require('dotenv');
// const mongoose = require('mongoose'); // Removed
const session = require('express-session');
// const MongoStore = require('connect-mongo'); // Removed
const methodOverride = require('method-override');
// const connectDB = require('./config/db'); // Removed - Firebase initialized in models

// Load env vars
dotenv.config();

// Connect to database
// connectDB(); // Firebase is initialized when models are imported

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// Static folder
app.use(express.static('public'));

// Session middleware
// Using MemoryStore for simplicity with Firebase
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));

// Set global user variable
app.use(function (req, res, next) {
    res.locals.user = req.session.user || null;
    next();
});

// EJS
const expressLayouts = require('express-ejs-layouts'); // Add this
app.use(expressLayouts); // Add this
app.set('view engine', 'ejs');

// Routes (Placeholders for now)
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/transactions', require('./routes/transactions'));

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
