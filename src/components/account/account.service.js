const accountDal = require('./account.dal');

class AccountService {
  createAccount = async accountCreationData => {
    try {
      let { email, accountName } = accountCreationData;
      // bussiness logic can go here like validation or more then passing the data to data access layer
      return await accountDal.createAccount({ email, accountName });
    } finally {
      // cleanup or final actions can go here
      // No cleanup actions needed currently
    }
  };
  updateAccount = async (id, accountUpdateData) => {
    try {
      return await accountDal.updateAccount(id, accountUpdateData);
    } finally {
      // same as commented in first one
    }
  };
  getAllAccounts = async () => {
    try {
      return await accountDal.getAllAccounts();
    } finally {
      // same as commented in first one
    }
  };
  getAccountById = async id => {
    try {
      return await accountDal.getAccountById(id);
    } finally {
      // same as commented in first one
    }
  };
  deleteAccount = async id => {
    try {
      return await accountDal.deleteAccount(id);
    } finally {
      // same as commented in first one
    }
  };
}
module.exports = new AccountService();
