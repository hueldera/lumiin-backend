'use strict'
module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    document: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {})
  Documents.associate = function (models) {
    // associations can be defined here
  }
  return Documents
}
