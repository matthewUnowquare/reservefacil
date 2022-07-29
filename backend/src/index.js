const express = require('express');
const app  = express();
const PORT = process.env.PORT || 5000;

const dotenv = require("dotenv").config();  
const connectDB = require("./config/db"); 

connectDB();

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

