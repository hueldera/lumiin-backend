'use strict';
module.exports = (sequelize, DataTypes) => {
  const SocialMedias = sequelize.define('SocialMedias', {
    portfolio: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    facebook: DataTypes.STRING,
    twitter: DataTypes.STRING
  }, {});
  SocialMedias.associate = function(models) {
    // associations can be defined here
  };
  return SocialMedias;
};