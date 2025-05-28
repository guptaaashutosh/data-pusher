const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db.js');

const AccountModel = sequelize.define('Account', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  accountName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  appSecretToken: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: () => {
      return require('crypto').randomBytes(32).toString('hex');
    }
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  }
});

module.exports = AccountModel;
