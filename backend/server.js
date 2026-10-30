require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB().catch((error) => {
    console.error('MongoDB connection error:', error.message);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});