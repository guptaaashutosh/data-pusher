const accountService = require('./account.service');

const accountController = {
  createAccount: async (req, res, next) => {
    try {
      const accountCreationData = req.body
      const account = await accountService.createAccount(accountCreationData)
      res.status(201).send({
        createdAccountDetails: account,
        message: 'Account created successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  updateAccount: async (req, res, next) => {
    const { id } = req.params;
    const accountUpdateData = req.body;
    try {
      const updatedAccount = await accountService.updateAccount(id, accountUpdateData);
      if (updatedAccount[1] > 0) {
        res.status(200).send({
          message: 'Account updated successfully'
        });
      } else {
        res.status(404).json({ error: 'Account not found' });
      }
    } catch (error) {
      next(error)
    }
  },

  getAllAccounts: async (req, res, next) => {
    try {
      const accounts = await accountService.getAllAccounts();
      res.status(200).json(accounts);
    } catch (error) {
      next(error);
    }
  },

  deleteAccount: async (req, res, next) => {
    const { id } = req.params;
    try {
      const accountDeleted = await accountService.deleteAccount(id);
      if (accountDeleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Account not found' });
      }
    } catch (error) {
      next(error);
    }
  },

      getAccountById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const account = await accountService.getAccountById(id);
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ error: 'Account not found' });
      }
    } catch (error) {
      next(error)
    }
  }
};

module.exports = accountController;
