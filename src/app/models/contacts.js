'use strict'

module.exports = (sequelize, DataTypes) => {
  const Contacts = sequelize.define('Contacts', {
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    cellphone: DataTypes.INTEGER
  }, {})
  Contacts.associate = function (models) {
    // associations can be defined here
  }
  return Contacts
}
