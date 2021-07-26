const express = require('express');
const morgan = require('morgan');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false })); // Parse form data from incoming requests (x-www-form-urlencoded)
app.use(express.json()); // Parse JSON data from incoming requests (application/json)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);

module.exports = app;

// TODO: Where is JWT_TOKEN stored? In cookies ??
