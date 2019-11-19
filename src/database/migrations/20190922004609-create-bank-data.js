'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bank_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      cpf: {
        type: Sequelize.STRING,
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bank_data')
  }
}
