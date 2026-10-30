//create server
const express = require("express");
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');

const app = express();
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

app.use((error, req, res, next) => {
    console.error(error);

    if (error.name === 'MongooseError' || error.name === 'MongoServerSelectionError') {
        return res.status(503).json({
            message: 'Database unavailable. Check that MongoDB is running and MONGODB_URI is correct.'
        });
    }

    return res.status(500).json({
        message: 'Internal server error.'
    });
});

module.exports = app;