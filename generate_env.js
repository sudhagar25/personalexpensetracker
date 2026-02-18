const fs = require('fs');
const path = require('path');

try {
    const keyPath = path.join(__dirname, 'serviceAccountKey.json');
    if (fs.existsSync(keyPath)) {
        const key = fs.readFileSync(keyPath, 'utf8');
        // Minify the JSON to a single line string
        const jsonString = JSON.stringify(JSON.parse(key));
        console.log('\n=== COPY THE TEXT BELOW FOR VERCEL ENV VAR ===\n');
        console.log(jsonString);
        console.log('\n==============================================\n');
        console.log('Variable Name: FIREBASE_SERVICE_ACCOUNT');
    } else {
        console.error('serviceAccountKey.json not found!');
    }
} catch (err) {
    console.error(err);
}
