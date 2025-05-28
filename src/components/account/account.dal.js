const AccountModel = require('./account.model');

class AccountDal {
  createAccount = async data => {
    const account = await AccountModel.create(data);
    return account;
  };
  updateAccount = async (id, accountUpdateData) => {
    return await AccountModel.update(accountUpdateData, {
      where: { id, isDeleted: false },
      returning: true,
      plain: true
    });
  };
  getAllAccounts = async () => {
    return await AccountModel.findAll();
  };
  getAccountById = async id => {
    return await AccountModel.findOne({ where: { id, isDeleted: false } });
  };
  deleteAccount = async id => {
    // Soft delete the account
    const [updatedCount] = await AccountModel.update(
      { isDeleted: true, deletedAt: new Date() },
      { where: { id, isDeleted: false } }
    );
    if (updatedCount > 0) {
      // Check if there are any destinations for this account
    const destinations = await DestinationModel.findAll({
      where: { accountId: id, isDeleted: false }
    });
      if (destinations.length > 0) {
        // Soft delete all destinations for this account
        await DestinationModel.update(
          { isDeleted: true, deletedAt: new Date() },
          { where: { accountId: id } }
        );
        return {
          success: true,
          message: 'Account and related destinations deleted.'
        };
      } else {
        return {
          success: true,
          message: 'Account deleted. No destinations found for this account.'
        };
      }
    }
    return {
      success: false,
      message: 'Account not found or already deleted.'
    };
  };
}

module.exports = new AccountDal();
