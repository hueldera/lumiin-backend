'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SocialMedias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      portfolio: {
        type: Sequelize.STRING,
        allowNull: false
      },
      linkedin: {
        type: Sequelize.STRING,
        allowNull: false
      },
      facebook: {
        type: Sequelize.STRING,
        allowNull: false
      },
      twitter: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SocialMedias')
  }
}
