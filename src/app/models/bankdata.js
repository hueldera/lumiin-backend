'use strict'
module.exports = (sequelize, DataTypes) => {
  const BankData = sequelize.define('BankData', {
    cpf: DataTypes.INTEGER,
    holder: DataTypes.STRING,
    account: DataTypes.INTEGER,
    bank_branch: DataTypes.STRING,
    bank: DataTypes.STRING
  }, {})
  BankData.associate = function (models) {
    // associations can be defined here
  }
  return BankData
}
