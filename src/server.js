const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const {dbConnection} = require('./db/config');

const app = express();

// For development
app.use(morgan('dev'));

// secure apps by setting various HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.options('*', cors());
app.use(cors());

// DB connection
dbConnection();

// Routes
app.use('/api', routes);

// App init
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

module.exports = app;