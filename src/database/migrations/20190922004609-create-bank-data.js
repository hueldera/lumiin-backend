'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BankData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cpf: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      holder: {
        type: Sequelize.STRING,
        allowNull: false
      },
      account: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      bank_branch: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bank: {
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
    return queryInterface.dropTable('BankData')
  }
}
