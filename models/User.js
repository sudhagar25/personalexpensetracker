const db = require('../config/db');
const collection = db.collection('users');

class User {
    static async create(userData) {
        const docRef = await collection.add(userData);
        return { id: docRef.id, ...userData };
    }

    static async findByEmail(email) {
        const snapshot = await collection.where('email', '==', email).limit(1).get();
        if (snapshot.empty) return null;
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() };
    }

    static async findById(id) {
        const doc = await collection.doc(id).get();
        if (!doc.exists) return null;
        return { id: doc.id, ...doc.data() };
    }
}

module.exports = User;
