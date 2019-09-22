'use strict'
module.exports = (sequelize, DataTypes) => {
  const Partners = sequelize.define('Partners', {
    personalData: DataTypes.INTEGER,
    contacts: DataTypes.INTEGER,
    documents: DataTypes.INTEGER
  }, {})
  Partners.associate = function (models) {
    // associations can be defined here
  }
  return Partners
}
