const admin = require('firebase-admin');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // If environment variable exists (Production/Vercel)
    try {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (e) {
        console.error('FAILED TO PARSE FIREBASE_SERVICE_ACCOUNT. Check your Vercel Environment Variable.', e);
        serviceAccount = null;
    }
} else {
    // Local development
    try {
        serviceAccount = require(path.join(__dirname, '../serviceAccountKey.json'));
    } catch (err) {
        console.error('Error loading serviceAccountKey.json:', err);
        console.error('Please ensure FIREBASE_SERVICE_ACCOUNT env var is set or file exists.');
    }
}

if (serviceAccount) {
    if (admin.apps.length === 0) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
            console.log('Firebase Connected');
        } catch (error) {
            console.error('Firebase initialization error:', error);
        }
    }
} else {
    console.error('Service Account is missing. Check your environment variables.');
}

const db = admin.firestore();

module.exports = db;
