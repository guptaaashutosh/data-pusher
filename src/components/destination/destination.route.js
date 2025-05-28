const express = require('express');
const destinationController = require('./destination.controller');
const router = express.Router();

router.post('/', destinationController.createDestination);
router.get('/', destinationController.getAllDestinations);
router.get('/:id', destinationController.getDestinationById);
router.put('/:id', destinationController.updateDestination);
router.delete('/:id', destinationController.deleteDestination);

module.exports = router;