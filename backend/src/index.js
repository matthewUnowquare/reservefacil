const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./v1/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const dotenv = require('dotenv').config();

const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
connectDB();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
/**
 * @V1 - Version 1 of the API
 *
 */
app.use('/api/v1/users', authRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

//app.use(errorHandler);
