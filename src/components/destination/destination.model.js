const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db.js');
const AccountModel = require('../account/account.model');

const DestinationModel = sequelize.define('Destination', {
  accountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: AccountModel,
      key: 'id'
    }
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  httpMethod: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['GET', 'POST', 'PUT', 'PATCH', 'DELETE']]
    }
  },
  headers: {
    type: DataTypes.JSON,
    allowNull: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deletedAt: {
    type: DataTypes.DATE,
    defaultValue: null
  }
});

// Define association with AccountModel
DestinationModel.belongsTo(AccountModel, {
  foreignKey: 'accountId',
  as: 'account'
});

module.exports = DestinationModel;
