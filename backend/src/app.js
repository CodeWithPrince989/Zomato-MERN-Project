//create server
const express = require("express");
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(express.json()); //middleware: req.body mein data lake de

app.get("/", (req, res) => {
    res.send("Hello World");
})

module.exports = app;