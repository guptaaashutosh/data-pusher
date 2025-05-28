const AccountModel = require('../account/account.model');
const DestinationModel = require('./destination.model');

class DestinationDal {
  createDestination = async data => {
    const account = await AccountModel.findByPk(data.accountId);
    if (!account) {
      throw new Error('Account not found');
    }

    return await DestinationModel.create(data);
  };

  getAllDestinations = async () => {
    return await DestinationModel.findAll({
      where: { isDeleted: false }
    });
  };

  getDestinationById = async id => {
    return DestinationModel.findOne({
      where: { id, isDeleted: false },
      attributes: { include: ['accountId'] }
    });
  };

  updateDestination = async (id, destinationUpdateData) => {
    return DestinationModel.update(destinationUpdateData, {
      where: { id, isDeleted: false },
      returning: true,
      plain: true
    });
  };

  deleteDestination = async id => {
    return await DestinationModel.update(
        { isDeleted: true, deletedAt: new Date() },
        { where: { id, isDeleted: false } }
      );
  };
}

module.exports = new DestinationDal();
