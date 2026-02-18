try {
    console.log('Testing imports...');
    require('express');
    console.log('express ok');
    require('dotenv');
    console.log('dotenv ok');
    require('mongoose');
    console.log('mongoose ok');
    require('express-session');
    console.log('express-session ok');
    require('connect-mongo');
    console.log('connect-mongo ok');
    require('method-override');
    console.log('method-override ok');
    require('express-ejs-layouts');
    console.log('express-ejs-layouts ok');
    require('./config/db');
    console.log('config/db ok');
    require('./routes/index');
    console.log('routes/index ok');
    require('./routes/auth');
    console.log('routes/auth ok');
    require('./routes/transactions');
    console.log('routes/transactions ok');
    console.log('All imports successful');
} catch (e) {
    console.error('Import failed:', e);
}
