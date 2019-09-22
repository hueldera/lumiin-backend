'use strict'

module.exports = (sequelize, DataTypes) => {
  const PersonalData = sequelize.define('PersonalData', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    cpf_cnpj: DataTypes.INTEGER,
    rg: DataTypes.INTEGER,
    street: DataTypes.STRING,
    house_number: DataTypes.INTEGER,
    house_complement: DataTypes.STRING,
    neighborhood: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    state_subscription: DataTypes.INTEGER,
    civic_subscription: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {})
  PersonalData.associate = function (models) {
    // associations can be defined here
  }
  return PersonalData
}
