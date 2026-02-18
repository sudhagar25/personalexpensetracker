const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Render register page
// @route   GET /auth/register
exports.registerPage = (req, res) => {
    res.render('register');
};

// @desc    Handle registration
// @route   POST /auth/register
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    let errors = [];

    if (!username || !email || !password) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            username,
            email,
            password
        });
    } else {
        try {
            // Check if user exists
            let user = await User.findByEmail(email);

            if (user) {
                errors.push({ msg: 'Email already exists' });
                return res.render('register', {
                    errors,
                    username,
                    email,
                    password
                });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create new user
            user = await User.create({
                username,
                email,
                password: hashedPassword,
                createdAt: new Date().toISOString()
            });

            req.session.user = user; // Auto login (user object now has id)
            res.redirect('/dashboard');
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
};

// @desc    Render login page
// @route   GET /auth/login
exports.loginPage = (req, res) => {
    res.render('login');
};

// @desc    Handle login
// @route   POST /auth/login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);

        if (!user) {
            return res.render('login', {
                errors: [{ msg: 'Invalid Credentials' }],
                email,
                password
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.render('login', {
                errors: [{ msg: 'Invalid Credentials' }],
                email,
                password
            });
        }

        req.session.user = user;
        res.redirect('/dashboard');

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Logout user
// @route   GET /auth/logout
exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) console.log(err);
        res.redirect('/auth/login');
    });
};
