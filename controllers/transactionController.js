const Transaction = require('../models/Transaction');

// @desc    Get Dashboard
// @route   GET /dashboard
exports.getDashboard = async (req, res) => {
    try {
        // Use req.session.user.id (not _id)
        const transactions = await Transaction.findByUserId(req.session.user.id);

        // Sort manually since we are getting array from model (or model could sort)
        // Ensure date string comparison works
        transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Calculate totals safely
        const income = transactions
            .filter(item => item.type === 'income')
            .reduce((acc, item) => acc + (Number(item.amount) || 0), 0);

        const expense = transactions
            .filter(item => item.type === 'expense')
            .reduce((acc, item) => acc + (Number(item.amount) || 0), 0);

        const balance = income - expense;

        // Map _id to id for EJS if needed, but we should use id in EJS now
        // Passing transactions as is (they have .id from Firestore)

        res.render('dashboard', {
            user: req.session.user,
            transactions: transactions || [],
            income: income || 0,
            expense: expense || 0,
            balance: balance || 0
        });
    } catch (err) {
        console.error(err);
        res.render('error/500', {
            message: 'Server Error',
            error: err
        });
    }
};

// @desc    Get Add Transaction Page
// @route   GET /transactions/add
exports.getAddTransaction = (req, res) => {
    res.render('add-transaction');
};

// @desc    Add Transaction
// @route   POST /transactions/add
exports.addTransaction = async (req, res) => {
    try {
        const { type, category, amount, date, description } = req.body;

        await Transaction.create({
            userId: req.session.user.id, // Use .id
            type,
            category,
            amount: Number(amount), // Ensure number
            date,
            description,
            createdAt: new Date().toISOString()
        });

        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.render('add-transaction', {
            error: 'Failed to add transaction'
        });
    }
};

// @desc    Delete Transaction
// @route   DELETE /transactions/:id
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).send('Transaction not found');
        }

        // Ensure user owns transaction
        if (transaction.userId !== req.session.user.id) {
            return res.status(401).send('Not Authorized');
        }

        await Transaction.delete(req.params.id);
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
