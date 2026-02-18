const admin = require('firebase-admin');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // If environment variable exists (Production/Vercel)
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
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
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Connected');
}

const db = admin.firestore();

module.exports = db;
