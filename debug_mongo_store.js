const MongoStore = require('connect-mongo');
console.log('Type of MongoStore:', typeof MongoStore);
console.log('MongoStore keys:', Object.keys(MongoStore));
if (MongoStore.create) {
    console.log('MongoStore.create exists');
} else {
    console.log('MongoStore.create DOES NOT exist');
}
try {
    console.log('MongoStore content:', MongoStore);
} catch (e) { }
