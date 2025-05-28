const express = require('express');
const router = express.Router();
const accountRoutes = require('./account/account.route');
const destinationRoutes = require('./destination/destination.route');
const dataHandlerRoutes = require('./dataHandler/dataHandler.route');

// Routes for components
router.use('/accounts', accountRoutes);
router.use('/destinations', destinationRoutes);
router.use('/', dataHandlerRoutes);

module.exports = router;
