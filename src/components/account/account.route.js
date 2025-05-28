const express = require('express');
const accountController = require('./account.controller');
const router = express.Router();

router.post('/', accountController.createAccount);
router.get('/', accountController.getAllAccounts);
router.get('/:id', accountController.getAccountById);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);


module.exports = router;
