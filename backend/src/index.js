const express = require('express');
const bodyParser = require('body-parser');
const router = require('./v1/index');

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
router(app);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use(errorHandler);
