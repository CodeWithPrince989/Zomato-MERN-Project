const mongoose = require('mongoose');

function connectDB() {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        return Promise.reject(new Error('MONGODB_URI is not set in the backend .env file.'));
    }

    return mongoose.connect(mongoUri).then((connection) => {
        console.log('MongoDB connected');
        return connection;
    });
}

module.exports = connectDB;
