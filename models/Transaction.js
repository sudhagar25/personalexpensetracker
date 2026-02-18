const db = require('../config/db');
const collection = db.collection('transactions');

class Transaction {
    static async create(transactionData) {
        // Ensure date is stored as ISO string or Timestamp if needed, but ISO string is easier for JSON serialization
        const docRef = await collection.add(transactionData);
        return { id: docRef.id, ...transactionData };
    }

    static async findByUserId(userId) {
        const snapshot = await collection.where('userId', '==', userId).get(); // Fix: Match field name used in create()
        if (snapshot.empty) return [];
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    static async findById(id) {
        const doc = await collection.doc(id).get();
        if (!doc.exists) return null;
        return { id: doc.id, ...doc.data() };
    }

    static async delete(id) {
        await collection.doc(id).delete();
        return true;
    }
}

module.exports = Transaction;
