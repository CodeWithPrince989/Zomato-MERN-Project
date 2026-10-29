// here we write logic of database to connect server 
const mongoose = require('mongoose'); 

function connectDB() { 
    mongoose.connect('mongodb://localhost:27017/food-view') 
        .then(() => { 
            console.log('MongoDB connected'); 
        }) 
        .catch((err) => { 
            console.log('MongoDB connection error: ', err); 
        });
} 

module.exports = connectDB;
