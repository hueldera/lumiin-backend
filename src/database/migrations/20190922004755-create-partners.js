'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Partners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      personalData: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'PersonalData',
          key: 'id'
        }
      },
      contacts: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Contacts',
          key: 'id'
        }
      },
      documents: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Documents',
          key: 'id'
        }
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
    return queryInterface.dropTable('Partners')
  }
}
