//start server
const app =require('./src/app');
//connecting server to db
const connectDB = require('.src/db/db');

connectDB();

//main work to connect server to database(i use mongodb)
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})