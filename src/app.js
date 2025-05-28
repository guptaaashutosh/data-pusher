const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('../config/db.js');
const router = require('./components/indexRoute');

app.use(bodyParser.json());

app.use('/api/v1', router);

// express-error handling
app.use((err, req, res, next) => {
  res.status(500).send(err);
});

// Sync database
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    // Sync all defined models to the DB
    return sequelize.sync();
  })
  .then(() => {
    console.log('All tables synced successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database or sync tables:', err);
  });

module.exports = app;
