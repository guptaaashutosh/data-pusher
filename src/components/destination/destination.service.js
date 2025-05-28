const destinationDal = require('./destination.dal');

class DestinationService {
    createDestination = async data => {
        const destination = await destinationDal.createDestination(data);
        return destination;
    };

    getAllDestinations = async () => {
        return await destinationDal.getAllDestinations();
    };

    getDestinationById = async id => {
        return await destinationDal.getDestinationById(id);
    };

    updateDestination = async (id, destinationUpdateData) => {
        return await destinationDal.updateDestination(id, destinationUpdateData);
    };

    deleteDestination = async id => {
        return await destinationDal.deleteDestination(id);
    }
}

module.exports = new DestinationService();
