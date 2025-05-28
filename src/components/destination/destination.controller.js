const AccountModel = require('../account/account.model');
const DestinationModel = require('./destination.model');
const destinationService = require('./destination.service');

const destinationController = {
  createDestination: async (req, res) => {
    try {
      const destination = await destinationService.createDestination(req.body);

      res.status(201).json(destination);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllDestinations: async (req, res) => {
    try {
      const destinations = await destinationService.getAllDestinations();
      res.status(200).json(destinations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getDestinationById: async (req, res) => {
    const { id } = req.params;
    try {
      const destination = await destinationService.getDestinationById(id);
      if (destination) {
        res.status(200).json(destination);
      } else {
        res.status(404).json({ error: 'Destination not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateDestination: async (req, res) => {
    const { id } = req.params;
    try {
      const [updatedCount, [updatedDestination]] = await destinationService.updateDestination(id, req.body);
      if (updatedCount > 0) {
        res.status(200).json(updatedDestination);
      } else {
        res.status(404).json({ error: 'Destination not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteDestination: async (req, res) => {
    const { id } = req.params;
    try {
      const [updatedCount] = await destinationService.deleteDestination(id);
      if (updatedCount > 0) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Destination not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = destinationController;
